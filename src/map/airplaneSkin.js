/**
 * Airplane & Aircraft Skin Models for Cruise & Roaming Modes
 */

export const AIRPLANE_SKINS = {
  '01-airliner': {
    id: '01-airliner',
    name: '超音速客机 (经典流线 · 极光青蓝)',
    nameEn: 'Supersonic Airliner (Classic Cyan)',
    icon: '✈️',
    svg: `<svg class="center-airplane-svg skin-airliner" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4C29.5 4 28 8 28 14L28 36L6 48V52L28 44L28 54L22 58V60L32 58L42 60V58L36 54L36 44L58 52V48L36 36L36 14C36 8 34.5 4 32 4Z" fill="url(#airlinerGrad)" stroke="#38bdf8" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M30 11C30 9.5 30.8 8.5 32 8.5C33.2 8.5 34 9.5 34 11L33.5 15H30.5L30 11Z" fill="#e0f2fe" opacity="0.9"/>
      <line x1="12" y1="46" x2="28" y2="40" stroke="#7dd3fc" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="52" y1="46" x2="36" y2="40" stroke="#7dd3fc" stroke-width="1.5" stroke-linecap="round"/>
      <defs>
        <linearGradient id="airlinerGrad" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop stop-color="#38bdf8"/>
          <stop offset="0.6" stop-color="#0284c7"/>
          <stop offset="1" stop-color="#0369a1"/>
        </linearGradient>
      </defs>
    </svg>`
  },
  '02-fighter': {
    id: '02-fighter',
    name: '暗夜隐身战机 (三角翼科幻 · 赛博紫蓝)',
    nameEn: 'Stealth Fighter (Cyber Indigo)',
    icon: '🚀',
    svg: `<svg class="center-airplane-svg skin-fighter" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 3L25 18L10 38L2 46L16 46L24 40L24 55L14 61H26L32 54L38 61H50L40 55L40 40L48 46L62 46L54 38L39 18L32 3Z" fill="url(#fighterGrad)" stroke="#818cf8" stroke-width="1.2" stroke-linejoin="round"/>
      <polygon points="32,10 29,22 35,22" fill="#38bdf8" opacity="0.85"/>
      <line x1="25" y1="28" x2="16" y2="42" stroke="#a78bfa" stroke-width="1.2"/>
      <line x1="39" y1="28" x2="48" y2="42" stroke="#a78bfa" stroke-width="1.2"/>
      <defs>
        <linearGradient id="fighterGrad" x1="32" y1="3" x2="32" y2="61" gradientUnits="userSpaceOnUse">
          <stop stop-color="#818cf8"/>
          <stop offset="0.5" stop-color="#4338ca"/>
          <stop offset="1" stop-color="#1e1b4b"/>
        </linearGradient>
      </defs>
    </svg>`
  },
  '03-ufo': {
    id: '03-ufo',
    name: '量子引力星舰 (能量力场 · 翡翠极光)',
    nameEn: 'Quantum Graviton UFO (Emerald Core)',
    icon: '🛸',
    svg: `<svg class="center-airplane-svg skin-ufo" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="32" rx="30" ry="16" fill="url(#ufoRingGrad)" stroke="#34d399" stroke-width="1.5"/>
      <ellipse cx="32" cy="24" rx="14" ry="12" fill="url(#ufoDomeGrad)" stroke="#6ee7b7" stroke-width="1.2"/>
      <circle cx="32" cy="24" r="5" fill="#a7f3d0"/>
      <circle cx="8" cy="32" r="2.5" fill="#38bdf8"/>
      <circle cx="18" cy="42" r="2.5" fill="#34d399"/>
      <circle cx="32" cy="46" r="3" fill="#a7f3d0"/>
      <circle cx="46" cy="42" r="2.5" fill="#34d399"/>
      <circle cx="56" cy="32" r="2.5" fill="#38bdf8"/>
      <defs>
        <linearGradient id="ufoRingGrad" x1="32" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
          <stop stop-color="#059669"/>
          <stop offset="0.6" stop-color="#064e3b"/>
          <stop offset="1" stop-color="#022c22"/>
        </linearGradient>
        <linearGradient id="ufoDomeGrad" x1="32" y1="12" x2="32" y2="36" gradientUnits="userSpaceOnUse">
          <stop stop-color="#34d399"/>
          <stop offset="1" stop-color="#047857"/>
        </linearGradient>
      </defs>
    </svg>`
  },
  '04-shuttle': {
    id: '04-shuttle',
    name: '极光天宫轨道器 (航天穿梭机 · 太阳金耀)',
    nameEn: 'Aurora Space Shuttle (Solar Gold)',
    icon: '🛰️',
    svg: `<svg class="center-airplane-svg skin-shuttle" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 4C28 6 26 12 26 24L10 46V54L26 48L26 58L22 62H42L38 58L38 48L54 54V46L38 24C38 12 36 6 32 4Z" fill="url(#shuttleGrad)" stroke="#f59e0b" stroke-width="1.2" stroke-linejoin="round"/>
      <path d="M32 4C29.5 5 28 8 28 13H36C36 8 34.5 5 32 4Z" fill="#1e293b"/>
      <path d="M29 16L31.5 14L34.5 16L33 18H30.5L29 16Z" fill="#67e8f9"/>
      <polygon points="18,48 26,44 26,47 20,51" fill="#fbbf24"/>
      <polygon points="46,48 38,44 38,47 44,51" fill="#fbbf24"/>
      <defs>
        <linearGradient id="shuttleGrad" x1="32" y1="4" x2="32" y2="62" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f8fafc"/>
          <stop offset="0.6" stop-color="#e2e8f0"/>
          <stop offset="1" stop-color="#94a3b8"/>
        </linearGradient>
      </defs>
    </svg>`
  }
};

export function applyAirplaneSkin(skinId = '01-airliner') {
  const skin = AIRPLANE_SKINS[skinId] || AIRPLANE_SKINS['01-airliner'];
  const overlay = document.getElementById('globe-center-flight-overlay');
  const slot = document.getElementById('airplane-skin-slot');

  if (overlay) {
    overlay.setAttribute('data-plane-skin', skin.id);
  }

  if (slot) {
    slot.innerHTML = skin.svg;
  }
}
