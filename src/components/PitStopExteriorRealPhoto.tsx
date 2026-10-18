import React from 'react';

export const PitStopExteriorRealPhoto: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1600 750"
        className="h-full w-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Kyrgyz Sky Gradient on a bright sunny afternoon */}
          <linearGradient id="kantSkyReal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#75a8cf" />
            <stop offset="45%" stopColor="#9cc2df" />
            <stop offset="85%" stopColor="#c5dded" />
            <stop offset="100%" stopColor="#dcebf4" />
          </linearGradient>

          {/* White Alucobond / Cassette Facade Gradient with slight panel shading */}
          <linearGradient id="panelAlucobond" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#f3f4f7" />
            <stop offset="100%" stopColor="#e2e5eb" />
          </linearGradient>

          {/* Pit Stop Sign Metallic Plaque */}
          <linearGradient id="signMetalReal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2126" />
            <stop offset="50%" stopColor="#131518" />
            <stop offset="100%" stopColor="#2c2f37" />
          </linearGradient>

          {/* Asphalt Parking Lot Ground with slight perspective */}
          <linearGradient id="asphaltGroundReal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#696b70" />
            <stop offset="40%" stopColor="#55585e" />
            <stop offset="100%" stopColor="#3d3e42" />
          </linearGradient>
        </defs>

        {/* 1. SKY */}
        <rect width="1600" height="260" fill="url(#kantSkyReal)" />

        {/* Real Power & Telephone Cables Crossing Sky in Kant */}
        <line x1="0" y1="5" x2="1600" y2="185" stroke="#48535e" strokeWidth="1.8" opacity="0.65" />
        <line x1="0" y1="28" x2="1600" y2="210" stroke="#48535e" strokeWidth="1.5" opacity="0.6" />
        <line x1="0" y1="65" x2="1600" y2="245" stroke="#48535e" strokeWidth="1.2" opacity="0.55" />

        {/* Roof vent chimneys behind fascia */}
        <rect x="490" y="70" width="22" height="15" fill="#555d66" stroke="#333" strokeWidth="1" />
        <rect x="1090" y="160" width="18" height="20" fill="#777e88" stroke="#444" strokeWidth="1" />
        <rect x="1255" y="165" width="22" height="25" fill="#777e88" stroke="#444" strokeWidth="1" />
        <line x1="1250" y1="165" x2="1285" y2="165" stroke="#444" strokeWidth="3" />

        {/* 2. TOP DARK GREY FASCIA (Angled Roofline of Main Building) */}
        {/* Dark anthracite composite panels along the top of building */}
        <polygon
          points="0,25 1460,185 1460,265 0,130"
          fill="#23262c"
          stroke="#16181d"
          strokeWidth="3"
        />
        {/* Fascia vertical tile divisions */}
        {[
          [100, 35, 100, 140],
          [220, 48, 220, 150],
          [350, 62, 350, 162],
          [480, 76, 480, 175],
          [620, 92, 620, 190],
          [760, 107, 760, 204],
          [900, 122, 900, 219],
          [1040, 137, 1040, 233],
          [1180, 153, 1180, 248],
          [1320, 169, 1320, 260],
        ].map(([x1, y1, x2, y2], idx) => (
          <line key={`fascia-grid-${idx}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3b3f49" strokeWidth="2" />
        ))}

        {/* Horizontal dividing joint inside top dark band */}
        <path d="M 0,80 L 1460,225" stroke="#181a1f" strokeWidth="2" />

        {/* 3. ICONIC SLANTED "PIT STOP" TRAPEZOIDAL ROOF SIGNBOARD */}
        <g transform="translate(500, 80)">
          {/* Main Angled Trapezoid Board */}
          <polygon
            points="10,135 38,0 365,5 340,140"
            fill="url(#signMetalReal)"
            stroke="#ffffff"
            strokeWidth="5"
          />
          {/* Inner silver border inlay */}
          <polygon
            points="22,126 46,10 353,15 330,131"
            fill="#181a1f"
            stroke="#d4d7dd"
            strokeWidth="1.8"
          />

          {/* Checkered Racing Flag Graphic on Left of Signboard */}
          <g transform="translate(68, 25)">
            {[0, 10, 20, 30].map((rY, rIdx) => (
              <g key={`flag-row-${rIdx}`}>
                {[0, 10, 20, 30, 40].map((rX, cIdx) => (
                  <rect
                    key={`flag-sq-${rIdx}-${cIdx}`}
                    x={rX}
                    y={rY}
                    width="10"
                    height="10"
                    fill={(rIdx + cIdx) % 2 === 0 ? '#ffffff' : '#0a0a0c'}
                    stroke="#555"
                    strokeWidth="0.4"
                  />
                ))}
              </g>
            ))}
          </g>

          {/* Bold Futuristic 3D Letters: "PIT" and "STOP" */}
          <text
            x="240"
            y="52"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Chakra Petch', 'Impact', sans-serif"
            fontWeight="900"
            fontSize="46"
            letterSpacing="4"
            stroke="#000000"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            PIT
          </text>
          <text
            x="215"
            y="108"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Chakra Petch', 'Impact', sans-serif"
            fontWeight="900"
            fontSize="46"
            letterSpacing="5"
            stroke="#000000"
            strokeWidth="3.5"
            paintOrder="stroke fill"
          >
            STOP
          </text>
        </g>

        {/* 4. ADJACENT "КАРАОКЕ БАР" ROOFLINE SIGN */}
        <g transform="translate(950, 178)">
          <rect
            x="0"
            y="0"
            width="320"
            height="56"
            rx="3"
            fill="#1c1e22"
            stroke="#555963"
            strokeWidth="2.5"
          />
          <text
            x="140"
            y="39"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Chakra Petch', 'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="3.5"
          >
            КАРАОКЕ БАР
          </text>
          {/* Round Golden Emblem at the end of sign */}
          <circle cx="282" cy="28" r="17" fill="#ffd166" stroke="#b58300" strokeWidth="2" />
          <circle cx="282" cy="28" r="13" fill="#ffb703" />
          {/* Emblem microphone/crown symbol */}
          <path d="M 276,32 L 282,21 L 288,32 Z" fill="#202226" />
        </g>

        {/* 5. SECOND FLOOR WHITE CASSETTE FACADE */}
        {/* Main upper facade body */}
        <polygon
          points="0,130 1460,265 1460,490 0,460"
          fill="url(#panelAlucobond)"
        />

        {/* Horizontal Seam Joints of White Panels */}
        {[185, 240, 295, 350, 405].map((hY, idx) => (
          <path
            key={`seam-h-${idx}`}
            d={`M 0,${hY} L 1460,${hY + 115}`}
            stroke="#b8bdc7"
            strokeWidth="1.8"
          />
        ))}

        {/* Vertical Joints of White Panels */}
        {[
          60, 120, 185, 250, 315, 380, 445, 510, 580, 650, 720, 790, 860, 930, 1000, 1070, 1140, 1210, 1280, 1350, 1420
        ].map((vX, idx) => (
          <line
            key={`seam-v-${idx}`}
            x1={vX}
            y1={130 + (vX / 1460) * 135}
            x2={vX}
            y2={460 + (vX / 1460) * 30}
            stroke="#b8bdc7"
            strokeWidth="1.8"
          />
        ))}

        {/* 6. WINDOWS ON SECOND FLOOR */}
        {/* Window 1 (Far Left) */}
        <g transform="translate(145, 230)">
          <rect x="0" y="0" width="105" height="125" fill="#223042" stroke="#2b2d31" strokeWidth="4" />
          <line x1="52" y1="0" x2="52" y2="125" stroke="#2b2d31" strokeWidth="3" />
          {/* Glass glare */}
          <polygon points="10,115 95,15 80,115" fill="#6996bf" opacity="0.35" />
        </g>

        {/* Window 2 */}
        <g transform="translate(360, 245)">
          <rect x="0" y="0" width="95" height="120" fill="#223042" stroke="#2b2d31" strokeWidth="4" />
          <line x1="47" y1="0" x2="47" y2="120" stroke="#2b2d31" strokeWidth="3" />
          <polygon points="10,110 85,15 70,110" fill="#6996bf" opacity="0.3" />
        </g>

        {/* Window 3 (Center Near AC Unit) */}
        <g transform="translate(585, 268)">
          <rect x="0" y="0" width="80" height="110" fill="#182333" stroke="#2b2d31" strokeWidth="3.5" />
          <line x1="40" y1="0" x2="40" y2="110" stroke="#2b2d31" strokeWidth="2.5" />
        </g>

        {/* White Outdoor Air Conditioner Compressor Unit */}
        <g transform="translate(695, 255)">
          <rect x="0" y="0" width="52" height="42" rx="3" fill="#e8eaed" stroke="#8c919a" strokeWidth="2" />
          <circle cx="26" cy="21" r="15" fill="#282a2e" />
          <circle cx="26" cy="21" r="10" fill="#5c6068" />
          {/* Fan grille lines */}
          <line x1="16" y1="21" x2="36" y2="21" stroke="#282a2e" strokeWidth="2" />
          <line x1="26" y1="11" x2="26" y2="31" stroke="#282a2e" strokeWidth="2" />
        </g>

        {/* Small vent square */}
        <rect x="765" y="285" width="28" height="28" fill="#1d222b" stroke="#333" strokeWidth="2" />

        {/* Small window between AC and Right Section */}
        <rect x="885" y="295" width="28" height="28" fill="#1d222b" stroke="#333" strokeWidth="2" />

        {/* Window 4 */}
        <g transform="translate(975, 310)">
          <rect x="0" y="0" width="62" height="95" fill="#202e40" stroke="#2b2d31" strokeWidth="3" />
          <line x1="31" y1="0" x2="31" y2="95" stroke="#2b2d31" strokeWidth="2" />
        </g>

        {/* Window 5 */}
        <g transform="translate(1175, 330)">
          <rect x="0" y="0" width="68" height="92" fill="#202e40" stroke="#2b2d31" strokeWidth="3" />
          <line x1="34" y1="0" x2="34" y2="92" stroke="#2b2d31" strokeWidth="2" />
        </g>

        {/* Window 6 (Far Right) */}
        <g transform="translate(1365, 350)">
          <rect x="0" y="0" width="62" height="85" fill="#202e40" stroke="#2b2d31" strokeWidth="3" />
          <line x1="31" y1="0" x2="31" y2="85" stroke="#2b2d31" strokeWidth="2" />
        </g>

        {/* Green tree canopy foliage visible on far right edge behind building */}
        <g transform="translate(1460, 310)">
          <circle cx="20" cy="30" r="35" fill="#3a5a40" />
          <circle cx="50" cy="20" r="30" fill="#4f772d" />
          <circle cx="70" cy="45" r="40" fill="#31572c" />
        </g>

        {/* 7. MIDDLE HORIZONTAL CANOPY BAND (Separating Floors) */}
        <polygon
          points="0,460 1460,490 1460,545 0,530"
          fill="#eceff4"
          stroke="#a4abb8"
          strokeWidth="2"
        />

        {/* 8. GROUND FLOOR LEVEL */}
        {/* Ground floor white facade walls */}
        <rect x="0" y="530" width="1600" height="150" fill="#f0f2f5" />

        {/* Left Dark Corner Fascia & Yellow Branding ("ИЯ") */}
        <g transform="translate(0, 460)">
          <polygon points="0,0 230,0 288,70 0,70" fill="#2e3838" stroke="#1d2424" strokeWidth="2" />
          <text
            x="30"
            y="52"
            fill="#f4a261"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="36"
            letterSpacing="2"
          >
            ИЯ
          </text>
        </g>

        {/* White Sectional Garage Door / Gate on Left */}
        <g transform="translate(165, 535)">
          <rect x="0" y="0" width="320" height="175" fill="#f8f9fb" stroke="#686e7a" strokeWidth="3" />
          {/* Vertical section ribs */}
          {[20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300].map((gX, idx) => (
            <line key={`garage-gate-${idx}`} x1={gX} y1="0" x2={gX} y2="175" stroke="#cfd3dc" strokeWidth="2" />
          ))}
          {/* Center latch and frame */}
          <line x1="160" y1="0" x2="160" y2="175" stroke="#777e8a" strokeWidth="3" />
          <rect x="154" y="85" width="12" height="18" fill="#333" rx="2" />
        </g>

        {/* Large Central Driveway Tunnel Archway (Passage into inner yard) */}
        <g transform="translate(575, 535)">
          <rect x="0" y="0" width="205" height="175" fill="#131518" stroke="#333" strokeWidth="2.5" />
          {/* Back courtyard wall visible through tunnel */}
          <rect x="65" y="30" width="85" height="145" fill="#758294" opacity="0.35" />
          <line x1="65" y1="30" x2="150" y2="30" stroke="#99a6b8" strokeWidth="2" opacity="0.5" />
        </g>

        {/* Center-Right: Karaoke Bar Entrance Door */}
        <g transform="translate(980, 565)">
          <rect x="0" y="0" width="75" height="145" fill="#16181d" stroke="#333" strokeWidth="3" />
          {/* Upper glass transom */}
          <rect x="8" y="10" width="59" height="55" fill="#3884ff" opacity="0.25" />
          {/* Lower glass panel */}
          <rect x="8" y="75" width="59" height="55" fill="#3884ff" opacity="0.25" />
          {/* Vertical handle */}
          <rect x="12" y="65" width="5" height="25" fill="#ffd166" />
        </g>

        {/* Wooden Bench Outside Venue (as in real photo) */}
        <g transform="translate(865, 650)">
          {/* Slat 1 and Slat 2 */}
          <rect x="0" y="0" width="105" height="9" rx="1.5" fill="#a46034" stroke="#683918" strokeWidth="1" />
          <rect x="0" y="13" width="105" height="9" rx="1.5" fill="#a46034" stroke="#683918" strokeWidth="1" />
          {/* Black steel legs */}
          <rect x="12" y="9" width="5" height="32" fill="#222" />
          <rect x="88" y="9" width="5" height="32" fill="#222" />
        </g>

        {/* Man walking across the parking lot in front of entrance */}
        <g transform="translate(995, 630)">
          {/* Head & cap */}
          <circle cx="16" cy="12" r="7" fill="#fcd5ce" />
          <rect x="11" y="5" width="11" height="6" rx="2" fill="#333" />
          {/* Beige / khaki short sleeve shirt */}
          <rect x="9" y="19" width="15" height="26" rx="3" fill="#d1c4b2" stroke="#b0a290" strokeWidth="1" />
          {/* Dark trousers & walking legs */}
          <line x1="12" y1="45" x2="10" y2="78" stroke="#1f2229" strokeWidth="4.5" />
          <line x1="20" y1="45" x2="24" y2="78" stroke="#1f2229" strokeWidth="4.5" />
          {/* Shoes */}
          <ellipse cx="9" cy="79" rx="5" ry="2.5" fill="#111" />
          <ellipse cx="25" cy="79" rx="5" ry="2.5" fill="#111" />
        </g>

        {/* Small waste bin near entrance */}
        <rect x="1080" y="675" width="18" height="28" rx="2" fill="#292c33" stroke="#444" strokeWidth="1" />

        {/* Right Service Bay: "Divinol", "Масла и фильтры", "Rheinol" auto service */}
        <g transform="translate(1120, 515)">
          {/* Yellow service bay banner */}
          <rect x="0" y="0" width="460" height="36" fill="#f9c74f" stroke="#c9971a" strokeWidth="1.5" />
          <text x="35" y="24" fill="#111" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="18">
            Divinol
          </text>
          <text x="135" y="22" fill="#222" fontFamily="sans-serif" fontWeight="700" fontSize="13">
            Масла и фильтры
          </text>
          <text x="270" y="24" fill="#a00" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="18">
            Rheinol
          </text>

          {/* Dark garage bays below banner */}
          <rect x="15" y="40" width="370" height="150" fill="#14171d" stroke="#333" strokeWidth="2.5" />
          {/* Interior work bay details */}
          <rect x="35" y="55" width="70" height="60" fill="#222833" />
          <rect x="180" y="65" width="110" height="70" fill="#1b212b" />

          {/* People standing near right service bay */}
          <g transform="translate(145, 95)">
            {/* Person 1: Red shirt */}
            <circle cx="10" cy="8" r="5" fill="#fcd5ce" />
            <rect x="5" y="13" width="10" height="18" fill="#d90429" />
            <line x1="8" y1="31" x2="8" y2="52" stroke="#111" strokeWidth="3.5" />
            <line x1="12" y1="31" x2="13" y2="52" stroke="#111" strokeWidth="3.5" />

            {/* Person 2: White shirt */}
            <circle cx="30" cy="8" r="5" fill="#fcd5ce" />
            <rect x="25" y="13" width="10" height="18" fill="#f8f9fa" stroke="#ccc" strokeWidth="1" />
            <line x1="28" y1="31" x2="27" y2="52" stroke="#1c2541" strokeWidth="3.5" />
            <line x1="32" y1="31" x2="34" y2="52" stroke="#1c2541" strokeWidth="3.5" />
          </g>
        </g>

        {/* 9. FOREGROUND PARKING LOT WITH VEHICLES */}
        <rect x="0" y="685" width="1600" height="65" fill="url(#asphaltGroundReal)" />

        {/* REAL VEHICLE 1: White Toyota Crown / Camry Sedan in Center Foreground */}
        <g transform="translate(485, 575)">
          {/* Ground shadow beneath car */}
          <ellipse cx="145" cy="155" rx="145" ry="18" fill="#111215" opacity="0.85" />

          {/* Rear Windshield & Roof */}
          <polygon points="45,35 245,35 272,85 18,85" fill="#f4f5f8" stroke="#b0b5c0" strokeWidth="2" />
          <polygon points="50,40 240,40 262,80 28,80" fill="#1b2330" stroke="#111" strokeWidth="1.5" />
          {/* Rear window reflection */}
          <polygon points="65,42 160,42 140,78 45,78" fill="#4d7298" opacity="0.35" />

          {/* Car Trunk & Rear Body */}
          <rect x="10" y="80" width="270" height="65" rx="8" fill="#ffffff" stroke="#cbd0d8" strokeWidth="2" />

          {/* Distinctive Red Rear Taillights */}
          <rect x="16" y="88" width="58" height="24" rx="4" fill="#e63946" stroke="#900" strokeWidth="1.5" />
          <rect x="216" y="88" width="58" height="24" rx="4" fill="#e63946" stroke="#900" strokeWidth="1.5" />
          {/* Clear reverse indicator inserts */}
          <rect x="44" y="92" width="22" height="15" fill="#f8f9fa" stroke="#ccc" strokeWidth="1" />
          <rect x="224" y="92" width="22" height="15" fill="#f8f9fa" stroke="#ccc" strokeWidth="1" />

          {/* Center Toyota Chrome Emblem */}
          <ellipse cx="145" cy="98" rx="11" ry="8" fill="none" stroke="#777" strokeWidth="2" />
          <ellipse cx="145" cy="98" rx="7" ry="5" fill="none" stroke="#777" strokeWidth="1.5" />

          {/* Kyrgyz License Plate */}
          <rect x="114" y="112" width="62" height="22" rx="2" fill="#ffffff" stroke="#222" strokeWidth="1.5" />
          <text x="145" y="127" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
            08 KG
          </text>

          {/* Rear bumper molding & exhaust */}
          <line x1="20" y1="135" x2="270" y2="135" stroke="#d5dae2" strokeWidth="2" />

          {/* Rear Left & Right Wheels / Tires */}
          <rect x="26" y="132" width="32" height="22" rx="4" fill="#141517" />
          <rect x="232" y="132" width="32" height="22" rx="4" fill="#141517" />
        </g>

        {/* REAL VEHICLE 2: Silver Hatchback with Open Hood (Frontal/Angle) on Right */}
        <g transform="translate(1390, 565)">
          <ellipse cx="90" cy="148" rx="95" ry="16" fill="#111215" opacity="0.8" />
          {/* Open engine hood angle */}
          <polygon points="15,48 85,15 90,65 10,65" fill="#d0d5dd" stroke="#888" strokeWidth="1.5" />
          {/* Body cabin */}
          <polygon points="10,55 170,55 185,100 0,100" fill="#c2c7cf" stroke="#7d838c" strokeWidth="1.5" />
          <polygon points="15,60 165,60 178,96 10,96" fill="#1e242c" />
          {/* Lower body */}
          <rect x="0" y="100" width="180" height="40" rx="5" fill="#d2d7df" stroke="#8d949e" strokeWidth="1.5" />
          {/* Front headlights */}
          <polygon points="160,104 178,104 175,115 158,115" fill="#fffae0" stroke="#999" strokeWidth="1" />
          {/* Wheels */}
          <circle cx="36" cy="140" r="16" fill="#15171a" />
          <circle cx="36" cy="140" r="7" fill="#ccc" />
          <circle cx="150" cy="140" r="16" fill="#15171a" />
          <circle cx="150" cy="140" r="7" fill="#ccc" />
        </g>

        {/* Authentic Digital Timestamp Watermark in lower right (as seen on the real photo: "2022/5") */}
        <text
          x="1580"
          y="738"
          textAnchor="end"
          fill="#ffffff"
          opacity="0.45"
          fontFamily="monospace"
          fontSize="12"
          letterSpacing="1"
        >
          2022/5
        </text>
      </svg>
    </div>
  );
};
