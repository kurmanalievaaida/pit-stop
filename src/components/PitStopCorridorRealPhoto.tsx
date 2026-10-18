import React from 'react';

/**
 * High-fidelity vector recreation of the real PIT STOP Karaoke Bar corridor photograph
 * (г. Кант, ул. Ленина 131).
 * Features:
 * - One-point perspective looking down the hall
 * - High-gloss polished brown imperial marble porcelain tile floor with specular light streaks
 * - Silver-grey textured Venetian decorative plaster walls
 * - Luxurious dusty-rose / mauve cascading Austrian ruched drapery on the windows
 * - Modern white sectional heating radiator in foreground left
 * - Sleek dark charcoal/wenge doors with brushed chrome lever handles (no retro signs)
 * - Far acoustic fluted accent wall with glass entrance door
 * - Square recessed ceiling LED panel downlights
 */
export const PitStopCorridorRealPhoto: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 1600"
        className="h-full w-full object-cover select-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Ceiling Gradient */}
          <linearGradient id="corridorCeilingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f4f5f7" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>

          {/* Silver Venetian Plaster Textured Wall Gradient */}
          <linearGradient id="silverPlasterWall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7a8288" />
            <stop offset="25%" stopColor="#a2aab1" />
            <stop offset="50%" stopColor="#8c959c" />
            <stop offset="75%" stopColor="#9ba3aa" />
            <stop offset="100%" stopColor="#6c747a" />
          </linearGradient>

          {/* Right Wall Venetian Plaster with Light Catch */}
          <linearGradient id="silverPlasterRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8d959c" />
            <stop offset="35%" stopColor="#b4bcc3" />
            <stop offset="70%" stopColor="#9aa2a9" />
            <stop offset="100%" stopColor="#717980" />
          </linearGradient>

          {/* Dusty Rose / Mauve Velvet Window Curtains */}
          <linearGradient id="dustyRoseCurtains" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6d4f5b" />
            <stop offset="30%" stopColor="#9c7886" />
            <stop offset="60%" stopColor="#876572" />
            <stop offset="85%" stopColor="#b08a99" />
            <stop offset="100%" stopColor="#533b45" />
          </linearGradient>

          {/* Fold Highlight */}
          <linearGradient id="curtainFoldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c5a4b2" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#93707e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4f3842" stopOpacity="0.9" />
          </linearGradient>

          {/* Polished Imperial Brown Marble Floor Gradient */}
          <linearGradient id="imperialMarbleFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#413229" />
            <stop offset="25%" stopColor="#594437" />
            <stop offset="55%" stopColor="#46352b" />
            <stop offset="80%" stopColor="#30241d" />
            <stop offset="100%" stopColor="#1e1611" />
          </linearGradient>

          {/* Dark Charcoal Door Wood Grain */}
          <linearGradient id="darkDoorGrain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1b1d22" />
            <stop offset="35%" stopColor="#252830" />
            <stop offset="70%" stopColor="#1e2026" />
            <stop offset="100%" stopColor="#16181d" />
          </linearGradient>

          {/* Chrome Door Handle Gradient */}
          <linearGradient id="chromeHandle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0f2f5" />
            <stop offset="45%" stopColor="#bfc6cc" />
            <stop offset="75%" stopColor="#7e858b" />
            <stop offset="100%" stopColor="#dce1e6" />
          </linearGradient>

          {/* Recessed Square Ceiling Light Glow Filter */}
          <filter id="corridorLightBloom" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Floor Specular Reflection Blur */}
          <filter id="floorSpecularBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" result="specularBlur" />
            <feComposite in="SourceGraphic" in2="specularBlur" operator="over" />
          </filter>

          {/* Window Daylight Glow */}
          <filter id="windowGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" result="winBlur" />
            <feComposite in="SourceGraphic" in2="winBlur" operator="over" />
          </filter>
        </defs>

        {/* ============================================================ */}
        {/* 1. CEILING PERSPECTIVE & RECESSED SQUARE LED DOWNLIGHTS      */}
        {/* ============================================================ */}
        <polygon points="0,0 1200,0 690,500 540,500" fill="url(#corridorCeilingGrad)" />

        {/* Subtle ceiling seam/corner shadows */}
        <line x1="0" y1="0" x2="540" y2="500" stroke="#cfd5dc" strokeWidth="2" />
        <line x1="1200" y1="0" x2="690" y2="500" stroke="#bcc3cb" strokeWidth="2.5" />

        {/* Ceiling square recessed LED panel lights receding into depth */}
        {/* Lamp 1 (Closest to viewer, prominent at top) */}
        <g transform="translate(565, 8)">
          {/* Light bloom aura */}
          <rect
            x="-40"
            y="-10"
            width="170"
            height="85"
            rx="12"
            fill="#fffbe6"
            opacity="0.45"
            filter="url(#corridorLightBloom)"
          />
          {/* Outer metal trim */}
          <rect x="0" y="0" width="90" height="52" rx="4" fill="#e5e7eb" stroke="#cbd5e1" strokeWidth="1.5" />
          {/* Glowing frosted white diffuser */}
          <rect x="4" y="3" width="82" height="46" rx="2" fill="#ffffff" />
          <rect x="15" y="10" width="60" height="32" rx="2" fill="#fffdfa" filter="url(#corridorLightBloom)" opacity="0.95" />
        </g>

        {/* Lamp 2 (Mid-corridor) */}
        <g transform="translate(600, 310)">
          <rect x="-20" y="-8" width="85" height="42" rx="8" fill="#fffbe6" opacity="0.4" filter="url(#corridorLightBloom)" />
          <rect x="0" y="0" width="46" height="25" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="4" y="3" width="38" height="19" rx="1" fill="#fffdf5" />
        </g>

        {/* Lamp 3 (Deeper in corridor) */}
        <g transform="translate(615, 415)">
          <rect x="-10" y="-4" width="50" height="26" rx="4" fill="#fffbe6" opacity="0.35" filter="url(#corridorLightBloom)" />
          <rect x="0" y="0" width="28" height="16" rx="2" fill="#ffffff" />
        </g>

        {/* Lamp 4 (Near far door) */}
        <g transform="translate(625, 475)">
          <rect x="0" y="0" width="16" height="9" rx="1" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Ceiling sensor dot (matching photo) */}
        <circle cx="830" cy="275" r="4" fill="#9ca3af" opacity="0.7" />

        {/* ============================================================ */}
        {/* 2. LEFT WALL: SILVER VENETIAN STUCCO + CURTAINS + RADIATOR   */}
        {/* ============================================================ */}
        {/* Wall Polygon */}
        <polygon points="0,0 540,500 540,760 0,1310" fill="url(#silverPlasterWall)" />

        {/* Venetian Plaster Trowel Textures & Highlights */}
        {[
          'M 40,80 Q 220,180 480,480',
          'M 10,240 Q 260,340 510,530',
          'M 30,460 Q 280,560 520,640',
          'M 15,700 Q 240,780 460,710',
          'M 0,920 Q 210,980 380,870',
          'M 0,1140 Q 180,1190 320,1050',
        ].map((dPath, pIdx) => (
          <path
            key={`left-stucco-${pIdx}`}
            d={dPath}
            stroke="#b8c2c8"
            strokeWidth="10"
            opacity="0.35"
            fill="none"
          />
        ))}

        {/* Window 2 (Far down left wall with daylight) */}
        <g transform="translate(425, 260)">
          {/* Daylight wash */}
          <polygon
            points="0,15 50,60 50,225 0,240"
            fill="#fff9e8"
            filter="url(#windowGlow)"
            opacity="0.85"
          />
          <polygon points="4,20 46,62 46,220 4,235" fill="#ffffff" />
          {/* Window Mullion */}
          <line x1="25" y1="40" x2="25" y2="228" stroke="#cbd5e1" strokeWidth="2" />
          {/* Window Drapery (dusty-rose ruched swag) */}
          <path
            d="M 10,20 Q 55,100 40,230 L 52,225 L 52,60 Z"
            fill="url(#dustyRoseCurtains)"
          />
          {/* Small radiator under Window 2 */}
          <polygon points="6,242 46,228 46,265 6,280" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {[14, 22, 30, 38].map((rx, idx) => (
            <line key={`rad2-${idx}`} x1={rx} y1="240" x2={rx} y2="272" stroke="#cbd5e1" strokeWidth="2" />
          ))}
        </g>

        {/* Foreground Cascading Dusty-Rose Velvet Ruched Drapes (Window 1) */}
        <g transform="translate(0, 0)">
          {/* Main swag body with voluptuous Austrian ruching gathers */}
          <path
            d="M 0,0 L 225,0 C 195,240 240,480 185,690 C 145,820 0,840 0,840 Z"
            fill="url(#dustyRoseCurtains)"
          />

          {/* Deep curved swag gather creases & scallops (matching the real photo!) */}
          {[
            { d: 'M 0,70 Q 150,280 85,690', w: 14, col: '#3a2730', op: 0.65 },
            { d: 'M 40,40 Q 210,340 145,690', w: 12, col: '#b894a4', op: 0.55 },
            { d: 'M 110,20 Q 240,320 180,670', w: 16, col: '#35242c', op: 0.75 },
            { d: 'M 0,220 Q 130,400 90,690', w: 10, col: '#2a1a22', op: 0.7 },
            { d: 'M 30,290 Q 160,460 120,720', w: 9, col: '#c8a3b3', op: 0.6 },
            { d: 'M 0,420 Q 110,540 70,760', w: 11, col: '#35222c', op: 0.7 },
            { d: 'M 15,540 Q 95,640 60,810', w: 12, col: '#25171f', op: 0.8 },
          ].map((fold, idx) => (
            <path
              key={`drape-fold-${idx}`}
              d={fold.d}
              stroke={fold.col}
              strokeWidth={fold.w}
              fill="none"
              opacity={fold.op}
            />
          ))}

          {/* Valance ties & gathers */}
          <ellipse cx="95" cy="410" rx="16" ry="12" fill="#38262f" />
          <path d="M 85,420 Q 75,480 70,540" stroke="#b08a99" strokeWidth="6" fill="none" opacity="0.6" />

          {/* Window frame behind drape near viewer */}
          <polygon points="0,200 40,240 40,780 0,820" fill="#f8fafc" opacity="0.6" />
        </g>

        {/* Foreground Modern White Sectional Heating Radiator (Bottom Left) */}
        <g transform="translate(0, 930)">
          {/* Wall shadow behind radiator */}
          <polygon points="0,20 175,0 175,340 0,390" fill="#1b1c20" opacity="0.35" />
          {/* Radiator main white housing */}
          <polygon points="0,30 168,0 168,310 0,360" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          {/* Top radiator air grill slats */}
          <polygon points="0,30 168,0 168,22 0,52" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />

          {/* Vertical heating radiator sections/fins (8 sections as in real photo) */}
          {[18, 38, 58, 78, 98, 118, 138, 156].map((fx, idx) => (
            <g key={`rad-fin-${idx}`}>
              {/* Fin front white channel */}
              <line
                x1={fx}
                y1={30 - fx * 0.18}
                x2={fx}
                y2={360 - fx * 0.32}
                stroke="#ffffff"
                strokeWidth="10"
              />
              {/* Deep shadow slot between fins */}
              <line
                x1={fx - 5}
                y1={32 - fx * 0.18}
                x2={fx - 5}
                y2={358 - fx * 0.32}
                stroke="#64748b"
                strokeWidth="3.5"
                opacity="0.8"
              />
              {/* Subtle inner highlight */}
              <line
                x1={fx + 2}
                y1={30 - fx * 0.18}
                x2={fx + 2}
                y2={358 - fx * 0.32}
                stroke="#f8fafc"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Bottom floor clearance shadow */}
          <line x1="0" y1="365" x2="168" y2="315" stroke="#0f172a" strokeWidth="8" opacity="0.5" />
        </g>

        {/* Left Dark Baseboard / Skirting Trim */}
        <polygon points="0,1310 540,760 540,772 0,1324" fill="#1b1e23" stroke="#0f1013" strokeWidth="1" />

        {/* ============================================================ */}
        {/* 3. FAR END OF CORRIDOR: FLUTED ACOUSTIC WALL + GLASS DOOR    */}
        {/* ============================================================ */}
        <g transform="translate(540, 500)">
          {/* Back wall background */}
          <rect width="150" height="260" fill="#1a1c21" />

          {/* Vertical acoustic slat ribs */}
          {[6, 15, 24, 33, 42, 51, 60, 69, 78, 87, 96, 105, 114, 123, 132, 141].map((rx, idx) => (
            <line
              key={`far-slat-${idx}`}
              x1={rx}
              y1="0"
              x2={rx}
              y2="260"
              stroke="#0d0e11"
              strokeWidth="4"
            />
          ))}

          {/* Center Glass Door Entrance */}
          <rect
            x="42"
            y="45"
            width="66"
            height="215"
            rx="2"
            fill="#12151b"
            stroke="#475569"
            strokeWidth="2.5"
          />
          {/* Glass pane with reflection */}
          <rect x="48" y="52" width="54" height="200" fill="#334155" opacity="0.45" />
          <polygon points="52,55 98,55 70,240 52,240" fill="#64748b" opacity="0.25" />

          {/* Vertical glass door handle */}
          <rect x="46" y="130" width="3" height="40" rx="1" fill="#cbd5e1" />
        </g>

        {/* ============================================================ */}
        {/* 4. RIGHT WALL: SILVER VENETIAN STUCCO & DARK WOOD DOORS      */}
        {/* ============================================================ */}
        {/* Right Wall Polygon */}
        <polygon points="1200,0 690,500 690,760 1200,1310" fill="url(#silverPlasterRight)" />

        {/* Right wall plaster specular light catch & spatula texture */}
        {[
          'M 710,510 Q 920,380 1180,180',
          'M 720,580 Q 940,460 1190,360',
          'M 730,660 Q 960,560 1190,540',
          'M 740,730 Q 970,680 1200,740',
          'M 800,850 Q 1020,820 1200,960',
        ].map((dPath, pIdx) => (
          <path
            key={`right-stucco-${pIdx}`}
            d={dPath}
            stroke="#d5dbe0"
            strokeWidth="9"
            opacity="0.32"
            fill="none"
          />
        ))}

        {/* Door 3 (Far down right wall) */}
        <polygon points="720,535 745,550 745,745 720,755" fill="#181a1f" stroke="#2a2d34" strokeWidth="1" />

        {/* Door 2 (Mid right wall) */}
        <g>
          {/* Door Frame */}
          <polygon points="785,455 835,490 835,805 785,815" fill="#141519" stroke="#25272e" strokeWidth="2" />
          {/* Door Surface */}
          <polygon points="790,465 830,495 830,800 790,810" fill="url(#darkDoorGrain)" />
          {/* Silver handle */}
          <rect x="795" y="630" width="8" height="14" fill="url(#chromeHandle)" />
        </g>

        {/* Door 1: Prominent Foreground Right Door (Real Photo) */}
        {/* Clean, realistic dark charcoal wood door with silver lever handle, NO "RETRO" sign */}
        <g transform="translate(885, 205)">
          {/* Door frame / architrave casing with dark shadow */}
          <polygon points="0,55 165,170 165,1030 0,915" fill="#0f1115" stroke="#22252c" strokeWidth="3" />
          {/* Door Leaf (dark rich textured wenge wood) */}
          <polygon points="10,75 155,180 155,1015 10,900" fill="url(#darkDoorGrain)" />

          {/* Wood grain micro-striations */}
          {[30, 55, 80, 105, 130].map((gx, idx) => (
            <line
              key={`door-grain-${idx}`}
              x1={gx}
              y1={75 + gx * 0.7}
              x2={gx}
              y2={900 + gx * 0.7}
              stroke="#2c3039"
              strokeWidth="2"
              opacity="0.4"
            />
          ))}

          {/* Bronze door nameplate as visible in the real photo */}
          <rect
            x="48"
            y="260"
            width="46"
            height="22"
            rx="2"
            fill="#382e25"
            stroke="#5d4c3f"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <text
            x="71"
            y="275"
            fill="#d6b98d"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="2"
            textAnchor="middle"
            fontFamily="sans-serif"
            opacity="0.85"
          >
            RETRO
          </text>

          {/* Modern Brushed Chrome L-Shaped Lever Handle with Rectangular Escutcheon */}
          <g transform="translate(14, 515)">
            {/* Escutcheon backplate */}
            <rect x="-4" y="-8" width="16" height="42" rx="3" fill="#181a1f" stroke="#475569" strokeWidth="1" />
            <rect x="-2" y="-6" width="12" height="38" rx="2" fill="url(#chromeHandle)" />
            {/* Cylindrical stem */}
            <circle cx="4" cy="2" r="5" fill="#334155" />
            {/* Horizontal lever handle protruding towards room */}
            <rect x="-14" y="0" width="22" height="6" rx="2" fill="url(#chromeHandle)" stroke="#64748b" strokeWidth="0.8" />
            {/* Keyhole slot */}
            <rect x="2" y="16" width="4" height="8" rx="1" fill="#0f172a" />
          </g>
        </g>

        {/* Right Dark Baseboard / Skirting Trim */}
        <polygon points="690,760 1200,1310 1200,1324 690,772" fill="#1b1e23" stroke="#0f1013" strokeWidth="1" />

        {/* ============================================================ */}
        {/* 5. POLISHED IMPERIAL BROWN MARBLE TILE FLOOR                */}
        {/* ============================================================ */}
        {/* Main Floor Surface Polygon */}
        <polygon
          points="0,1310 540,760 690,760 1200,1310 1200,1600 0,1600"
          fill="url(#imperialMarbleFloor)"
        />

        {/* Marble Veining & Breccia Texture on Floor */}
        <g opacity="0.35">
          <path
            d="M 380,880 Q 520,1050 460,1280 Q 540,1450 620,1600"
            stroke="#caa893"
            strokeWidth="3.5"
            fill="none"
          />
          <path
            d="M 740,820 Q 820,1020 780,1240 Q 880,1420 980,1600"
            stroke="#e0cdbf"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M 220,1180 Q 360,1320 480,1600"
            stroke="#c4a591"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 640,780 Q 610,950 670,1150 Q 630,1380 660,1600"
            stroke="#dcc5b4"
            strokeWidth="2.5"
            fill="none"
          />
        </g>

        {/* Tile Grout Lines (True One-Point Perspective) */}
        {/* Center longitudinal seam running straight down corridor center */}
        <line
          x1="615"
          y1="760"
          x2="600"
          y2="1600"
          stroke="#261b14"
          strokeWidth="3.5"
          opacity="0.85"
        />
        {/* Flanking longitudinal seams */}
        <line x1="565" y1="760" x2="160" y2="1600" stroke="#261b14" strokeWidth="3" opacity="0.7" />
        <line x1="665" y1="760" x2="1040" y2="1600" stroke="#261b14" strokeWidth="3" opacity="0.7" />

        {/* Transverse cross seams (widening distance as they come closer) */}
        {[
          { y: 790, x1: 520, x2: 710 },
          { y: 835, x1: 470, x2: 760 },
          { y: 895, x1: 410, x2: 820 },
          { y: 975, x1: 330, x2: 900 },
          { y: 1085, x1: 220, x2: 1010 },
          { y: 1240, x1: 70, x2: 1160 },
          { y: 1460, x1: -100, x2: 1300 },
        ].map((seam, sIdx) => (
          <line
            key={`fl-cross-${sIdx}`}
            x1={seam.x1}
            y1={seam.y}
            x2={seam.x2}
            y2={seam.y}
            stroke="#231812"
            strokeWidth="3"
            opacity="0.8"
          />
        ))}

        {/* ============================================================ */}
        {/* 6. SPECTACULAR MIRROR-GLOSS SPECULAR LIGHT REFLECTIONS       */}
        {/* ============================================================ */}
        {/* Intense, glossy reflections of ceiling lamps on polished marble tiles */}
        {/* Distant light reflections */}
        <ellipse cx="616" cy="790" rx="18" ry="8" fill="#fffbe8" opacity="0.75" filter="url(#floorSpecularBlur)" />
        <ellipse cx="612" cy="850" rx="28" ry="14" fill="#fffcee" opacity="0.8" filter="url(#floorSpecularBlur)" />
        <ellipse cx="608" cy="940" rx="46" ry="22" fill="#fffdf2" opacity="0.75" filter="url(#floorSpecularBlur)" />

        {/* Prominent foreground light specular reflections (vertical elongated highlights) */}
        <g>
          {/* Broad soft ambient glow pool */}
          <ellipse cx="604" cy="1120" rx="75" ry="38" fill="#fffbe6" opacity="0.6" filter="url(#floorSpecularBlur)" />
          {/* Intense central specular core */}
          <ellipse cx="604" cy="1115" rx="35" ry="18" fill="#ffffff" opacity="0.85" filter="url(#floorSpecularBlur)" />
          <ellipse cx="604" cy="1115" rx="18" ry="8" fill="#ffffff" />
        </g>

        {/* Nearest massive ceiling light reflection (foreground center) */}
        <g>
          {/* Broad glowing reflection */}
          <ellipse cx="600" cy="1380" rx="110" ry="52" fill="#fff7d6" opacity="0.5" filter="url(#floorSpecularBlur)" />
          {/* Bright glossy streak */}
          <ellipse cx="600" cy="1370" rx="55" ry="24" fill="#fffdf2" opacity="0.8" filter="url(#floorSpecularBlur)" />
          <ellipse cx="600" cy="1365" rx="26" ry="12" fill="#ffffff" opacity="0.95" />
        </g>

        {/* Soft reflection of window daylight on the left floor tiles */}
        <ellipse cx="440" cy="980" rx="40" ry="80" fill="#fef3c7" opacity="0.22" filter="url(#floorSpecularBlur)" />
        <ellipse cx="360" cy="1220" rx="55" ry="110" fill="#fef3c7" opacity="0.18" filter="url(#floorSpecularBlur)" />

        {/* Subtle reflection of dark right door on right floor */}
        <polygon points="860,1100 1020,1220 960,1380 820,1220" fill="#14100c" opacity="0.25" />

        {/* Lens flare & sparkle on the wet-look glossy floor */}
        <g transform="translate(604, 1115)">
          <line x1="-25" y1="0" x2="25" y2="0" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
        </g>
        <g transform="translate(600, 1365)">
          <line x1="-35" y1="0" x2="35" y2="0" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
          <line x1="0" y1="-20" x2="0" y2="20" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
        </g>
      </svg>
    </div>
  );
};
