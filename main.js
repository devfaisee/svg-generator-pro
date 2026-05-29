// -------------------------------------------------------------
// Smart SVG Logo Generator Pro - Core Compiler & Controller
// -------------------------------------------------------------

// Embedded Vector Icon Paths Database (all built on a 0 to 100 viewBox system)
const ICON_DATABASE = {
  shield: `
    <g class="logo-icon-paths">
      <!-- Outer Shield Contour -->
      <path d="M 50,5 L 88,18 C 88,52 72,78 50,90 C 28,78 12,52 12,18 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
      <!-- Inner Detail Accent Line -->
      <path d="M 50,15 L 80,26 C 80,50 68,70 50,80 C 32,70 20,50 20,26 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.6" stroke-linejoin="round" />
      <!-- Center Star of Trust -->
      <path d="M 50,33 L 53,42 L 62,42 L 55,47 L 58,56 L 50,51 L 42,56 L 45,47 L 38,42 L 47,42 Z" fill="currentColor" />
    </g>
  `,
  bolt: `
    <g class="logo-icon-paths">
      <!-- Double lightning core overlay -->
      <path d="M 62,5 L 25,52 H 48 L 38,95 L 75,48 H 52 Z" fill="url(#grad-accent)" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
      <path d="M 58,12 L 29,50 H 50 L 42,85 L 71,47 H 50 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-opacity="0.8" />
    </g>
  `,
  chip: `
    <g class="logo-icon-paths">
      <!-- Main Silicon Body -->
      <rect x="25" y="25" width="50" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="4" />
      <!-- Silicon Core Detail -->
      <rect x="37" y="37" width="26" height="26" rx="4" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.7" />
      <!-- Circuit Conductors / Pins -->
      <path d="M 35,25 V 10 M 50,25 V 10 M 65,25 V 10 
               M 35,75 V 90 M 50,75 V 90 M 65,75 V 90
               M 25,35 H 10 M 25,50 H 10 M 25,65 H 10
               M 75,35 H 90 M 75,50 H 90 M 75,65 H 90" 
            stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <!-- Central AI Core Light -->
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </g>
  `,
  star: `
    <g class="logo-icon-paths">
      <!-- Elegant 5-Point Star -->
      <path d="M 50,5 L 63,33 L 94,35 L 70,55 L 77,85 L 50,69 L 23,85 L 30,55 L 6,35 L 37,33 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
      <!-- Inner Concentric Star Accent -->
      <path d="M 50,18 L 59,38 L 81,39 L 64,53 L 69,74 L 50,62 L 31,74 L 36,53 L 19,39 L 41,38 Z" fill="currentColor" fill-opacity="0.85" />
    </g>
  `,
  crown: `
    <g class="logo-icon-paths">
      <!-- Noble Crown Contour -->
      <path d="M 12,75 L 22,30 L 38,48 L 50,20 L 62,48 L 78,30 L 88,75 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
      <!-- Crown Base Rim -->
      <path d="M 12,75 H 88 V 83 H 12 Z" fill="currentColor" />
      <!-- Crown Pearls / Spheres -->
      <circle cx="22" cy="26" r="3.5" fill="currentColor" />
      <circle cx="50" cy="16" r="3.5" fill="currentColor" />
      <circle cx="78" cy="26" r="3.5" fill="currentColor" />
      <!-- Base Ornament Details -->
      <circle cx="30" cy="79" r="2.5" fill="none" stroke="currentColor" stroke-width="1" />
      <circle cx="50" cy="79" r="2.5" fill="none" stroke="currentColor" stroke-width="1" />
      <circle cx="70" cy="79" r="2.5" fill="none" stroke="currentColor" stroke-width="1" />
    </g>
  `,
  pen: `
    <g class="logo-icon-paths">
      <!-- Nib Body -->
      <path d="M 50,10 C 44,28 38,44 38,58 C 38,68 43,74 50,74 C 57,74 62,68 62,58 C 62,44 56,28 50,10 Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round" />
      <!-- Nib Split Line & Ink Chamber -->
      <path d="M 50,74 V 38" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <circle cx="50" cy="38" r="3" fill="currentColor" />
      <!-- Pen Holder Joint -->
      <path d="M 44,74 L 40,90 H 60 L 56,74 Z" fill="currentColor" />
    </g>
  `,
  none: ``
};

