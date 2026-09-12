import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';

// REFERESTATES Brand Palette
const BG_COLOR = '#F4F3EB';       // Luxury Ivory/Cream disc
const NAVY_COLOR = '#121A2A';     // Midnight Slate / Navy for "REFER"
const COPPER_COLOR = '#BD5523';   // Luxury Warm Cognac / Copper for "ESTAES"

// 512x512 Canvas Dimensions
const SIZE = 512;
const CX = SIZE / 2;
const CY = SIZE / 2;
const RADIUS = 246; // Circular disc radius with 10px breathing room

// Typography metrics
const H = 50;           // Letter height
const T = 8.5;          // Stroke / bar thickness
const Y0 = CY - H / 2;  // Top: 231
const Y1 = CY + H / 2;  // Bottom: 281
const YMID = CY;        // Center: 256

const W = 27;           // Letter width
const GAP = 6.5;        // Letter gap
const WORD_GAP = 9;     // Gap between REFER and ESTAES

// Letters definitions
// REFER (5 letters in Navy)
// ESTAES (6 letters in Copper)
const letters = [
  // REFER
  { char: 'R', color: NAVY_COLOR, w: W },
  { char: 'E', color: NAVY_COLOR, w: W },
  { char: 'F', color: NAVY_COLOR, w: W - 1 },
  { char: 'E', color: NAVY_COLOR, w: W },
  { char: 'R', color: NAVY_COLOR, w: W },
  // ESTAES
  { char: 'E', color: COPPER_COLOR, w: W, wordGapBefore: true },
  { char: 'S', color: COPPER_COLOR, w: W - 1 },
  { char: 'T', color: COPPER_COLOR, w: W },
  { char: 'A', color: COPPER_COLOR, w: W + 1 }, // Chevron Lambda Λ
  { char: 'E', color: COPPER_COLOR, w: W },
  { char: 'S', color: COPPER_COLOR, w: W - 1 },
];

// Calculate total width
let totalWidth = 0;
letters.forEach((item, idx) => {
  if (idx > 0) {
    totalWidth += item.wordGapBefore ? WORD_GAP : GAP;
  }
  totalWidth += item.w;
});

const startX = CX - totalWidth / 2;

// Generate SVG paths for each letter
let currentX = startX;
const svgPaths = [];
const drawCommands = [];

