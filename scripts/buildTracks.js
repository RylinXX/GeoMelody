import fs from 'fs';

const manifest = JSON.parse(fs.readFileSync('src/data/sunoTracksManifest.json', 'utf8'));
const csv = fs.readFileSync('GeoMelody_Scenic_Spots_Music_Prompts.csv', 'utf8');
const lines = csv.split('\n').filter(Boolean);

const csvMeta = {};
lines.slice(1).forEach(line => {
  const parts = line.split(',');
  const seq = parseInt(parts[0], 10);
  const id = parts[1];
  const name = parts[2];
  const enName = parts[3];
  const country = parts[4];
  const style = parts[10];
  if (!isNaN(seq) && id) {
    csvMeta[id] = { seq, id, name, enName, country, style };
  }
});

let code = `/**
 * Official Suno AI Scenic Music Dataset for GeoMelody
 * Auto-mapped from User Desktop Suno Production Batch (51 Solo Tracks)
 */

export const SUNO_SPOT_TRACKS = {\n`;

manifest.forEach(m => {
  const meta = csvMeta[m.spotId] || {};
  const title = (meta.name || m.name || m.spotId).replace(/'/g, "\\'");
  const enTitle = (meta.enName || m.spotId).replace(/'/g, "\\'");
  const country = meta.country || '全球胜景';
  const creator = `GeoMelody AI · ${country}`;
  const trackId = m.filename.replace('.mp3', '');
  
  code += `  '${m.spotId}': {
    id: '${trackId}',
    spotId: '${m.spotId}',
    seq: ${m.seq},
    title: '${title}',
    enTitle: '${enTitle}',
    creator: '${creator}',
    url: '${m.url}'
  },\n`;
});

code += `};

export const DEMO_TRACKS_LIST = Object.values(SUNO_SPOT_TRACKS);

export const DEMO_TRACKS = {
  wuzhen: SUNO_SPOT_TRACKS['wuzhen'],
  kyoto: SUNO_SPOT_TRACKS['kyoto'],
  hallstatt: SUNO_SPOT_TRACKS['hallstatt'],
  fuji: SUNO_SPOT_TRACKS['fuji'],
  maldives: SUNO_SPOT_TRACKS['maldives'],
  santorini: SUNO_SPOT_TRACKS['santorini'],
  sahara: SUNO_SPOT_TRACKS['sahara'],
  shanghai: SUNO_SPOT_TRACKS['shanghai']
};

const CATEGORY_FALLBACK_TRACK = {
  town: SUNO_SPOT_TRACKS['wuzhen'] || DEMO_TRACKS_LIST[0],
  mountain: SUNO_SPOT_TRACKS['everest'] || SUNO_SPOT_TRACKS['fuji'] || DEMO_TRACKS_LIST[0],
  island: SUNO_SPOT_TRACKS['maldives'] || SUNO_SPOT_TRACKS['bali'] || DEMO_TRACKS_LIST[0],
  desert: SUNO_SPOT_TRACKS['sahara'] || SUNO_SPOT_TRACKS['dunhuang'] || DEMO_TRACKS_LIST[0],
  forest: SUNO_SPOT_TRACKS['jiuzhaigou'] || SUNO_SPOT_TRACKS['blackforest'] || DEMO_TRACKS_LIST[0],
  city: SUNO_SPOT_TRACKS['shanghai'] || SUNO_SPOT_TRACKS['tokyo'] || DEMO_TRACKS_LIST[0],
  lake: SUNO_SPOT_TRACKS['plitvice'] || SUNO_SPOT_TRACKS['hongcun'] || DEMO_TRACKS_LIST[0],
  unclaimed: SUNO_SPOT_TRACKS['borabora'] || DEMO_TRACKS_LIST[0]
};

function hashString(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDemoTrack(spot) {
  if (spot?.audioTrack?.url) return spot.audioTrack;
  if (!spot) return DEMO_TRACKS_LIST[0];

  // 1. Direct Suno spot mapping
  if (spot.id && SUNO_SPOT_TRACKS[spot.id]) {
    return SUNO_SPOT_TRACKS[spot.id];
  }

  // 2. Category fallback mapping
  if (spot.category && CATEGORY_FALLBACK_TRACK[spot.category]) {
    const hash = hashString(spot.id || spot.name || '');
    if (hash % 4 === 0) {
      return DEMO_TRACKS_LIST[hash % DEMO_TRACKS_LIST.length];
    }
    return CATEGORY_FALLBACK_TRACK[spot.category];
  }

  const hash = hashString(spot.id || spot.name || '');
  return DEMO_TRACKS_LIST[hash % DEMO_TRACKS_LIST.length] || DEMO_TRACKS_LIST[0];
}
`;

fs.writeFileSync('src/data/demoTracks.js', code);
console.log('src/data/demoTracks.js updated with ' + manifest.length + ' tracks!');
