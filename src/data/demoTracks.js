export const DEMO_TRACKS = {
  asia: {
    id: 'peaceful',
    title: 'Peaceful',
    creator: 'Tamlin Lollis Love',
    url: '/audio/peaceful.ogg',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Peaceful.ogg'
  },
  europe: {
    id: 'moonlight-sonata',
    title: 'Moonlight Sonata · I',
    creator: 'Ludwig van Beethoven',
    url: '/audio/moonlight-sonata.ogg',
    license: 'Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Moonlight_Sonata.ogg'
  },
  americas: {
    id: 'chill-beat',
    title: 'Chill Beat',
    creator: 'Maddy',
    url: '/audio/chill-beat.ogg',
    license: 'CC0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chill_Beat.ogg'
  }
};

export function getDemoTrack(spot) {
  if (spot?.audioTrack?.url) return spot.audioTrack;
  if (!spot) return DEMO_TRACKS.asia;
  if (spot.lng < -30) return DEMO_TRACKS.americas;
  if (spot.lng < 60) return DEMO_TRACKS.europe;
  return DEMO_TRACKS.asia;
}
