/**
 * Default Music Tracks for GeoMelody
 * Integrated from User's Desktop Video/Music Materials (视频素材/音乐素材)
 */

export const DEMO_TRACKS_LIST = [
  {
    id: 'dating-piano',
    title: '约会钢琴曲',
    enTitle: 'Dating Piano Melody',
    creator: '纯音乐',
    url: '/audio/dating-piano.mp3'
  },
  {
    id: 'evening-breeze-instrumental',
    title: '晚风（纯音乐）',
    enTitle: 'Evening Breeze (Instrumental)',
    creator: '纯音乐',
    url: '/audio/evening-breeze-instrumental.mp3'
  },
  {
    id: 'time-to-love',
    title: 'Time To Love',
    enTitle: 'Time To Love',
    creator: 'October',
    url: '/audio/time-to-love.mp3'
  },
  {
    id: 'yunmeng-song-for-you',
    title: '云梦 - 为你唱首歌',
    enTitle: 'Yunmeng - A Song For You',
    creator: '云梦',
    url: '/audio/yunmeng-song-for-you.mp3'
  },
  {
    id: 'too-smart',
    title: '太聪明',
    enTitle: 'Too Smart',
    creator: '陈绮贞',
    url: '/audio/too-smart.mp3'
  },
  {
    id: 'lin-shengxiang-mianhuicai',
    title: '面会菜',
    enTitle: 'Mian Hui Cai',
    creator: '林生祥',
    url: '/audio/lin-shengxiang-mianhuicai.mp3'
  },
  {
    id: 'evening-breeze',
    title: '晚风',
    enTitle: 'Evening Breeze',
    creator: '原声',
    url: '/audio/evening-breeze.mp3'
  },
  {
    id: 'bandao-tiehe',
    title: '半岛铁盒',
    enTitle: 'Peninsula Iron Box',
    creator: '周杰伦',
    url: '/audio/bandao-tiehe.mp3'
  }
];

export const DEMO_TRACKS = {
  datingPiano: DEMO_TRACKS_LIST[0],
  eveningBreezeInst: DEMO_TRACKS_LIST[1],
  timeToLove: DEMO_TRACKS_LIST[2],
  yunmeng: DEMO_TRACKS_LIST[3],
  tooSmart: DEMO_TRACKS_LIST[4],
  mianhuicai: DEMO_TRACKS_LIST[5],
  eveningBreeze: DEMO_TRACKS_LIST[6],
  bandaoTiehe: DEMO_TRACKS_LIST[7]
};

const CATEGORY_DEFAULT_TRACK = {
  town: DEMO_TRACKS.datingPiano,
  mountain: DEMO_TRACKS.timeToLove,
  island: DEMO_TRACKS.bandaoTiehe,
  desert: DEMO_TRACKS.mianhuicai,
  forest: DEMO_TRACKS.eveningBreezeInst,
  city: DEMO_TRACKS.tooSmart,
  lake: DEMO_TRACKS.yunmeng
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

  if (spot.category && CATEGORY_DEFAULT_TRACK[spot.category]) {
    // If spot has a specific ID, distribute variation smoothly
    const hash = hashString(spot.id || spot.name || '');
    if (hash % 3 === 0) {
      return DEMO_TRACKS_LIST[hash % DEMO_TRACKS_LIST.length];
    }
    return CATEGORY_DEFAULT_TRACK[spot.category];
  }

  const hash = hashString(spot.id || spot.name || '');
  return DEMO_TRACKS_LIST[hash % DEMO_TRACKS_LIST.length];
}
