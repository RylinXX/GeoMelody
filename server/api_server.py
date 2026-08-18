#!/usr/bin/env python3
"""
GeoMelody Community Cloud Sync Backend Server
Provides RESTful APIs for multi-user spot publication, audio/photo storage, and synchronized comment feeds.
"""

import os
import sys
import json
import sqlite3
import time
import uuid
import cgi
import html
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
UPLOADS_DIR = os.path.join(BASE_DIR, 'uploads')
UPLOADS_COVERS = os.path.join(UPLOADS_DIR, 'covers')
UPLOADS_AUDIO = os.path.join(UPLOADS_DIR, 'audio')
DB_PATH = os.path.join(DATA_DIR, 'community_spots.db')

for d in [DATA_DIR, UPLOADS_DIR, UPLOADS_COVERS, UPLOADS_AUDIO]:
    os.makedirs(d, exist_ok=True)

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS spots (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            en_name TEXT,
            author TEXT NOT NULL,
            location TEXT,
            country TEXT,
            category TEXT,
            lat REAL NOT NULL,
            lng REAL NOT NULL,
            description TEXT,
            tags TEXT,
            photos TEXT,
            audio_track TEXT,
            created_at INTEGER
        )
    ''')
    cur.execute('''
        CREATE TABLE IF NOT EXISTS comments (
            id TEXT PRIMARY KEY,
            spot_id TEXT NOT NULL,
            author TEXT NOT NULL,
            en_author TEXT,
            text TEXT NOT NULL,
            en_text TEXT,
            likes INTEGER DEFAULT 0,
            reply_to_id TEXT,
            created_at TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class GeoMelodyHandler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        params = parse_qs(parsed.query)

        if path in ['/api/community/spots', '/api/spots']:
            conn = sqlite3.connect(DB_PATH)
            cur = conn.cursor()
            cur.execute('SELECT id, name, en_name, author, location, country, category, lat, lng, description, tags, photos, audio_track, created_at FROM spots ORDER BY created_at DESC LIMIT 100')
            rows = cur.fetchall()
            conn.close()

            spots = []
            for r in rows:
                photos = json.loads(r[11]) if r[11] else []
                audio_track = json.loads(r[12]) if r[12] else None
                tags = json.loads(r[10]) if r[10] else ['用户投稿', 'Community']
                spots.append({
                    'id': r[0],
                    'name': r[1],
                    'enName': r[2] or r[1],
                    'author': r[3],
                    'location': r[4],
                    'country': r[5] or '当前位置',
                    'category': r[6] or 'town',
                    'lat': r[7],
                    'lng': r[8],
                    'description': r[9],
                    'tags': tags,
                    'photos': photos,
                    'audioTrack': audio_track,
                    'isCommunity': True,
                    'createdAt': r[13],
                    'audioRecipe': {
                        'style': 'regional_acoustic',
                        'bpm': 72,
                        'scale': '用户专属原声音景',
                        'instruments': audio_track.get('title') if audio_track else '用户专属上传音乐',
                        'naturalSound': 'wind'
                    }
                })
            self._send_json({'success': True, 'spots': spots})
            return

        elif path in ['/api/community/comments', '/api/comments']:
            spot_id = params.get('spotId', [''])[0]
            if not spot_id:
                self._send_json({'success': False, 'error': 'Missing spotId'}, 400)
                return

            conn = sqlite3.connect(DB_PATH)
            cur = conn.cursor()
            cur.execute('SELECT id, spot_id, author, en_author, text, en_text, likes, reply_to_id, created_at FROM comments WHERE spot_id = ? ORDER BY created_at DESC', (spot_id,))
            rows = cur.fetchall()
            conn.close()

            comments = []
            for r in rows:
                comments.append({
                    'id': r[0],
                    'spotId': r[1],
                    'author': r[2],
                    'enAuthor': r[3] or r[2],
                    'text': r[4],
                    'enText': r[5] or r[4],
                    'likes': r[6] or 0,
                    'replyToId': r[7],
                    'createdAt': r[8]
                })
            self._send_json({'success': True, 'comments': comments})
            return

        elif path == '/api/health':
            self._send_json({'status': 'ok', 'timestamp': int(time.time())})
            return

        self._send_json({'error': 'Not found'}, 404)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path in ['/api/community/publish', '/api/publish']:
            ctype, pdict = cgi.parse_header(self.headers.get('Content-Type', ''))
            
            title = ''
            author = '音乐旅人'
            description = ''
            lat = 30.2428
            lng = 120.1504
            category = 'town'
            cover_url = ''
            audio_url = ''
            audio_title = ''

            if 'multipart/form-data' in ctype:
                try:
                    pdict['boundary'] = bytes(pdict.get('boundary', ''), 'utf-8') if isinstance(pdict.get('boundary'), str) else pdict.get('boundary', b'')
                    content_length = int(self.headers.get('Content-Length', 0))
                    pdict['CONTENT-LENGTH'] = content_length
                    env = {
                        'REQUEST_METHOD': 'POST',
                        'CONTENT_TYPE': self.headers.get('Content-Type', ''),
                        'CONTENT_LENGTH': str(content_length)
                    }
                    form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ=env)

                    title = form.getvalue('title', '').strip() if form.getvalue('title') else ''
                    author = form.getvalue('author', '').strip() if form.getvalue('author') else '音乐旅人'
                    description = form.getvalue('description', '').strip() if form.getvalue('description') else ''
                    category = form.getvalue('category', 'town').strip() if form.getvalue('category') else 'town'
                    
                    try:
                        lat = float(form.getvalue('currentLat') or form.getvalue('lat') or 30.2428)
                        lng = float(form.getvalue('currentLng') or form.getvalue('lng') or 120.1504)
                    except (ValueError, TypeError):
                        lat, lng = 30.2428, 120.1504

                    # Handle Cover Image File
                    if 'cover' in form and getattr(form['cover'], 'filename', None):
                        cover_item = form['cover']
                        ext = os.path.splitext(cover_item.filename)[1].lower() or '.jpg'
                        fname = f"{int(time.time())}_{uuid.uuid4().hex[:8]}{ext}"
                        fpath = os.path.join(UPLOADS_COVERS, fname)
                        with open(fpath, 'wb') as f:
                            f.write(cover_item.file.read())
                        cover_url = f"/uploads/covers/{fname}"

                    # Handle Audio File
                    if 'audio' in form and getattr(form['audio'], 'filename', None):
                        audio_item = form['audio']
                        ext = os.path.splitext(audio_item.filename)[1].lower() or '.mp3'
                        fname = f"{int(time.time())}_{uuid.uuid4().hex[:8]}{ext}"
                        fpath = os.path.join(UPLOADS_AUDIO, fname)
                        with open(fpath, 'wb') as f:
                            f.write(audio_item.file.read())
                        audio_url = f"/uploads/audio/{fname}"
                        audio_title = os.path.splitext(audio_item.filename)[0]
                except Exception as parse_err:
                    print(f"Error parsing multipart form: {parse_err}")

            elif ctype == 'application/json':
                length = int(self.headers.get('Content-Length', 0))
                body = json.loads(self.rfile.read(length).decode('utf-8'))
                title = body.get('title', '').strip()
                author = body.get('author', '').strip() or '音乐旅人'
                description = body.get('description', '').strip()
                category = body.get('category', 'town')
                lat = float(body.get('lat', 30.2428))
                lng = float(body.get('lng', 120.1504))
                cover_url = body.get('coverUrl', '')
                audio_url = body.get('audioUrl', '')
                audio_title = body.get('audioTitle', title)

            if not title:
                self._send_json({'success': False, 'error': 'Title is required'}, 400)
                return

            spot_id = f"community-{int(time.time()*1000)}"
            location_name = f"📍 坐标 · {lng:.2f}°E, {lat:.2f}°N"
            photos = [cover_url] if cover_url else ['https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=1200&auto=format&fit=crop&q=80']
            
            audio_track = None
            if audio_url:
                audio_track = {
                    'id': f"track-{spot_id}",
                    'spotId': spot_id,
                    'title': audio_title or title,
                    'creator': author,
                    'url': audio_url,
                    'license': '用户上传'
                }

            conn = sqlite3.connect(DB_PATH)
            cur = conn.cursor()
            cur.execute('''
                INSERT INTO spots (id, name, en_name, author, location, country, category, lat, lng, description, tags, photos, audio_track, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                spot_id,
                title,
                title,
                author,
                location_name,
                '当前位置',
                category,
                lat,
                lng,
                description,
                json.dumps(['用户投稿', 'Community'], ensure_ascii=False),
                json.dumps(photos, ensure_ascii=False),
                json.dumps(audio_track, ensure_ascii=False) if audio_track else None,
                int(time.time())
            ))
            conn.commit()
            conn.close()

            new_spot = {
                'id': spot_id,
                'name': title,
                'enName': title,
                'author': author,
                'location': location_name,
                'country': '当前位置',
                'category': category,
                'lat': lat,
                'lng': lng,
                'description': description,
                'tags': ['用户投稿', 'Community'],
                'photos': photos,
                'audioTrack': audio_track,
                'isCommunity': True,
                'createdAt': int(time.time()),
                'audioRecipe': {
                    'style': 'regional_acoustic',
                    'bpm': 72,
                    'scale': '用户专属原声音景',
                    'instruments': audio_track.get('title') if audio_track else '用户专属上传音乐',
                    'naturalSound': 'wind'
                }
            }

            self._send_json({'success': True, 'spot': new_spot})
            return

        elif path in ['/api/community/comments', '/api/comments']:
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length).decode('utf-8'))
            spot_id = body.get('spotId', '')
            author = body.get('author', '音乐旅人').strip() or '音乐旅人'
            text = body.get('text', '').strip()
            reply_to_id = body.get('replyToId')

            if not spot_id or not text:
                self._send_json({'success': False, 'error': 'Missing spotId or text'}, 400)
                return

            comment_id = f"c-{int(time.time()*1000)}-{uuid.uuid4().hex[:6]}"
            created_at = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())

            conn = sqlite3.connect(DB_PATH)
            cur = conn.cursor()
            cur.execute('''
                INSERT INTO comments (id, spot_id, author, en_author, text, en_text, likes, reply_to_id, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                comment_id,
                spot_id,
                author,
                author,
                text,
                text,
                0,
                reply_to_id,
                created_at
            ))
            conn.commit()
            conn.close()

            self._send_json({
                'success': True,
                'comment': {
                    'id': comment_id,
                    'spotId': spot_id,
                    'author': author,
                    'enAuthor': author,
                    'text': text,
                    'enText': text,
                    'likes': 0,
                    'replyToId': reply_to_id,
                    'createdAt': created_at,
                    'isUser': True,
                    'replies': []
                }
            })
            return

        self._send_json({'error': 'Not found'}, 404)

def run(port=8765):
    server = HTTPServer(('0.0.0.0', port), GeoMelodyHandler)
    print(f"GeoMelody API Server running on http://0.0.0.0:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    run(port)
