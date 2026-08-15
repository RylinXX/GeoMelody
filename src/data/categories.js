export const CATEGORIES = [
  { id: 'all', name: '全部探索', enName: 'All Places', icon: 'compass', color: '#10b981' },
  { id: 'town', name: '江南古镇', enName: 'Water Towns', icon: 'home', color: '#38bdf8' },
  { id: 'mountain', name: '雪山高原', enName: 'Mountains', icon: 'mountain', color: '#a78bfa' },
  { id: 'island', name: '热带海岛', enName: 'Islands', icon: 'palmtree', color: '#34d399' },
  { id: 'desert', name: '西北大漠', enName: 'Deserts', icon: 'sun', color: '#fbbf24' },
  { id: 'forest', name: '森林秘境', enName: 'Forests', icon: 'trees', color: '#4ade80' },
  { id: 'city', name: '城市夜景', enName: 'City Nights', icon: 'building-2', color: '#f472b6' },
  { id: 'lake', name: '湖泊湿地', enName: 'Lakes', icon: 'waves', color: '#60a5fa' }
];

export const CATEGORY_MAP = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat;
  return acc;
}, {});
