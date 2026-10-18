import React from 'react';

export const PitStopSmallCabinRealPhoto: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 1600"
        className="h-full w-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Wallpaper Damask Pattern */}
          <pattern id="damaskPattern" width="100" height="120" patternUnits="userSpaceOnUse">
            <rect width="100" height="120" fill="#2d2b27" />
            {/* Damask ornate floral medallion */}
            <path
              d="M 50,20 C 35,35 25,50 35,65 C 42,75 50,65 50,55 C 50,65 58,75 65,65 C 75,50 65,35 50,20 Z"
              fill="#423e38"
              opacity="0.9"
            />
            <circle cx="50" cy="45" r="5" fill="#544f47" />
            <path
              d="M 20,80 C 10,90 20,105 30,95 C 40,85 30,75 20,80 Z"
              fill="#423e38"
              opacity="0.8"
            />
            <path
              d="M 80,80 C 70,75 60,85 70,95 C 80,105 90,90 80,80 Z"
              fill="#423e38"
              opacity="0.8"
            />
          </pattern>

          {/* Emerald Teal Velvet Sofa Gradient */}
          <linearGradient id="emeraldVelvet" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1b7a6e" />
            <stop offset="35%" stopColor="#145e54" />
            <stop offset="70%" stopColor="#0d423b" />
            <stop offset="100%" stopColor="#062420" />
          </linearGradient>

          {/* Burgundy Scalloped Swag Curtains */}
          <linearGradient id="wineCurtains" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#670d22" />
            <stop offset="40%" stopColor="#480717" />
            <stop offset="100%" stopColor="#250208" />
          </linearGradient>

          {/* Low Wooden Table */}
          <linearGradient id="smallWoodTable" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9c6644" />
            <stop offset="50%" stopColor="#b07d58" />
            <stop offset="100%" stopColor="#7f4f24" />
          </linearGradient>

          {/* Floor Marble */}
          <linearGradient id="smallFloorMarble" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#43362a" />
            <stop offset="30%" stopColor="#584838" />
            <stop offset="70%" stopColor="#2e241c" />
            <stop offset="100%" stopColor="#17120e" />
          </linearGradient>

          {/* Glow Filter */}
          <filter id="crystalGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Wall: Left grey plastered wall, Right damask floral wallpaper */}
        {/* Left plain textured grey wall */}
        <rect x="0" y="0" width="720" height="900" fill="#2b2d30" />
        {/* Right vintage damask wallpaper accent wall */}
        <rect x="720" y="0" width="480" height="900" fill="url(#damaskPattern)" />

        {/* 2. Cove Ceiling with Ornate Crystal Chandelier */}
        <g transform="translate(0, 0)">
          {/* Ceiling recessed cove */}
          <polygon points="0,0 1200,0 1000,160 200,160" fill="#3a3c42" />
          <polygon points="200,160 1000,160 850,320 350,320" fill="#484b52" />
          <rect x="350" y="160" width="500" height="160" fill="#2c2e33" />

          {/* Ornate Sparkling Crystal Chandelier */}
          <g transform="translate(600, 310)">
            {/* Ambient crystal halo glow */}
            <ellipse cx="0" cy="0" rx="90" ry="45" fill="#fffbe6" opacity="0.75" filter="url(#crystalGlow)" />
            {/* Central rod & canopy */}
            <line x1="0" y1="-140" x2="0" y2="0" stroke="#c59b27" strokeWidth="4" />
            <ellipse cx="0" cy="-130" rx="18" ry="8" fill="#d4af37" />
            <circle cx="0" cy="0" r="16" fill="#c59b27" />

            {/* Candle arms & hanging crystals */}
            {[-80, -45, 0, 45, 80].map((cX, idx) => (
              <g key={`c-arm-${idx}`}>
                <path d={`M 0,0 Q ${cX / 2},30 ${cX},-15`} stroke="#c59b27" strokeWidth="3" fill="none" />
                {/* Candle tube */}
                <rect x={cX - 4} y="-45" width="8" height="28" fill="#fff" rx="1" />
                {/* Candle golden flame */}
                <ellipse cx={cX} cy="-50" rx="4" ry="8" fill="#ffb703" filter="url(#crystalGlow)" />
                <ellipse cx={cX} cy="-49" rx="2" ry="5" fill="#ffffff" />
                {/* Hanging crystal prism */}
                <polygon points={`${cX},-10 ${cX - 4},15 ${cX},25 ${cX + 4},15`} fill="#ffffff" stroke="#e0e0e0" opacity="0.9" />
              </g>
            ))}

            {/* Beaded crystal swags connecting arms */}
            <path d="M -80,-15 Q -40,15 0,-15 Q 40,15 80,-15" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" fill="none" opacity="0.8" />
          </g>
        </g>

        {/* 3. Left Window: Scalloped Wine-Red Swag Curtains & Bright Window Light */}
        <g transform="translate(40, 260)">
          {/* Main window opening with natural daylight */}
          <rect x="0" y="0" width="350" height="420" fill="#1d1e22" />
          {/* Window pane with outdoor daylight haze */}
          <rect x="100" y="100" width="150" height="220" fill="#fffaed" filter="url(#crystalGlow)" opacity="0.9" />
          <rect x="110" y="110" width="130" height="200" fill="#ffffff" />

          {/* Deep Burgundy Scalloped Swag Curtains on Window */}
          <path
            d="M 0,0 L 350,0 L 350,150 C 270,300 200,320 175,180 C 150,320 80,300 0,150 Z"
            fill="url(#wineCurtains)"
          />
          {/* Swag folds and cascades */}
          <path d="M 0,50 Q 85,250 175,130 Q 265,250 350,50" stroke="#8a132e" strokeWidth="5" fill="none" opacity="0.75" />
          <path d="M 0,100 Q 85,300 175,170 Q 265,300 350,100" stroke="#8a132e" strokeWidth="5" fill="none" opacity="0.75" />

          {/* Left cascading drape */}
          <path d="M 0,0 Q 40,200 15,420 L 0,420 Z" fill="#38040e" />
          {/* Right cascading drape */}
          <path d="M 350,0 Q 310,200 335,420 L 350,420 Z" fill="#38040e" />

          {/* White Radiator heater under window */}
          <g transform="translate(540, 490)">
            <rect x="0" y="0" width="90" height="60" rx="3" fill="#eeeeee" stroke="#ccc" strokeWidth="1" />
            {[10, 22, 34, 46, 58, 70, 82].map((rX, idx) => (
              <line key={`rad2-${idx}`} x1={rX} y1="4" x2={rX} y2="56" stroke="#bbb" strokeWidth="2.5" />
            ))}
          </g>
        </g>

        {/* 4. Emerald Teal Velvet Tufted Sofas */}
        {/* Main Back Sofa (against wallpaper on right) */}
        <g transform="translate(680, 480)">
          {/* High backrest */}
          <rect
            x="0"
            y="0"
            width="380"
            height="110"
            rx="14"
            fill="url(#emeraldVelvet)"
            stroke="#05241e"
            strokeWidth="3"
          />

          {/* Deep Tufted Diamond Buttons */}
          {[20, 50, 80].map((yT, rIdx) => (
            <g key={`tuft-sm-${rIdx}`}>
              {[25, 65, 105, 145, 185, 225, 265, 305, 345].map((xT, cIdx) => (
                <g key={`st-${rIdx}-${cIdx}`}>
                  <circle cx={xT + (rIdx % 2 ? 20 : 0)} cy={yT} r="3.5" fill="#041714" />
                  <ellipse cx={xT + (rIdx % 2 ? 19 : -1)} cy={yT - 1} rx="1.5" ry="1" fill="#48cae4" opacity="0.7" />
                </g>
              ))}
            </g>
          ))}

          {/* Seat cushion */}
          <rect x="0" y="85" width="380" height="50" rx="8" fill="#0f4c44" stroke="#05241e" strokeWidth="2" />
        </g>

        {/* Right Corner Sofa (facing inward) */}
        <g transform="translate(920, 540)">
          <rect x="0" y="0" width="260" height="150" rx="14" fill="url(#emeraldVelvet)" stroke="#05241e" strokeWidth="3" />
          <rect x="-10" y="60" width="270" height="70" rx="8" fill="#0f4c44" stroke="#05241e" strokeWidth="2" />
        </g>

        {/* Small Emerald Footstool Poufs */}
        <g transform="translate(350, 530)">
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#145e54" stroke="#05241e" strokeWidth="1.5" />
          <circle cx="35" cy="20" r="3" fill="#05241e" />
        </g>
        <g transform="translate(430, 530)">
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#145e54" stroke="#05241e" strokeWidth="1.5" />
          <circle cx="35" cy="20" r="3" fill="#05241e" />
        </g>

        {/* Right Emerald Poufs in foreground */}
        <g transform="translate(1040, 650)">
          <polygon points="0,25 40,0 80,25 40,50" fill="#1b7a6e" stroke="#05241e" strokeWidth="2" />
          <polygon points="0,25 40,50 40,110 0,85" fill="#145e54" stroke="#05241e" strokeWidth="2" />
          <polygon points="40,50 80,25 80,85 40,110" fill="#0d423b" stroke="#05241e" strokeWidth="2" />
        </g>

        {/* 5. Center Rectangular Natural Wood Coffee Table */}
        <g transform="translate(600, 510)">
          {/* Tabletop */}
          <polygon
            points="0,35 340,30 310,75 -30,80"
            fill="url(#smallWoodTable)"
            stroke="#4a2810"
            strokeWidth="2.5"
          />
          {/* Specular sheen on polished wood */}
          <polygon points="10,42 320,38 295,55 -15,58" fill="#ffffff" opacity="0.2" />

          {/* Wooden legs */}
          <rect x="-20" y="80" width="16" height="60" fill="#6f4e37" stroke="#333" strokeWidth="1" />
          <rect x="290" y="75" width="16" height="60" fill="#6f4e37" stroke="#333" strokeWidth="1" />
        </g>

        {/* 6. Left Corner Karaoke Audio Console & Speaker */}
        <g transform="translate(0, 580)">
          {/* Black Audio Desk */}
          <polygon points="0,0 330,20 280,200 0,180" fill="#141518" stroke="#333" strokeWidth="2" />
          {/* DJ Monitor Screen */}
          <g transform="translate(10, 10)">
            <rect x="0" y="0" width="120" height="80" rx="4" fill="#050505" stroke="#444" strokeWidth="2" />
            <rect x="5" y="5" width="110" height="70" rx="2" fill="#111622" />
            <circle cx="60" cy="40" r="18" fill="#ffb703" opacity="0.4" />
          </g>
          {/* Keyboard & Songbook */}
          <rect x="0" y="95" width="110" height="50" rx="3" fill="#222" stroke="#555" strokeWidth="1" />
          {/* Big Floor Standing Speaker in Corner */}
          <g transform="translate(0, 160)">
            <rect x="0" y="0" width="140" height="260" fill="#0a0a0c" stroke="#222" strokeWidth="3" />
            <circle cx="70" cy="70" r="45" fill="#141518" stroke="#444" strokeWidth="2" />
            <circle cx="70" cy="70" r="16" fill="#000" />
            <circle cx="70" cy="180" r="55" fill="#141518" stroke="#444" strokeWidth="2" />
            <circle cx="70" cy="180" r="22" fill="#000" />
          </g>
        </g>

        {/* 7. Polished Brown Specular Marble Floor with Reflections */}
        <g transform="translate(0, 560)">
          <rect width="1200" height="1040" fill="url(#smallFloorMarble)" />

          {/* Tile joints in perspective */}
          {[120, 280, 480, 720, 1000].map((hY, idx) => (
            <line key={`sm-h-${idx}`} x1="0" y1={hY} x2="1200" y2={hY} stroke="#7a6858" strokeWidth="2.5" opacity="0.45" />
          ))}
          {[-150, 180, 520, 860, 1200].map((vX, idx) => (
            <line key={`sm-v-${idx}`} x1={vX} y1="0" x2={vX + 260} y2="1040" stroke="#7a6858" strokeWidth="2.5" opacity="0.4" />
          ))}

          {/* Marble Swirls */}
          <path d="M 200,80 Q 450,280 350,600 Q 550,850 700,1040" stroke="#c4b5a5" strokeWidth="3" fill="none" opacity="0.22" />
          <path d="M 750,40 Q 950,300 880,650 Q 1020,850 1150,1040" stroke="#e3d5c8" strokeWidth="3.5" fill="none" opacity="0.25" />

          {/* Specular Window Sunlight Reflection on Marble */}
          <polygon
            points="480,40 560,40 520,380 430,380"
            fill="#ffffff"
            opacity="0.45"
            filter="url(#crystalGlow)"
          />
          {/* Chandelier reflections */}
          <ellipse cx="600" cy="220" rx="90" ry="25" fill="#ffeaa7" opacity="0.4" filter="url(#crystalGlow)" />
          {/* Emerald reflection */}
          <ellipse cx="800" cy="110" rx="140" ry="30" fill="#145e54" opacity="0.3" filter="url(#crystalGlow)" />
        </g>
      </svg>
    </div>
  );
};