// UI State Store
const state = {
  brandName: "VERYNT",
  slogan: "CREATIVE STUDIO",
  initials: "V",
  preset: "badge", // badge, hexagon, shield, monogram
  icon: "bolt",
  fontFamily: "Orbitron",
  colorPrimary: "#6366f1",
  colorSecondary: "#a855f7",
  colorAccent: "#38bdf8",
  iconScale: 1.0,
  borderWidth: 4,
  textSpacing: 4,
  emblemRadius: 120,
  previewBg: "grid" // grid, dark, light
};

// Google Fonts list to prefetch on the fly
const LOADED_FONTS = new Set(["Outfit"]);

// --- Dynamic Font Loader Utility ---
function loadGoogleFont(fontName) {
  if (LOADED_FONTS.has(fontName)) return;
  
  const linkId = `gfont-${fontName.toLowerCase().replace(/\s+/g, '-')}`;
  if (document.getElementById(linkId)) return;

  const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;700;900&display=swap`;
  
  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = fontUrl;
  document.head.appendChild(link);
  
  LOADED_FONTS.add(fontName);
}

// --- SVG Compiler Engine ---
function compileSvgString() {
  const {
    brandName,
    slogan,
    initials,
    preset,
    icon,
    fontFamily,
    colorPrimary,
    colorSecondary,
    colorAccent,
    iconScale,
    borderWidth,
    textSpacing,
    emblemRadius
  } = state;

  // Selected icon vector path markup
  const iconMarkup = ICON_DATABASE[icon] || "";

  // Core dimensions of our viewport
  const width = 400;
  const height = 400;
  const cx = 200;
  const cy = 200;

  // Generate SVG dynamic contents based on current layout preset
  let layoutMarkup = "";

  // Setup styles and definitions
  const defsBlock = `
    <defs>
      <!-- Premium CSS Import Embedded directly in the SVG vector for complete independence -->
      <style>
        @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@400;700;900&amp;display=swap');
        .logo-font {
          font-family: '${fontFamily}', 'Outfit', sans-serif;
        }
        .text-brand {
          font-weight: 900;
          letter-spacing: ${textSpacing}px;
          text-transform: uppercase;
        }
        .text-slogan {
          font-weight: 500;
          letter-spacing: ${textSpacing * 1.5}px;
          text-transform: uppercase;
        }
        .text-monogram {
          font-weight: 700;
        }
        .logo-icon-paths {
          transform-origin: center;
        }
      </style>
      
      <!-- Linear Gradients for stunning modern coloring effects -->
      <linearGradient id="grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colorPrimary}" />
        <stop offset="100%" stop-color="${colorSecondary}" />
      </linearGradient>
      
      <linearGradient id="grad-accent" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${colorSecondary}" />
        <stop offset="100%" stop-color="${colorAccent}" />
      </linearGradient>
      
      <linearGradient id="grad-border" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colorPrimary}" />
        <stop offset="50%" stop-color="${colorAccent}" />
        <stop offset="100%" stop-color="${colorSecondary}" />
      </linearGradient>

      <!-- Circular Paths for Curving Text (Emblem Badge Layout) -->
      <!-- Top Arc: runs clockwise left-to-right -->
      <path id="badge-top-path" d="M ${cx - emblemRadius},${cy} A ${emblemRadius},${emblemRadius} 0 0,1 ${cx + emblemRadius},${cy}" fill="none" />
      <!-- Bottom Arc: runs clockwise right-to-left for upright bottom lettering -->
      <path id="badge-bottom-path" d="M ${cx + emblemRadius},${cy} A ${emblemRadius},${emblemRadius} 0 0,1 ${cx - emblemRadius},${cy}" fill="none" />
    </defs>
  `;

  // Dynamic Compiler based on Selected Preset
  switch (preset) {
    case "badge": {
      // Circle Badge Layout
      const outerR = emblemRadius + 35;
      const innerR = emblemRadius + 22;
      const centerScale = iconScale * 0.9;
      
      layoutMarkup = `
        <!-- Outer Glowing Ring -->
        <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="url(#grad-border)" stroke-width="${borderWidth}" />
        <!-- Inner Accent Ring -->
        <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="none" stroke="${colorAccent}" stroke-width="1.5" stroke-dasharray="6,4" stroke-opacity="0.6" />
        
        <!-- Curved Brand Name -->
        <text class="logo-font text-brand" font-size="19" fill="#ffffff" dy="-10">
          <textPath href="#badge-top-path" startOffset="50%" text-anchor="middle">${brandName}</textPath>
        </text>

        <!-- Curved Tagline Slogan -->
        <text class="logo-font text-slogan" font-size="10" fill="${colorAccent}" dy="25">
          <textPath href="#badge-bottom-path" startOffset="50%" text-anchor="middle">${slogan}</textPath>
        </text>
        
        <!-- Center Icon Placement -->
        ${icon !== "none" ? `
          <g transform="translate(${cx - 50 * centerScale}, ${cy - 52 * centerScale}) scale(${centerScale})">
            <g color="url(#grad-primary)">
              ${iconMarkup}
            </g>
          </g>
        ` : `
          <!-- If no icon selected, put the monogram initials elegantly in the center -->
          <text x="${cx}" y="${cy + 15}" class="logo-font text-monogram" font-size="52" fill="url(#grad-accent)" text-anchor="middle">${initials}</text>
        `}
      `;
      break;
    }
    
    case "hexagon": {
      // Tech Hexagon Layout
      const hexRadius = 135;
      const innerHexRadius = 120;
      
      // Calculate coordinates of outer hexagon
      const points = [];
      const innerPoints = [];
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const ox = cx + hexRadius * Math.cos(angle);
        const oy = cy + hexRadius * Math.sin(angle);
        points.push(`${ox},${oy}`);
        
        const ix = cx + innerHexRadius * Math.cos(angle);
        const iy = cy + innerHexRadius * Math.sin(angle);
        innerPoints.push(`${ix},${iy}`);
      }

      layoutMarkup = `
        <!-- Outer Tech Hexagon Boundary -->
        <polygon points="${points.join(" ")}" fill="none" stroke="url(#grad-border)" stroke-width="${borderWidth}" stroke-linejoin="round" />
        <!-- Inner Accent Hexagon Boundary -->
        <polygon points="${innerPoints.join(" ")}" fill="none" stroke="${colorAccent}" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="8,5" stroke-opacity="0.7" />
        
        <!-- Center Core Icon -->
        ${icon !== "none" ? `
          <g transform="translate(${cx - 50 * iconScale}, ${cy - 70 * iconScale}) scale(${iconScale})">
            <g color="url(#grad-primary)">
              ${iconMarkup}
            </g>
          </g>
        ` : `
          <text x="${cx}" y="${cy - 5}" class="logo-font text-monogram" font-size="58" fill="url(#grad-accent)" text-anchor="middle">${initials}</text>
        `}

        <!-- Typography Block (Aligned under center) -->
        <g transform="translate(0, 0)">
          <text x="${cx}" y="${cy + 75}" class="logo-font text-brand" font-size="22" fill="#ffffff" text-anchor="middle" font-weight="900">${brandName}</text>
          <text x="${cx}" y="${cy + 96}" class="logo-font text-slogan" font-size="9" fill="${colorAccent}" text-anchor="middle" font-weight="600">${slogan}</text>
        </g>
      `;
      break;
    }
    
    case "shield": {
      // Sleek Shield Layout
      // Custom scaled vectors mapping outer shield boundaries
      const scaleShield = 1.1;
      const shOuter = `M 200,45 L 305,65 C 305,185 200,265 200,285 C 200,265 95,185 95,65 Z`;
      const shInner = `M 200,60 L 290,78 C 290,180 200,250 200,268 C 200,250 110,180 110,78 Z`;
      
      layoutMarkup = `
        <!-- Outer Glowing Shield Frame -->
        <path d="${shOuter}" fill="none" stroke="url(#grad-border)" stroke-width="${borderWidth}" stroke-linejoin="round" />
        <!-- Inner Border Accent Line -->
        <path d="${shInner}" fill="none" stroke="${colorAccent}" stroke-width="1.5" stroke-linejoin="round" stroke-dasharray="6,4" stroke-opacity="0.65" />
        
        <!-- Center Emblem Icon -->
        ${icon !== "none" ? `
          <g transform="translate(${cx - 50 * iconScale}, ${cy - 85 * iconScale}) scale(${iconScale})">
            <g color="url(#grad-primary)">
              ${iconMarkup}
            </g>
          </g>
        ` : `
          <text x="${cx}" y="${cy - 20}" class="logo-font text-monogram" font-size="52" fill="url(#grad-accent)" text-anchor="middle">${initials}</text>
        `}

        <!-- Solid Typography Base Grid -->
        <g transform="translate(0, 310)">
          <!-- Horizontal glow splitter line -->
          <line x1="${cx - 60}" y1="0" x2="${cx + 60}" y2="0" stroke="url(#grad-accent)" stroke-width="2" stroke-linecap="round" />
          
          <text x="${cx}" y="24" class="logo-font text-brand" font-size="24" fill="#ffffff" text-anchor="middle">${brandName}</text>
          <text x="${cx}" y="44" class="logo-font text-slogan" font-size="9" fill="${colorAccent}" text-anchor="middle">${slogan}</text>
        </g>
      `;
      break;
    }
    
    case "monogram": {
      // Classic Premium Monogram Layout
      const size = 180;
      const innerSize = 160;
      const r = 12; // corner radius
      
      layoutMarkup = `
        <!-- Outer Glowing Monogram Box -->
        <rect x="${cx - size/2}" y="${cy - size/2 - 20}" width="${size}" height="${size}" rx="${r}" fill="none" stroke="url(#grad-border)" stroke-width="${borderWidth}" />
        <!-- Inner Accent Frame -->
        <rect x="${cx - innerSize/2}" y="${cy - innerSize/2 - 20}" width="${innerSize}" height="${innerSize}" rx="${r-2}" fill="none" stroke="${colorAccent}" stroke-width="1.5" stroke-dasharray="8,4" stroke-opacity="0.6" />
        
        <!-- Central Massive Initials Monogram -->
        <text x="${cx}" y="${cy + 25}" class="logo-font text-monogram" font-size="78" fill="url(#grad-primary)" text-anchor="middle" font-weight="900" style="text-shadow: 0 4px 15px rgba(0,0,0,0.5);">${initials}</text>
        
        <!-- Decorative Icon Top-Center Badge -->
        ${icon !== "none" ? `
          <g transform="translate(${cx - 20 * iconScale}, ${cy - 128}) scale(${iconScale * 0.4})">
            <g color="#ffffff">
              ${iconMarkup}
            </g>
          </g>
        ` : ""}

        <!-- Horizontal Label Bar slicing bottom frame -->
        <g transform="translate(0, 312)">
          <!-- Banner Backplate -->
          <rect x="${cx - 130}" y="-18" width="260" height="34" rx="6" fill="#0c0c14" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
          
          <text x="${cx}" y="4" class="logo-font text-brand" font-size="15" fill="#ffffff" text-anchor="middle" font-weight="700">${brandName}</text>
          <text x="${cx}" y="24" class="logo-font text-slogan" font-size="8" fill="${colorAccent}" text-anchor="middle" font-weight="500">${slogan}</text>
        </g>
      `;
      break;
    }
  }

  // Combine full XML code
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
      ${defsBlock}
      ${layoutMarkup}
    </svg>
  `.trim();
}

