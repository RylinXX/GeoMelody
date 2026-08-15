export const MAP_REGIONS = [
  {
    id: 'asia',
    name: '亚洲',
    enName: 'Asia',
    icon: '亚',
    lat: 32,
    lng: 95,
    globeDistance: 188,
    mapZoom: 3.6
  },
  {
    id: 'europe',
    name: '欧洲',
    enName: 'Europe',
    icon: '欧',
    lat: 50,
    lng: 15,
    globeDistance: 182,
    mapZoom: 4
  },
  {
    id: 'africa',
    name: '非洲',
    enName: 'Africa',
    icon: '非',
    lat: 4,
    lng: 20,
    globeDistance: 190,
    mapZoom: 3.3
  },
  {
    id: 'north-america',
    name: '北美洲',
    enName: 'North America',
    icon: '北',
    lat: 38,
    lng: -105,
    globeDistance: 194,
    mapZoom: 3.2
  },
  {
    id: 'south-america',
    name: '南美洲',
    enName: 'South America',
    icon: '南',
    lat: -17,
    lng: -60,
    globeDistance: 194,
    mapZoom: 3.2
  },
  {
    id: 'oceania',
    name: '大洋洲',
    enName: 'Oceania',
    icon: '洋',
    lat: -24,
    lng: 135,
    globeDistance: 190,
    mapZoom: 3.4
  },
  {
    id: 'antarctica',
    name: '南极洲',
    enName: 'Antarctica',
    icon: '极',
    lat: -67,
    lng: 25,
    globeDistance: 198,
    mapZoom: 2.8
  }
];

export function getRegionName(region, language) {
  return language === 'en' ? region.enName : region.name;
}
