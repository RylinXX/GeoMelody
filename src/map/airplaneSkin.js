/**
 * Airplane & Aircraft Skin Models for Cruise & Roaming Modes
 * High-fidelity, aerodynamic vector models with 3D gradient shading & dynamic lighting
 */

export const AIRPLANE_SKINS = {
  '01-airliner': {
    id: '01-airliner',
    name: '极光巡航客机 (梦幻之翼 · 极光青蓝)',
    nameEn: 'Aurora Supersonic Airliner (Dreamliner Cyan)',
    icon: '✈️',
    svg: `<svg class="center-airplane-svg skin-airliner" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Fuselage Metallic Gradient -->
        <linearGradient id="fuselageGrad" x1="50" y1="6" x2="50" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="25%" stop-color="#e0f2fe"/>
          <stop offset="60%" stop-color="#38bdf8"/>
          <stop offset="90%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#0369a1"/>
        </linearGradient>
        <!-- Main Wings Gradient -->
        <linearGradient id="wingGrad" x1="50" y1="36" x2="50" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#f0f9ff"/>
          <stop offset="40%" stop-color="#7dd3fc"/>
          <stop offset="85%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#075985"/>
        </linearGradient>
        <!-- Cockpit Glass Reflection -->
        <linearGradient id="cockpitGlass" x1="50" y1="14" x2="50" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="50%" stop-color="#0369a1"/>
          <stop offset="100%" stop-color="#082f49"/>
        </linearGradient>
        <!-- Turbine Nacelle Glow -->
        <radialGradient id="engineIntakeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#bae6fd"/>
          <stop offset="60%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </radialGradient>
      </defs>

      <!-- Main Swept Wings with Aerodynamic Winglets -->
      <path d="M50 36 L12 66 L8 70 L9 73 L18 70 L50 56 L82 70 L91 73 L92 70 L88 66 Z" fill="url(#wingGrad)" stroke="#7dd3fc" stroke-width="0.8"/>
      <!-- Wing Leading Edge Silver Highlights -->
      <path d="M50 36 L12 66 L8 70" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.9"/>
      <path d="M50 36 L88 66 L92 70" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.9"/>

      <!-- Underwing Turbofan Jet Engines -->
      <!-- Left Engine -->
      <rect x="28" y="50" width="6" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="0.9"/>
      <ellipse cx="31" cy="52" rx="2.5" ry="1.5" fill="url(#engineIntakeGlow)"/>
      <line x1="31" y1="68" x2="31" y2="76" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>

      <!-- Right Engine -->
      <rect x="66" y="50" width="6" height="18" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="0.9"/>
      <ellipse cx="69" cy="52" rx="2.5" ry="1.5" fill="url(#engineIntakeGlow)"/>
      <line x1="69" y1="68" x2="69" y2="76" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>

      <!-- Horizontal Stabilizer Tail Wings -->
      <path d="M50 76 L28 88 L26 91 L31 90 L50 82 L69 90 L74 91 L72 88 Z" fill="url(#wingGrad)" stroke="#38bdf8" stroke-width="0.8"/>

      <!-- Main Supersonic Needle Fuselage -->
      <path d="M50 6 C47 12 45 22 45 42 L45 78 C45 84 48 91 50 93 C52 91 55 84 55 78 L55 42 C55 22 53 12 50 6 Z" fill="url(#fuselageGrad)" stroke="#38bdf8" stroke-width="1"/>
      
      <!-- Central Body Dorsal Spine Light Highlight -->
      <line x1="50" y1="8" x2="50" y2="86" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.85"/>

      <!-- Streamlined Panoramic Cockpit Windshield -->
      <path d="M47 20 C47 16 48.5 14 50 14 C51.5 14 53 16 53 20 L53.5 26 C53.5 27 52 28 50 28 C48 28 46.5 27 46.5 26 Z" fill="url(#cockpitGlass)" stroke="#7dd3fc" stroke-width="0.7"/>
      <path d="M48 18 L50 16 L52 18" stroke="#ffffff" stroke-width="0.8" opacity="0.9"/>

      <!-- Wingtip Navigation Strobe Lights -->
      <circle cx="8" cy="71" r="2" fill="#ef4444" filter="drop-shadow(0 0 4px #ef4444)"/> <!-- Port/Left Red -->
      <circle cx="92" cy="71" r="2" fill="#10b981" filter="drop-shadow(0 0 4px #10b981)"/> <!-- Starboard/Right Green -->
      <circle cx="50" cy="92" r="1.8" fill="#38bdf8" filter="drop-shadow(0 0 5px #38bdf8)"/> <!-- Tail Beacon -->
    </svg>`
  },
  '02-fighter': {
    id: '02-fighter',
    name: '幽灵隐身全翼战机 (黑鸟三角翼 · 赛博暗夜)',
    nameEn: 'Phantom B-21 Stealth Wing (Cyber Night)',
    icon: '⚡',
    svg: `<svg class="center-airplane-svg skin-fighter" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stealthGrad" x1="50" y1="4" x2="50" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#6366f1"/>
          <stop offset="25%" stop-color="#312e81"/>
          <stop offset="65%" stop-color="#1e1b4b"/>
          <stop offset="100%" stop-color="#0f0c29"/>
        </linearGradient>
        <linearGradient id="stealthCanopy" x1="50" y1="18" x2="50" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="50%" stop-color="#a855f7"/>
          <stop offset="100%" stop-color="#3b82f6"/>
        </linearGradient>
        <linearGradient id="stealthEdgeGlow" x1="10" y1="50" x2="90" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#c084fc"/>
          <stop offset="50%" stop-color="#818cf8"/>
          <stop offset="100%" stop-color="#c084fc"/>
        </linearGradient>
      </defs>

      <!-- Stealth Flying Wing Body (B-2 / SR-71 Faceted Aesthetic) -->
      <polygon points="50,6 94,66 84,70 70,64 58,74 50,68 42,74 30,64 16,70 6,66" fill="url(#stealthGrad)" stroke="url(#stealthEdgeGlow)" stroke-width="1.2" stroke-linejoin="round"/>

      <!-- Faceted Chine Panel Lines & Geometry -->
      <line x1="50" y1="6" x2="50" y2="68" stroke="#a5b4fc" stroke-width="1" opacity="0.75"/>
      <line x1="50" y1="6" x2="38" y2="52" stroke="#818cf8" stroke-width="0.8" opacity="0.6"/>
      <line x1="50" y1="6" x2="62" y2="52" stroke="#818cf8" stroke-width="0.8" opacity="0.6"/>
      <line x1="38" y1="52" x2="16" y2="70" stroke="#818cf8" stroke-width="0.8" opacity="0.6"/>
      <line x1="62" y1="52" x2="84" y2="70" stroke="#818cf8" stroke-width="0.8" opacity="0.6"/>

      <!-- Stealth Golden Tint HUD Canopy -->
      <polygon points="50,18 45,30 50,34 55,30" fill="url(#stealthCanopy)" stroke="#fbbf24" stroke-width="0.9"/>
      <line x1="50" y1="20" x2="50" y2="32" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.9"/>

      <!-- Twin Serrated Thrust Nozzles -->
      <rect x="43" y="66" width="5" height="5" rx="1.5" fill="#4338ca" stroke="#c084fc" stroke-width="0.8"/>
      <rect x="52" y="66" width="5" height="5" rx="1.5" fill="#4338ca" stroke="#c084fc" stroke-width="0.8"/>

      <!-- Wingtip Neon Beacons -->
      <circle cx="8" cy="67" r="2.2" fill="#c084fc" filter="drop-shadow(0 0 6px #c084fc)"/>
      <circle cx="92" cy="67" r="2.2" fill="#c084fc" filter="drop-shadow(0 0 6px #c084fc)"/>
      <circle cx="50" cy="7" r="1.8" fill="#38bdf8" filter="drop-shadow(0 0 5px #38bdf8)"/>
    </svg>`
  },
  '03-shuttle': {
    id: '03-shuttle',
    name: '星际开拓者轨道器 (航天穿梭机 · 太阳金耀)',
    nameEn: 'Orbital Starliner (Solar Titan Gold)',
    icon: '🛰️',
    svg: `<svg class="center-airplane-svg skin-shuttle" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="starlinerBody" x1="50" y1="6" x2="50" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="30%" stop-color="#fef08a"/>
          <stop offset="65%" stop-color="#f59e0b"/>
          <stop offset="90%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
        <linearGradient id="solarWingGrad" x1="50" y1="40" x2="50" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#fef3c7"/>
          <stop offset="50%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#451a03"/>
        </linearGradient>
        <linearGradient id="warpReactor" x1="50" y1="44" x2="50" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#67e8f9"/>
          <stop offset="50%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#0e7490"/>
        </linearGradient>
      </defs>

      <!-- Heavy Delta Warp Wings with Solar Panels -->
      <path d="M50 34 L16 68 L14 74 L22 72 L50 62 L78 72 L86 74 L84 68 Z" fill="url(#solarWingGrad)" stroke="#f59e0b" stroke-width="1"/>
      <line x1="20" y1="66" x2="44" y2="58" stroke="#fde047" stroke-width="0.8" opacity="0.8"/>
      <line x1="80" y1="66" x2="56" y2="58" stroke="#fde047" stroke-width="0.8" opacity="0.8"/>

      <!-- Twin Outboard Plasma Nacelles -->
      <rect x="22" y="48" width="6" height="24" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="0.9"/>
      <circle cx="25" cy="52" r="2" fill="#67e8f9"/>
      <rect x="72" y="48" width="6" height="24" rx="3" fill="#1e293b" stroke="#f59e0b" stroke-width="0.9"/>
      <circle cx="75" cy="52" r="2" fill="#67e8f9"/>

      <!-- Fuselage Command Module -->
      <path d="M50 8 C44 16 42 30 42 54 L42 82 C42 88 47 93 50 93 C53 93 58 88 58 82 L58 54 C58 30 56 16 50 8 Z" fill="url(#starlinerBody)" stroke="#fbbf24" stroke-width="1.1"/>
      
      <!-- Central Quantum Fusion Core -->
      <circle cx="50" cy="50" r="5" fill="url(#warpReactor)" stroke="#cffafe" stroke-width="1.2"/>
      <circle cx="50" cy="50" r="2" fill="#ffffff"/>

      <!-- Panoramic Observation Dome -->
      <path d="M46 20 C46 16 48 14 50 14 C52 14 54 16 54 20 L53 26 H47 Z" fill="#0f172a" stroke="#67e8f9" stroke-width="0.8"/>
      <circle cx="50" cy="18" r="1.5" fill="#67e8f9"/>

      <!-- Triple Heavy Ion Engines -->
      <ellipse cx="45" cy="85" rx="2" ry="4" fill="#0284c7"/>
      <ellipse cx="50" cy="86" rx="2.5" ry="4.5" fill="#38bdf8"/>
      <ellipse cx="55" cy="85" rx="2" ry="4" fill="#0284c7"/>

      <!-- Strobe Beacons -->
      <circle cx="14" cy="71" r="2.2" fill="#fbbf24" filter="drop-shadow(0 0 5px #fbbf24)"/>
      <circle cx="86" cy="71" r="2.2" fill="#fbbf24" filter="drop-shadow(0 0 5px #fbbf24)"/>
    </svg>`
  },
  '04-ufo': {
    id: '04-ufo',
    name: '量子引力星盘 (反重力力场 · 翡翠极光)',
    nameEn: 'Antigravity Quantum Disc (Emerald Core)',
    icon: '🛸',
    svg: `<svg class="center-airplane-svg skin-ufo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ufoRing" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#34d399"/>
          <stop offset="45%" stop-color="#059669"/>
          <stop offset="85%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#022c22"/>
        </radialGradient>
        <radialGradient id="ufoDome" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#a7f3d0"/>
          <stop offset="50%" stop-color="#10b981"/>
          <stop offset="90%" stop-color="#065f46"/>
          <stop offset="100%" stop-color="#022c22"/>
        </radialGradient>
      </defs>

      <!-- Outer Graviton Compression Ring -->
      <ellipse cx="50" cy="50" rx="46" ry="34" fill="url(#ufoRing)" stroke="#34d399" stroke-width="1.5"/>
      <ellipse cx="50" cy="50" rx="42" ry="30" stroke="#6ee7b7" stroke-width="0.8" stroke-dasharray="4 3" opacity="0.85"/>

      <!-- Inner Rotating Energy Conduit -->
      <ellipse cx="50" cy="50" rx="28" ry="20" fill="#064e3b" stroke="#a7f3d0" stroke-width="1.2"/>

      <!-- Center Singularity Plasma Dome -->
      <ellipse cx="50" cy="45" rx="18" ry="14" fill="url(#ufoDome)" stroke="#6ee7b7" stroke-width="1.4"/>
      <circle cx="50" cy="42" r="6" fill="#ffffff" filter="drop-shadow(0 0 8px #a7f3d0)"/>
      <circle cx="50" cy="42" r="3" fill="#6ee7b7"/>

      <!-- Perimeter Quantum Energy Nodes -->
      <circle cx="14" cy="50" r="3" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)"/>
      <circle cx="24" cy="68" r="3.2" fill="#34d399" filter="drop-shadow(0 0 6px #34d399)"/>
      <circle cx="50" cy="76" r="3.6" fill="#a7f3d0" filter="drop-shadow(0 0 8px #a7f3d0)"/>
      <circle cx="76" cy="68" r="3.2" fill="#34d399" filter="drop-shadow(0 0 6px #34d399)"/>
      <circle cx="86" cy="50" r="3" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)"/>
      <circle cx="76" cy="32" r="3.2" fill="#34d399" filter="drop-shadow(0 0 6px #34d399)"/>
      <circle cx="50" cy="24" r="3.6" fill="#a7f3d0" filter="drop-shadow(0 0 8px #a7f3d0)"/>
      <circle cx="24" cy="32" r="3.2" fill="#34d399" filter="drop-shadow(0 0 6px #34d399)"/>
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