// --- Core App Render Loop ---
function renderLogo() {
  const svgOutputWrapper = document.getElementById("svg-output-wrapper");
  if (!svgOutputWrapper) return;
  
  // Make sure font is loaded
  loadGoogleFont(state.fontFamily);
  
  // Compile the SVG
  const svgXmlString = compileSvgString();
  
  // Inject into DOM wrapper
  svgOutputWrapper.innerHTML = svgXmlString;
}

// --- File Exporters Logic ---

// Trigger raw vector SVG file download
function exportSvgFile() {
  const svgXmlString = compileSvgString();
  const blob = new Blob([svgXmlString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.brandName.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Draw SVG onto offscreen canvas and export high-res transparent PNG
function exportPngFile() {
  const svgXmlString = compileSvgString();
  
  // Standard target output size
  const exportSize = 1024;
  
  // Create an offscreen canvas
  const canvas = document.createElement("canvas");
  canvas.width = exportSize;
  canvas.height = exportSize;
  const ctx = canvas.getContext("2d");
  
  // Create virtual Image elements to load the vector XML safely
  const img = new Image();
  
  // Encapsulate XML into safe web Blobs
  const blob = new Blob([svgXmlString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  img.onload = function() {
    // Clear canvas
    ctx.clearRect(0, 0, exportSize, exportSize);
    
    // Draw SVG onto 1024x1024 canvas context high-fidelity
    ctx.drawImage(img, 0, 0, exportSize, exportSize);
    
    // Convert canvas back to PNG Data URL
    const pngUrl = canvas.toDataURL("image/png");
    
    // Trigger download
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${state.brandName.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up memory
    URL.revokeObjectURL(url);
  };
  
  img.onerror = function(err) {
    console.error("Rasterization Error: Failed to compile vector elements.", err);
    alert("Export Error: Please ensure you are running in a supported modern browser environment.");
    URL.revokeObjectURL(url);
  };
  
  img.src = url;
}

// Reset UI state to standard default brand values
function resetLayout() {
  state.brandName = "VERYNT";
  state.slogan = "CREATIVE STUDIO";
  state.initials = "V";
  state.preset = "badge";
  state.icon = "bolt";
  state.fontFamily = "Orbitron";
  state.colorPrimary = "#6366f1";
  state.colorSecondary = "#a855f7";
  state.colorAccent = "#38bdf8";
  state.iconScale = 1.0;
  state.borderWidth = 4;
  state.textSpacing = 4;
  state.emblemRadius = 120;
  
  // Update inputs manually
  document.getElementById("brand-name").value = state.brandName;
  document.getElementById("brand-slogan").value = state.slogan;
  document.getElementById("brand-initials").value = state.initials;
  document.getElementById("icon-select").value = state.icon;
  document.getElementById("font-family-select").value = state.fontFamily;
  document.getElementById("color-primary").value = state.colorPrimary;
  document.getElementById("color-secondary").value = state.colorSecondary;
  document.getElementById("color-accent").value = state.colorAccent;
  document.getElementById("range-icon-scale").value = state.iconScale;
  document.getElementById("range-border-width").value = state.borderWidth;
  document.getElementById("range-text-spacing").value = state.textSpacing;
  document.getElementById("range-emblem-radius").value = state.emblemRadius;
  
  // Update slider value indicators
  updateSliderDisplay("icon-scale", `${state.iconScale}x`);
  updateSliderDisplay("border-width", `${state.borderWidth}px`);
  updateSliderDisplay("text-spacing", `${state.textSpacing}px`);
  updateSliderDisplay("emblem-radius", `${state.emblemRadius}px`);
  
  // Update preset active card
  document.querySelectorAll(".preset-card").forEach(card => {
    card.classList.remove("active");
    if (card.dataset.preset === state.preset) {
      card.classList.add("active");
    }
  });
  
  // Render
  renderLogo();
}

function updateSliderDisplay(id, val) {
  const indicator = document.getElementById(`val-${id}`);
  if (indicator) {
    indicator.textContent = val;
  }
}

// --- DOM Event Bindings & Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  
  // Text Inputs
  const brandInput = document.getElementById("brand-name");
  const sloganInput = document.getElementById("brand-slogan");
  const initialsInput = document.getElementById("brand-initials");
  
  brandInput.addEventListener("input", (e) => {
    state.brandName = e.target.value.toUpperCase() || "VERYNT";
    renderLogo();
  });
  
  sloganInput.addEventListener("input", (e) => {
    state.slogan = e.target.value.toUpperCase() || "CREATIVE STUDIO";
    renderLogo();
  });
  
  initialsInput.addEventListener("input", (e) => {
    state.initials = e.target.value.toUpperCase() || "V";
    renderLogo();
  });
  
  // Presets selector
  const presetCards = document.querySelectorAll(".preset-card");
  presetCards.forEach(card => {
    card.addEventListener("click", () => {
      presetCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      
      state.preset = card.dataset.preset;
      
      // Hide or show emblem radius controls based on layout selection
      const emblemRadiusSlider = document.getElementById("range-emblem-radius").closest(".slider-group");
      if (state.preset === "badge") {
        emblemRadiusSlider.style.display = "block";
      } else {
        emblemRadiusSlider.style.display = "none";
      }
      
      renderLogo();
    });
  });
  
  // Dropdown Selects
  const iconSelect = document.getElementById("icon-select");
  iconSelect.addEventListener("change", (e) => {
    state.icon = e.target.value;
    renderLogo();
  });
  
  const fontSelect = document.getElementById("font-family-select");
  fontSelect.addEventListener("change", (e) => {
    state.fontFamily = e.target.value;
    renderLogo();
  });
  
  // Color Pickers
  const cpPrimary = document.getElementById("color-primary");
  const cpSecondary = document.getElementById("color-secondary");
  const cpAccent = document.getElementById("color-accent");
  
  cpPrimary.addEventListener("input", (e) => {
    state.colorPrimary = e.target.value;
    renderLogo();
  });
  
  cpSecondary.addEventListener("input", (e) => {
    state.colorSecondary = e.target.value;
    renderLogo();
  });
  
  cpAccent.addEventListener("input", (e) => {
    state.colorAccent = e.target.value;
    renderLogo();
  });
  
  // Style Range Sliders
  const slIconScale = document.getElementById("range-icon-scale");
  slIconScale.addEventListener("input", (e) => {
    state.iconScale = parseFloat(e.target.value);
    updateSliderDisplay("icon-scale", `${state.iconScale.toFixed(2)}x`);
    renderLogo();
  });
  
  const slBorderWidth = document.getElementById("range-border-width");
  slBorderWidth.addEventListener("input", (e) => {
    state.borderWidth = parseFloat(e.target.value);
    updateSliderDisplay("border-width", `${state.borderWidth}px`);
    renderLogo();
  });
  
  const slTextSpacing = document.getElementById("range-text-spacing");
  slTextSpacing.addEventListener("input", (e) => {
    state.textSpacing = parseFloat(e.target.value);
    updateSliderDisplay("text-spacing", `${state.textSpacing}px`);
    renderLogo();
  });
  
  const slEmblemRadius = document.getElementById("range-emblem-radius");
  slEmblemRadius.addEventListener("input", (e) => {
    state.emblemRadius = parseInt(e.target.value);
    updateSliderDisplay("emblem-radius", `${state.emblemRadius}px`);
    renderLogo();
  });
  
  // Background Toggles
  const bgBtns = document.querySelectorAll(".bg-btn");
  const canvasContainer = document.getElementById("canvas-container");
  
  bgBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      bgBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const bg = btn.dataset.bg;
      state.previewBg = bg;
      
      canvasContainer.className = "canvas-container"; // reset
      if (bg === "grid") {
        canvasContainer.classList.add("bg-grid-pattern");
      } else if (bg === "dark") {
        canvasContainer.classList.add("bg-solid-dark");
      } else if (bg === "light") {
        canvasContainer.classList.add("bg-solid-light");
      }
    });
  });
  
  // Action Buttons
  document.getElementById("btn-reset").addEventListener("click", resetLayout);
  document.getElementById("btn-export-svg").addEventListener("click", exportSvgFile);
  document.getElementById("btn-export-png").addEventListener("click", exportPngFile);
  
  // Init render on load
  renderLogo();
});