letters.forEach((item, idx) => {
  if (idx > 0) {
    currentX += item.wordGapBefore ? WORD_GAP : GAP;
  }
  const x = currentX;
  const w = item.w;
  const col = item.color;

  if (item.char === 'E') {
    // 3 parallel horizontal bars
    const yTop = Y0;
    const yMid = YMID - T / 2;
    const yBot = Y1 - T;
    
    // SVG
    svgPaths.push(`
      <!-- E (${col}) -->
      <rect x="${x}" y="${yTop}" width="${w}" height="${T}" rx="1.5" fill="${col}" />
      <rect x="${x}" y="${yMid}" width="${w}" height="${T}" rx="1.5" fill="${col}" />
      <rect x="${x}" y="${yBot}" width="${w}" height="${T}" rx="1.5" fill="${col}" />
    `);

    // ImageMagick
    drawCommands.push(`fill "${col}" roundrectangle ${x},${yTop} ${x+w},${yTop+T} 1.5,1.5`);
    drawCommands.push(`fill "${col}" roundrectangle ${x},${yMid} ${x+w},${yMid+T} 1.5,1.5`);
    drawCommands.push(`fill "${col}" roundrectangle ${x},${yBot} ${x+w},${yBot+T} 1.5,1.5`);
  } 
  else if (item.char === 'R') {
    // R: Vertical stem + upper curved bowl + diagonal leg
    const bowlH = (H / 2) + 2; // from Y0 to YMID + 2
    const bowlY1 = Y0 + bowlH;
    const innerW = w - T - 4;
    const innerH = bowlH - 2 * T;

    svgPaths.push(`
      <!-- R (${col}) -->
      <path d="
        M ${x} ${Y0}
        L ${x + w - 7} ${Y0}
        Q ${x + w} ${Y0} ${x + w} ${Y0 + 7}
        L ${x + w} ${bowlY1 - 6}
        Q ${x + w} ${bowlY1} ${x + w - 6} ${bowlY1}
        L ${x + T} ${bowlY1}
        L ${x + T} ${Y1}
        L ${x} ${Y1}
        Z
        M ${x + T} ${Y0 + T}
        L ${x + w - 7} ${Y0 + T}
        Q ${x + w - T} ${Y0 + T} ${x + w - T} ${Y0 + T + 4}
        L ${x + w - T} ${bowlY1 - T - 4}
        Q ${x + w - T} ${bowlY1 - T} ${x + w - 7} ${bowlY1 - T}
        L ${x + T} ${bowlY1 - T}
        Z
      " fill="${col}" fill-rule="evenodd" />
      <polygon points="${x + w - 12},${bowlY1 - 2} ${x + w},${Y1} ${x + w - 9},${Y1} ${x + T},${bowlY1 + 5} ${x + T},${bowlY1 - 2}" fill="${col}" />
    `);

    // For ImageMagick, we draw stem, top bar, curve/right, middle bar, and diagonal leg
    drawCommands.push(`fill "${col}" rectangle ${x},${Y0} ${x+T},${Y1}`);
    drawCommands.push(`fill "${col}" roundrectangle ${x+T},${Y0} ${x+w},${bowlY1} 5,5`);
    drawCommands.push(`fill "${BG_COLOR}" roundrectangle ${x+T},${Y0+T} ${x+w-T},${bowlY1-T} 3,3`);
    drawCommands.push(`fill "${col}" polygon ${x+w-12},${bowlY1-2} ${x+w},${Y1} ${x+w-9},${Y1} ${x+T},${bowlY1+5} ${x+T},${bowlY1-2}`);
  }
  else if (item.char === 'F') {
    // F: Vertical stem + Top horizontal bar + Middle horizontal bar
    const yMid = YMID - T / 2;
    svgPaths.push(`
      <!-- F (${col}) -->
      <rect x="${x}" y="${Y0}" width="${T}" height="${H}" rx="1" fill="${col}" />
      <rect x="${x + T}" y="${Y0}" width="${w - T}" height="${T}" rx="1" fill="${col}" />
      <rect x="${x + T}" y="${yMid}" width="${w - T - 3}" height="${T}" rx="1" fill="${col}" />
    `);

    drawCommands.push(`fill "${col}" rectangle ${x},${Y0} ${x+T},${Y1}`);
    drawCommands.push(`fill "${col}" rectangle ${x+T},${Y0} ${x+w},${Y0+T}`);
    drawCommands.push(`fill "${col}" rectangle ${x+T},${yMid} ${x+w-3},${yMid+T}`);
  }
  else if (item.char === 'T') {
    // T: Top horizontal bar + Center vertical stem
    const stemX = x + (w - T) / 2;
    svgPaths.push(`
      <!-- T (${col}) -->
      <rect x="${x}" y="${Y0}" width="${w}" height="${T}" rx="1" fill="${col}" />
      <rect x="${stemX}" y="${Y0 + T}" width="${T}" height="${H - T}" rx="1" fill="${col}" />
    `);

    drawCommands.push(`fill "${col}" rectangle ${x},${Y0} ${x+w},${Y0+T}`);
    drawCommands.push(`fill "${col}" rectangle ${stemX},${Y0+T} ${stemX+T},${Y1}`);
  }
  else if (item.char === 'A') {
    // Λ (A Chevron with no crossbar)
    const midX = x + w / 2;
    svgPaths.push(`
      <!-- A / Lambda (${col}) -->
      <polygon points="${midX},${Y0} ${midX + T/2},${Y0} ${x + w},${Y1} ${x + w - T - 1},${Y1} ${midX},${Y0 + T*1.6} ${x + T + 1},${Y1} ${x},${Y1} ${midX - T/2},${Y0}" fill="${col}" />
    `);

    drawCommands.push(`fill "${col}" polygon ${midX},${Y0} ${midX + T/2},${Y0} ${x + w},${Y1} ${x + w - T - 1},${Y1} ${midX},${Y0 + T*1.6} ${x + T + 1},${Y1} ${x},${Y1} ${midX - T/2},${Y0}`);
  }
  else if (item.char === 'S') {
    // Geometric S with modern crisp strokes
    const yMid = YMID - T / 2;
    svgPaths.push(`
      <!-- S (${col}) -->
      <path d="
        M ${x + w} ${Y0 + 6}
        L ${x + w} ${Y0}
        L ${x + 5} ${Y0}
        Q ${x} ${Y0} ${x} ${Y0 + 5}
        L ${x} ${yMid}
        Q ${x} ${yMid + 4} ${x + 5} ${yMid + 4}
        L ${x + w - 5} ${yMid + 4}
        Q ${x + w} ${yMid + 4} ${x + w} ${yMid + 8}
        L ${x + w} ${Y1 - 5}
        Q ${x + w} ${Y1} ${x + w - 5} ${Y1}
        L ${x} ${Y1}
        L ${x} ${Y1 - 6}
        L ${x + w - T} ${Y1 - 6}
        L ${x + w - T} ${yMid + T + 2}
        L ${x + 5} ${yMid + T + 2}
        Q ${x} ${yMid + T + 2} ${x} ${yMid}
        L ${x} ${Y0 + 5}
        Q ${x} ${Y0} ${x + 5} ${Y0}
        Z
      " fill="${col}" />
    `);

    // ImageMagick drawing for S: top bar, upper-left stem, middle bar, lower-right stem, bottom bar
    drawCommands.push(`fill "${col}" roundrectangle ${x},${Y0} ${x+w},${Y0+T} 2,2`);
    drawCommands.push(`fill "${col}" roundrectangle ${x},${Y0} ${x+T},${YMID} 2,2`);
    drawCommands.push(`fill "${col}" roundrectangle ${x},${yMid} ${x+w},${yMid+T} 2,2`);
    drawCommands.push(`fill "${col}" roundrectangle ${x+w-T},${YMID} ${x+w},${Y1} 2,2`);
    drawCommands.push(`fill "${col}" roundrectangle ${x},${Y1-T} ${x+w},${Y1} 2,2`);
  }

  currentX += w;
});

