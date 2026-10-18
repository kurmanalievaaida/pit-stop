import React from 'react';

export const PitStopBarRealPhoto: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 1600"
        className="h-full w-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Background Wall Gradient */}
          <linearGradient id="barWallBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#141416" />
            <stop offset="40%" stopColor="#1c1d22" />
            <stop offset="100%" stopColor="#0d0e11" />
          </linearGradient>

          {/* Glowing Red Tufted Leather */}
          <linearGradient id="redTuftedBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#990f1f" />
            <stop offset="35%" stopColor="#e6192e" />
            <stop offset="70%" stopColor="#800a16" />
            <stop offset="100%" stopColor="#4a040b" />
          </linearGradient>

          {/* Golden Warm Light Strip */}
          <linearGradient id="goldLightGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffb703" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffe699" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffb703" stopOpacity="0.4" />
          </linearGradient>

          {/* Black Marble Counter Texture */}
          <linearGradient id="blackMarble" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15161a" />
            <stop offset="50%" stopColor="#0d0e11" />
            <stop offset="100%" stopColor="#1a1b20" />
          </linearGradient>

          {/* Liquor Shelf Backlight */}
          <linearGradient id="shelfBacklight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffca3a" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ff9f1c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d48c00" stopOpacity="0.4" />
          </linearGradient>

          {/* Floor Marble Gradient */}
          <linearGradient id="barFloor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#302a24" />
            <stop offset="30%" stopColor="#4a3e35" />
            <stop offset="70%" stopColor="#25201b" />
            <stop offset="100%" stopColor="#12100d" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="neonGlowRed" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="neonGlowGold" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softGlowSmall" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Wall Background */}
        <rect width="1200" height="1600" fill="url(#barWallBg)" />

        {/* Ceiling and Architectural Border with warm neon strips */}
        <rect x="0" y="0" width="1200" height="180" fill="#08080a" />
        <line x1="30" y1="30" x2="1170" y2="30" stroke="#ffb703" strokeWidth="6" opacity="0.9" filter="url(#neonGlowGold)" />
        <line x1="30" y1="30" x2="30" y2="180" stroke="#ffb703" strokeWidth="6" opacity="0.9" filter="url(#neonGlowGold)" />

        {/* Left vertical warm acoustic wooden frame */}
        <rect x="0" y="30" width="150" height="1300" fill="#1b1712" />
        {[10, 30, 50, 70, 90, 110, 130].map((x, idx) => (
          <rect key={`v-slat-${idx}`} x={x} y="30" width="10" height="1300" fill="#d49b42" opacity="0.8" />
        ))}
        <line x1="140" y1="30" x2="140" y2="1330" stroke="#ffb703" strokeWidth="5" filter="url(#neonGlowGold)" />

        {/* 2. Hanging Ceiling Lights (Modern Firework / Starburst + 3 Black Pendant Lamps) */}
        {/* Firework Starburst Chandelier cluster */}
        <g transform="translate(600, 130)">
          {[-350, -180, 0, 180, 350].map((xPos, idx) => (
            <g key={`starburst-${idx}`} transform={`translate(${xPos}, 0)`}>
              <line x1="0" y1="-80" x2="0" y2="40" stroke="#ffb703" strokeWidth="2" />
              <circle cx="0" cy="40" r="7" fill="#ffe066" filter="url(#neonGlowGold)" />
              {/* Starburst rays */}
              {Array.from({ length: 18 }).map((_, rIdx) => {
                const angle = (rIdx * 20 * Math.PI) / 180;
                const r = 35 + (rIdx % 3) * 15;
                const x2 = Math.cos(angle) * r;
                const y2 = 40 + Math.sin(angle) * r;
                return (
                  <line
                    key={rIdx}
                    x1="0"
                    y1="40"
                    x2={x2}
                    y2={y2}
                    stroke="#ffe066"
                    strokeWidth="1.5"
                    opacity="0.9"
                  />
                );
              })}
            </g>
          ))}
        </g>

        {/* 3 Matte Black Pendant Lights with Gold Interior Cone */}
        {[-220, 0, 220].map((xOff, pIdx) => (
          <g key={`pendant-${pIdx}`} transform={`translate(${600 + xOff}, 360)`}>
            <line x1="0" y1="-230" x2="0" y2="0" stroke="#000" strokeWidth="3" />
            {/* Lamp cone body */}
            <path d="M -70,80 Q 0,0 70,80 Z" fill="#121214" stroke="#222" strokeWidth="2" />
            <ellipse cx="0" cy="80" rx="70" ry="24" fill="#ffb703" filter="url(#neonGlowGold)" opacity="0.9" />
            <ellipse cx="0" cy="80" rx="60" ry="18" fill="#fff3b0" opacity="0.95" />
            {/* Cone light beam shining down onto bar */}
            <polygon
              points="0,80 -250,550 250,550"
              fill="url(#goldLightGlow)"
              opacity="0.18"
              filter="url(#neonGlowGold)"
            />
          </g>
        ))}

        {/* 3. Illuminated Back-Bar Liquor Showcase Display (Wood & Glass with warm backlight) */}
        <g transform="translate(460, 310)">
          {/* Outer Showcase Box */}
          <rect
            x="-190"
            y="0"
            width="580"
            height="580"
            rx="12"
            fill="#121216"
            stroke="#ffb703"
            strokeWidth="3"
            filter="url(#softGlowSmall)"
          />

          {/* Warm Golden Backlit Glass Panel */}
          <rect x="-180" y="10" width="560" height="560" rx="8" fill="url(#shelfBacklight)" opacity="0.25" />

          {/* Green Ivy Plants draped on top shelf corners */}
          <ellipse cx="-160" cy="15" rx="35" ry="20" fill="#2d6a4f" />
          <ellipse cx="350" cy="15" rx="35" ry="20" fill="#2d6a4f" />
          <path d="M -170,25 Q -180,80 -165,110" stroke="#40916c" strokeWidth="6" fill="none" />
          <path d="M 340,25 Q 360,75 345,115" stroke="#40916c" strokeWidth="6" fill="none" />

          {/* 4 Shelves */}
          {[130, 260, 390, 520].map((shelfY, sIdx) => (
            <g key={`shelf-${sIdx}`}>
              {/* Illuminated shelf line */}
              <rect x="-180" y={shelfY} width="560" height="12" rx="3" fill="#ffe066" filter="url(#softGlowSmall)" />
              <rect x="-180" y={shelfY + 4} width="560" height="4" fill="#ffffff" />

              {/* Rows of bottles with liquor colors */}
              {[-150, -105, -60, -15, 30, 75, 120, 165, 210, 255, 300].map((bX, bIdx) => {
                const bottleH = 65 + ((bIdx * 7) % 25);
                const colors = ['#e63946', '#f4a261', '#2a9d8f', '#e76f51', '#e9c46a', '#9d0208'];
                const color = colors[(bIdx + sIdx) % colors.length];
                return (
                  <g key={`bot-${sIdx}-${bIdx}`} transform={`translate(${bX}, ${shelfY - bottleH})`}>
                    {/* Bottle Neck */}
                    <rect x="11" y="0" width="8" height="22" rx="2" fill="#333" />
                    <rect x="9" y="0" width="12" height="6" fill="#d4af37" />
                    {/* Bottle Body */}
                    <rect x="3" y="20" width="24" height={bottleH - 20} rx="5" fill={color} opacity="0.85" />
                    {/* Label */}
                    <rect x="5" y="32" width="20" height="22" rx="2" fill="#fff" opacity="0.9" />
                    {/* Glass shine */}
                    <line x1="7" y1="23" x2="7" y2={bottleH - 5} stroke="#fff" strokeWidth="2" opacity="0.6" />
                  </g>
                );
              })}
            </g>
          ))}
        </g>

        {/* Left Liquor Fridge with glowing glass door */}
        <g transform="translate(180, 420)">
          <rect x="0" y="0" width="85" height="380" rx="8" fill="#0b0c0e" stroke="#333" strokeWidth="3" />
          <rect x="8" y="8" width="69" height="364" rx="4" fill="#3a86ff" opacity="0.15" />
          <line x1="12" y1="10" x2="12" y2="360" stroke="#60a5fa" strokeWidth="3" opacity="0.8" />
        </g>

        {/* 4. The Iconic Pit-Stop Bar Counter */}
        {/* Counter Top: Glossy Black Marble with specular reflection */}
        <g transform="translate(0, 890)">
          <rect x="40" y="0" width="1120" height="60" rx="6" fill="url(#blackMarble)" stroke="#ffb703" strokeWidth="2" />
          {/* Top highlight reflection edge */}
          <line x1="50" y1="6" x2="1150" y2="6" stroke="#ffe066" strokeWidth="3" opacity="0.8" />

          {/* Bar tools: Cashier POS terminal, Vase of white orchids, and draft beer taps */}
          {/* Cashier screen on left */}
          <g transform="translate(100, -75)">
            <rect x="0" y="0" width="80" height="60" rx="5" fill="#1e1e24" stroke="#444" strokeWidth="2" />
            <rect x="5" y="5" width="70" height="50" rx="2" fill="#000" />
            <rect x="35" y="60" width="10" height="20" fill="#333" />
            <rect x="25" y="78" width="30" height="6" fill="#222" />
          </g>

          {/* Chrome Draft Beer Tower (with tap handles) */}
          <g transform="translate(230, -110)">
            {/* Chrome central column */}
            <rect x="30" y="30" width="30" height="85" rx="6" fill="#c0c0c0" stroke="#777" strokeWidth="2" />
            {/* Top horizontal distribution bar */}
            <rect x="0" y="20" width="90" height="22" rx="5" fill="#e0e0e0" stroke="#999" strokeWidth="2" />
            {/* 4 Taps */}
            {[10, 30, 50, 70].map((tX, idx) => (
              <g key={`tap-${idx}`} transform={`translate(${tX}, 10)`}>
                <circle cx="5" cy="5" r="8" fill="#ffd166" stroke="#b58300" strokeWidth="1.5" />
                <rect x="3" y="-12" width="4" height="15" rx="2" fill="#000" />
              </g>
            ))}
          </g>

          {/* Vase with White Orchids */}
          <g transform="translate(345, -75)">
            <ellipse cx="25" cy="65" rx="18" ry="16" fill="#ffd166" stroke="#d4af37" strokeWidth="1.5" />
            {/* Orchid stems & petals */}
            <path d="M 25,50 Q 20,20 15,0" stroke="#2d6a4f" strokeWidth="3" fill="none" />
            <path d="M 25,50 Q 35,25 35,-5" stroke="#2d6a4f" strokeWidth="3" fill="none" />
            {/* White flowers */}
            <circle cx="15" cy="0" r="9" fill="#ffffff" filter="url(#softGlowSmall)" />
            <circle cx="35" cy="-5" r="9" fill="#ffffff" filter="url(#softGlowSmall)" />
            <circle cx="25" cy="15" r="7" fill="#ffffff" />
            <circle cx="25" cy="15" r="3" fill="#ffb703" />
          </g>
        </g>

        {/* Counter Body: Black Marble Frame + Glowing Red Velvet Quilted Left Panel + Center Logo */}
        <g transform="translate(40, 950)">
          {/* Main Counter Base (Height: 520px, Width: 1120px) */}
          <rect x="0" y="0" width="1120" height="520" fill="url(#blackMarble)" />

          {/* Gold marble veins across the counter */}
          <path d="M 50,20 Q 200,90 280,240 Q 320,380 400,510" stroke="#ffb703" strokeWidth="2" opacity="0.4" fill="none" />
          <path d="M 780,10 Q 860,140 940,300 Q 1020,420 1100,500" stroke="#ffb703" strokeWidth="2.5" opacity="0.35" fill="none" />

          {/* LEFT PANEL: Glowing Backlit Red Velvet Tufted Padded Insert */}
          <g transform="translate(40, 30)">
            {/* Outer Red Backlight Glow */}
            <rect
              x="-12"
              y="-12"
              width="344"
              height="464"
              rx="16"
              fill="#e6192e"
              opacity="0.75"
              filter="url(#neonGlowRed)"
            />

            {/* Brass border bezel */}
            <rect x="0" y="0" width="320" height="440" rx="8" fill="#1a1114" stroke="#ffb703" strokeWidth="3" />

            {/* Rich Red Velvet Background */}
            <rect x="8" y="8" width="304" height="424" rx="4" fill="url(#redTuftedBg)" />

            {/* Diamond Chesterfield Tufting Lines */}
            {[50, 110, 170, 230, 290, 350].map((yVal, rIdx) => (
              <g key={`quilt-r-${rIdx}`}>
                {[50, 110, 170, 230, 270].map((xVal, cIdx) => (
                  <g key={`q-${rIdx}-${cIdx}`}>
                    {/* Diamond crossing lines */}
                    <line x1={xVal - 30} y1={yVal} x2={xVal + 30} y2={yVal} stroke="#54050d" strokeWidth="2" opacity="0.6" />
                    <line x1={xVal} y1={yVal - 30} x2={xVal} y2={yVal + 30} stroke="#54050d" strokeWidth="2" opacity="0.6" />
                    {/* Deep Tufted Buttons */}
                    <circle cx={xVal} cy={yVal} r="6" fill="#360207" />
                    <circle cx={xVal - 1} cy={yVal - 1} r="2" fill="#ff4d5e" opacity="0.8" />
                  </g>
                ))}
              </g>
            ))}
          </g>

          {/* CENTER EMBLEM: The Celebrated Circular Glowing "ПИТ-СТОП Караоке Бар" Logo */}
          <g transform="translate(740, 240)">
            {/* Outer Intense Amber Neon Halo */}
            <circle cx="0" cy="0" r="190" fill="#ff9f1c" opacity="0.45" filter="url(#neonGlowGold)" />
            {/* Outer Golden Ring */}
            <circle cx="0" cy="0" r="180" fill="none" stroke="#ffb703" strokeWidth="7" filter="url(#neonGlowGold)" />
            {/* Inner Black Circular Plaque */}
            <circle cx="0" cy="0" r="172" fill="#0a0a0c" stroke="#ffe066" strokeWidth="2" />

            {/* Center Cocktail Glass & Microphone Emblem Icons */}
            <g transform="translate(0, -65)">
              {/* Cocktail Martini Glass on left */}
              <g transform="translate(-32, 0)">
                <polygon points="-22,-18 22,-18 0,14" fill="none" stroke="#ffe066" strokeWidth="3.5" filter="url(#softGlowSmall)" />
                <line x1="0" y1="14" x2="0" y2="35" stroke="#ffe066" strokeWidth="3.5" />
                <line x1="-16" y1="35" x2="16" y2="35" stroke="#ffe066" strokeWidth="3.5" />
                {/* Olive in glass */}
                <circle cx="0" cy="-6" r="4.5" fill="#d4af37" />
              </g>

              {/* Classic Vocal Microphone on right */}
              <g transform="translate(32, 0)">
                <rect x="-12" y="-20" width="24" height="34" rx="10" fill="none" stroke="#ffe066" strokeWidth="3.5" filter="url(#softGlowSmall)" />
                <line x1="-12" y1="-8" x2="12" y2="-8" stroke="#ffe066" strokeWidth="2" />
                <line x1="-12" y1="2" x2="12" y2="2" stroke="#ffe066" strokeWidth="2" />
                <path d="M -16,4 Q 0,26 16,4" fill="none" stroke="#ffe066" strokeWidth="3" />
                <line x1="0" y1="18" x2="0" y2="35" stroke="#ffe066" strokeWidth="3.5" />
                <line x1="-12" y1="35" x2="12" y2="35" stroke="#ffe066" strokeWidth="3.5" />
              </g>
            </g>

            {/* Golden Horizontal Divider Lines */}
            <line x1="-130" y1="-10" x2="-20" y2="-10" stroke="#d4af37" strokeWidth="2" />
            <line x1="20" y1="-10" x2="130" y2="-10" stroke="#d4af37" strokeWidth="2" />
            <polygon points="0,-10 -6,-14 0,-18 6,-14" fill="#ffb703" />

            {/* Text: "ПИТ-СТОП" in bold serif capitals */}
            <text
              x="0"
              y="32"
              textAnchor="middle"
              fill="#ffffff"
              fontFamily="'Chakra Petch', 'Cinzel', serif, sans-serif"
              fontWeight="900"
              fontSize="44"
              letterSpacing="4"
              filter="url(#softGlowSmall)"
            >
              ПИТ-СТОП
            </text>

            {/* Text: "Караоке Бар" in elegant italic script */}
            <text
              x="0"
              y="74"
              textAnchor="middle"
              fill="#ffe066"
              fontFamily="system-ui, sans-serif"
              fontWeight="600"
              fontSize="24"
              letterSpacing="2"
            >
              Караоке Бар
            </text>

            {/* Decorative Gold Filigree Flourishes at bottom */}
            <path
              d="M -70,110 Q -40,125 0,110 Q 40,125 70,110"
              fill="none"
              stroke="#d4af37"
              strokeWidth="2.5"
            />
            <circle cx="-70" cy="110" r="3" fill="#ffb703" />
            <circle cx="70" cy="110" r="3" fill="#ffb703" />
            <circle cx="0" cy="110" r="4" fill="#ffe066" />
          </g>

          {/* Golden bottom counter LED light strip */}
          <line x1="20" y1="510" x2="1100" y2="510" stroke="#ffb703" strokeWidth="8" filter="url(#neonGlowGold)" opacity="0.9" />
          <line x1="20" y1="510" x2="1100" y2="510" stroke="#ffffff" strokeWidth="2" opacity="0.95" />
        </g>

        {/* 5. Polished Glossy Brown & Black Marble Floor with Specular Reflections */}
        <g transform="translate(0, 1470)">
          <rect width="1200" height="130" fill="url(#barFloor)" />
          {/* Tile perspective joints */}
          <line x1="0" y1="50" x2="1200" y2="50" stroke="#5a4e44" strokeWidth="2" opacity="0.5" />
          <line x1="250" y1="0" x2="180" y2="130" stroke="#5a4e44" strokeWidth="2" opacity="0.4" />
          <line x1="600" y1="0" x2="580" y2="130" stroke="#5a4e44" strokeWidth="2" opacity="0.4" />
          <line x1="950" y1="0" x2="980" y2="130" stroke="#5a4e44" strokeWidth="2" opacity="0.4" />

          {/* Reflections of Counter Lights onto Marble Floor */}
          {/* Red panel reflection */}
          <rect x="70" y="0" width="340" height="90" fill="#e6192e" opacity="0.35" filter="url(#neonGlowRed)" />
          {/* Golden logo reflection */}
          <ellipse cx="780" cy="30" rx="140" ry="25" fill="#ffb703" opacity="0.35" filter="url(#neonGlowGold)" />
        </g>
      </svg>
    </div>
  );
};
