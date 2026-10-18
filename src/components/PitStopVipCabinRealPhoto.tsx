import React from 'react';

export const PitStopVipCabinRealPhoto: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 1600"
        className="h-full w-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Room Charcoal Walls */}
          <linearGradient id="vipWallCharcoal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#131418" />
            <stop offset="40%" stopColor="#1a1c22" />
            <stop offset="100%" stopColor="#0e0f12" />
          </linearGradient>

          {/* Purple Mauve Velvet Sofa Gradient */}
          <linearGradient id="purpleVelvet" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9c6395" />
            <stop offset="35%" stopColor="#7a4274" />
            <stop offset="70%" stopColor="#542450" />
            <stop offset="100%" stopColor="#30112e" />
          </linearGradient>

          {/* Deep Burgundy Window Swag Drapes */}
          <linearGradient id="burgundyDrapes" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38040e" />
            <stop offset="30%" stopColor="#670d22" />
            <stop offset="70%" stopColor="#4c0817" />
            <stop offset="100%" stopColor="#250208" />
          </linearGradient>

          {/* Faceted Beveled Mirror Reflection Gradient */}
          <linearGradient id="bevelMirror" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d222b" />
            <stop offset="25%" stopColor="#354050" />
            <stop offset="50%" stopColor="#506078" />
            <stop offset="75%" stopColor="#2c3545" />
            <stop offset="100%" stopColor="#181d24" />
          </linearGradient>

          {/* Dark Banquet Table Wood */}
          <linearGradient id="darkWoodTable" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18110b" />
            <stop offset="40%" stopColor="#2c1e14" />
            <stop offset="70%" stopColor="#3a281b" />
            <stop offset="100%" stopColor="#150e09" />
          </linearGradient>

          {/* Polished Marble Floor with specular reflections */}
          <radialGradient id="marbleVipFloor" cx="50%" cy="40%" r="70%">
            <stop offset="0%" stopColor="#634c3e" />
            <stop offset="30%" stopColor="#423228" />
            <stop offset="70%" stopColor="#291e17" />
            <stop offset="100%" stopColor="#140e0b" />
          </radialGradient>

          {/* Spotlight Glow Filter */}
          <filter id="vipLightGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Dark Charcoal Architectural Wall */}
        <rect width="1200" height="1600" fill="url(#vipWallCharcoal)" />

        {/* 2. Grid Tile Acoustic Ceiling with Recessed Spotlights & Chandelier */}
        <g transform="translate(0, 0)">
          <rect width="1200" height="380" fill="#1e2026" />
          {/* Ceiling grid lines in perspective */}
          {[0, 80, 160, 240, 320, 380].map((y, idx) => (
            <line key={`c-grid-h-${idx}`} x1="0" y1={y} x2="1200" y2={y} stroke="#333742" strokeWidth="1.5" />
          ))}
          {[0, 150, 300, 450, 600, 750, 900, 1050, 1200].map((x, idx) => (
            <line key={`c-grid-v-${idx}`} x1={x} y1="0" x2={x} y2="380" stroke="#333742" strokeWidth="1.5" />
          ))}

          {/* Recessed bright LED downlights */}
          {[
            { x: 180, y: 120 },
            { x: 450, y: 150 },
            { x: 750, y: 150 },
            { x: 1020, y: 120 },
            { x: 220, y: 280 },
            { x: 980, y: 280 },
          ].map((sp, idx) => (
            <g key={`spot-${idx}`} transform={`translate(${sp.x}, ${sp.y})`}>
              <ellipse cx="0" cy="0" rx="35" ry="20" fill="#fffbe6" filter="url(#vipLightGlow)" opacity="0.65" />
              <ellipse cx="0" cy="0" rx="16" ry="10" fill="#ffffff" />
            </g>
          ))}

          {/* Central Modern Multi-Arm Chandelier with Cream Fabric Shades */}
          <g transform="translate(600, 360)">
            <ellipse cx="0" cy="0" rx="90" ry="35" fill="#fffbe6" filter="url(#vipLightGlow)" opacity="0.8" />
            <circle cx="0" cy="-20" r="14" fill="#222" />
            <line x1="0" y1="-80" x2="0" y2="-20" stroke="#111" strokeWidth="4" />
            {/* Multiple brass curved arms */}
            {[-120, -70, -30, 30, 70, 120].map((armX, aIdx) => (
              <g key={`arm-${aIdx}`}>
                <path d={`M 0,-20 Q ${armX / 2},-40 ${armX},10`} stroke="#222" strokeWidth="3" fill="none" />
                {/* Cream shade */}
                <polygon points={`${armX - 18},10 ${armX + 18},10 ${armX + 26},36 ${armX - 26},36`} fill="#f5f0dc" stroke="#999" strokeWidth="1" />
                <ellipse cx={armX} cy="36" rx="26" ry="6" fill="#ffeaa7" filter="url(#vipLightGlow)" opacity="0.9" />
              </g>
            ))}
          </g>
        </g>

        {/* 3. Left Wall: Classical White Moulding Frames & Burgundy Draped Swag Curtains */}
        <g transform="translate(30, 380)">
          {/* Wall Panel 1 with white classical moulding frame */}
          <rect x="0" y="20" width="130" height="380" rx="4" fill="#181a20" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
          <rect x="12" y="32" width="106" height="356" rx="2" fill="#131418" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
          {/* Scalloped corner ornament */}
          <circle cx="20" cy="40" r="4" fill="#fff" opacity="0.8" />
          <circle cx="110" cy="40" r="4" fill="#fff" opacity="0.8" />

          {/* Burgundy Scalloped Swag Window Drapes */}
          <g transform="translate(150, 10)">
            <rect x="0" y="0" width="160" height="390" fill="#101115" />
            {/* Cascading Drapes with deep folds */}
            <path d="M 0,10 Q 80,180 160,10 L 160,390 L 0,390 Z" fill="url(#burgundyDrapes)" />
            <path d="M 0,70 Q 80,240 160,70" stroke="#8a132e" strokeWidth="6" fill="none" opacity="0.7" />
            <path d="M 0,130 Q 80,300 160,130" stroke="#8a132e" strokeWidth="6" fill="none" opacity="0.7" />
            {/* White Radiator under window */}
            <g transform="translate(20, 310)">
              <rect x="0" y="0" width="120" height="70" rx="4" fill="#f0f0f0" stroke="#ccc" strokeWidth="1" />
              {[15, 30, 45, 60, 75, 90, 105].map((rX, idx) => (
                <line key={`rad-${idx}`} x1={rX} y1="4" x2={rX} y2="66" stroke="#bbb" strokeWidth="3" />
              ))}
            </g>
          </g>

          {/* Wall Panel 2 with white frame */}
          <g transform="translate(330, 20)">
            <rect x="0" y="0" width="140" height="380" rx="4" fill="#181a20" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
            <rect x="12" y="12" width="116" height="356" rx="2" fill="#131418" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" />
          </g>

          {/* White Air Conditioner unit in corner */}
          <rect x="490" y="240" width="45" height="150" rx="4" fill="#e8e8e8" stroke="#bbb" strokeWidth="1" />
        </g>

        {/* 4. Right Wall: Grand Architectural Diamond-Cut Beveled Mirror Wall */}
        <g transform="translate(650, 430)">
          {/* Black structural surround */}
          <rect x="0" y="0" width="520" height="320" rx="6" fill="#0d0e11" stroke="#333" strokeWidth="3" />
          {/* Mirror base with luminous reflections */}
          <rect x="10" y="10" width="500" height="300" rx="4" fill="url(#bevelMirror)" />

          {/* Diamond-cut beveled lattice grid */}
          {/* Diagonal lines to form diamonds */}
          {[0, 80, 160, 240, 320, 400, 480].map((dX, idx) => (
            <React.Fragment key={`diag-${idx}`}>
              <line x1={dX} y1="10" x2={dX + 150} y2="310" stroke="#b0c4de" strokeWidth="2.5" opacity="0.8" />
              <line x1={dX + 150} y1="10" x2={dX} y2="310" stroke="#b0c4de" strokeWidth="2.5" opacity="0.8" />
            </React.Fragment>
          ))}

          {/* Beveled Highlights & Mirrors reflecting the purple room & chandelier */}
          <ellipse cx="250" cy="150" rx="180" ry="70" fill="#7a4274" opacity="0.4" filter="url(#vipLightGlow)" />
          <ellipse cx="250" cy="70" rx="80" ry="25" fill="#ffeaa7" opacity="0.6" filter="url(#vipLightGlow)" />

          {/* Glossy Black Counter sill below mirror */}
          <rect x="0" y="320" width="520" height="70" fill="#121317" stroke="#222" strokeWidth="2" />
        </g>

        {/* 5. The Luxurious Long Purple Velvet Chesterfield Banquet Sofa */}
        <g transform="translate(100, 520)">
          {/* Long High Backrest */}
          <rect
            x="0"
            y="0"
            width="550"
            height="180"
            rx="20"
            fill="url(#purpleVelvet)"
            stroke="#2e0f2b"
            strokeWidth="3"
          />

          {/* Deep Diamond Button Tufting on Backrest */}
          {[30, 70, 110, 150].map((yT, rIdx) => (
            <g key={`tuft-vip-${rIdx}`}>
              {[30, 75, 120, 165, 210, 255, 300, 345, 390, 435, 480, 520].map((xT, cIdx) => (
                <g key={`v-t-${rIdx}-${cIdx}`}>
                  <circle cx={xT + (rIdx % 2 ? 22 : 0)} cy={yT} r="4" fill="#290a26" />
                  <ellipse cx={xT + (rIdx % 2 ? 21 : -1)} cy={yT - 1} rx="1.5" ry="1" fill="#d896d0" opacity="0.8" />
                  {/* Crease lines */}
                  <line x1={xT} y1={yT} x2={xT + 22} y2={yT + 40} stroke="#3d123a" strokeWidth="1.5" opacity="0.6" />
                  <line x1={xT + 22} y1={yT} x2={xT} y2={yT + 40} stroke="#3d123a" strokeWidth="1.5" opacity="0.6" />
                </g>
              ))}
            </g>
          ))}

          {/* Left Rolled Chesterfield Scroll Armrest */}
          <path
            d="M -25,20 C -45,30 -45,160 -15,190 L 20,190 L 10,20 Z"
            fill="#7a4274"
            stroke="#290a26"
            strokeWidth="3"
          />
          <circle cx="-25" cy="50" r="14" fill="#542450" />

          {/* Deep Plush Seat Cushion */}
          <rect x="0" y="145" width="550" height="70" rx="10" fill="#693463" stroke="#290a26" strokeWidth="2" />
        </g>

        {/* 6. Massive Dark Wood Banquet Table (Center Perspective) */}
        <g transform="translate(260, 550)">
          {/* Tabletop Perspective Slab */}
          <polygon
            points="0,150 490,90 490,130 0,230"
            fill="url(#darkWoodTable)"
            stroke="#0a0705"
            strokeWidth="3"
          />
          {/* Glossy varnish specular sheen on table */}
          <polygon
            points="20,155 470,100 460,115 10,185"
            fill="#ffffff"
            opacity="0.15"
          />
          {/* Table sturdy trestle legs */}
          <polygon points="50,210 90,200 80,310 40,310" fill="#150e09" />
          <polygon points="400,120 440,110 430,220 390,220" fill="#150e09" />

          {/* Napkin holder / center accents */}
          <rect x="140" y="170" width="30" height="20" rx="2" fill="#d4af37" stroke="#333" strokeWidth="1" />
        </g>

        {/* 7. Purple Velvet Square Poufs / Cubes Around the Banquet Table */}
        {/* Front row poufs */}
        {[
          { x: 190, y: 640 },
          { x: 280, y: 660 },
          { x: 440, y: 640 },
          { x: 530, y: 630 },
          { x: 610, y: 620 },
          { x: 690, y: 610 },
          { x: 770, y: 600 },
        ].map((pf, idx) => (
          <g key={`pouf-${idx}`} transform={`translate(${pf.x}, ${pf.y})`}>
            {/* Top cube facet */}
            <polygon points="0,20 35,0 70,20 35,40" fill="#8f5088" stroke="#330e30" strokeWidth="1.5" />
            {/* Left face */}
            <polygon points="0,20 35,40 35,90 0,70" fill="#6e3768" stroke="#330e30" strokeWidth="1.5" />
            {/* Right face */}
            <polygon points="35,40 70,20 70,70 35,90" fill="#4d1f47" stroke="#330e30" strokeWidth="1.5" />
            {/* Center button */}
            <circle cx="35" cy="20" r="2.5" fill="#220520" />
          </g>
        ))}

        {/* 8. Specular Glossy Brown Marble Floor Tiles with Reflections */}
        <g transform="translate(0, 770)">
          <rect width="1200" height="830" fill="url(#marbleVipFloor)" />

          {/* Marble Tile Perspective Grid Lines */}
          {/* Horizontal joint lines */}
          {[100, 240, 420, 640, 830].map((jY, idx) => (
            <line key={`fl-h-${idx}`} x1="0" y1={jY} x2="1200" y2={jY} stroke="#856b5b" strokeWidth="2.5" opacity="0.4" />
          ))}

          {/* Perspective diagonal lines */}
          {[-100, 200, 500, 800, 1100, 1400].map((dX, idx) => (
            <line key={`fl-v-${idx}`} x1={dX} y1="0" x2={dX + 250} y2="830" stroke="#856b5b" strokeWidth="2" opacity="0.35" />
          ))}

          {/* Marble organic veining swirls */}
          <path d="M 150,100 Q 350,300 280,600 Q 420,750 550,830" stroke="#a68c7c" strokeWidth="3" fill="none" opacity="0.25" />
          <path d="M 800,50 Q 950,250 900,550 Q 1050,700 1150,830" stroke="#d5bdaf" strokeWidth="3.5" fill="none" opacity="0.25" />

          {/* Bright Specular Light Reflections of Ceiling Downlights & Chandelier */}
          <ellipse cx="600" cy="180" rx="140" ry="35" fill="#fffbe6" opacity="0.5" filter="url(#vipLightGlow)" />
          <ellipse cx="350" cy="280" rx="90" ry="25" fill="#fffbe6" opacity="0.4" filter="url(#vipLightGlow)" />
          <ellipse cx="850" cy="240" rx="100" ry="25" fill="#fffbe6" opacity="0.4" filter="url(#vipLightGlow)" />
          <ellipse cx="500" cy="520" rx="160" ry="40" fill="#ffeaa7" opacity="0.35" filter="url(#vipLightGlow)" />

          {/* Soft purple reflection of the plush velvet sofa on marble floor */}
          <ellipse cx="380" cy="80" rx="200" ry="40" fill="#7a4274" opacity="0.25" filter="url(#vipLightGlow)" />
        </g>
      </svg>
    </div>
  );
};