// Construct pure SVG
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <!-- Smooth anti-aliased circular clip -->
    <clipPath id="circle-clip">
      <circle cx="${CX}" cy="${CY}" r="${RADIUS}" />
    </clipPath>
  </defs>

  <!-- Circular background badge with true transparent exterior -->
  <circle cx="${CX}" cy="${CY}" r="${RADIUS}" fill="${BG_COLOR}" />

  <!-- Logo Group -->
  <g id="referestates-logo">
    ${svgPaths.join('\n')}
  </g>
</svg>
`;

// Write public/favicon.svg
const publicDir = path.resolve(process.cwd(), 'public');
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
console.log('Created public/favicon.svg');

// Render PNGs and ICO using ImageMagick convert
try {
  // Generate 512x512 Master PNG with transparent background outside circle
  const mvgFile = path.join(publicDir, 'draw.mvg');
  const mvgContent = `
viewbox 0 0 ${SIZE} ${SIZE}
fill none
rectangle 0,0 ${SIZE},${SIZE}
fill "${BG_COLOR}"
circle ${CX},${CY} ${CX},${CY - RADIUS}
${drawCommands.join('\n')}
`;
  fs.writeFileSync(mvgFile, mvgContent, 'utf-8');

  // Render to 512x512 PNG
  execSync(`convert -size ${SIZE}x${SIZE} xc:none -draw @${mvgFile} ${path.join(publicDir, 'favicon-512x512.png')}`);
  console.log('Created public/favicon-512x512.png');

  // Create favicon.png (standard)
  fs.copyFileSync(path.join(publicDir, 'favicon-512x512.png'), path.join(publicDir, 'favicon.png'));

  // Render 180x180 Apple Touch Icon
  execSync(`convert ${path.join(publicDir, 'favicon-512x512.png')} -resize 180x180 ${path.join(publicDir, 'apple-touch-icon.png')}`);
  console.log('Created public/apple-touch-icon.png');

  // Render 192x192 Android Chrome Icon
  execSync(`convert ${path.join(publicDir, 'favicon-512x512.png')} -resize 192x192 ${path.join(publicDir, 'android-chrome-192x192.png')}`);
  console.log('Created public/android-chrome-192x192.png');

  // Render 48x48 Favicon PNG (Google recommended size for search results)
  execSync(`convert ${path.join(publicDir, 'favicon-512x512.png')} -resize 48x48 ${path.join(publicDir, 'favicon-48x48.png')}`);
  console.log('Created public/favicon-48x48.png');

  // Render 32x32 Favicon PNG
  execSync(`convert ${path.join(publicDir, 'favicon-512x512.png')} -resize 32x32 ${path.join(publicDir, 'favicon-32x32.png')}`);
  console.log('Created public/favicon-32x32.png');

  // Render 16x16 Favicon PNG
  execSync(`convert ${path.join(publicDir, 'favicon-512x512.png')} -resize 16x16 ${path.join(publicDir, 'favicon-16x16.png')}`);
  console.log('Created public/favicon-16x16.png');

  // Create multi-resolution favicon.ico (16, 32, 48)
  execSync(`convert ${path.join(publicDir, 'favicon-16x16.png')} ${path.join(publicDir, 'favicon-32x32.png')} ${path.join(publicDir, 'favicon-48x48.png')} -colors 256 ${path.join(publicDir, 'favicon.ico')}`);
  console.log('Created public/favicon.ico');

  // Clean up temporary mvg file
  fs.unlinkSync(mvgFile);
} catch (err) {
  console.error('Error generating raster favicons:', err);
}
