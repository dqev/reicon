import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '..', 'data', 'icon-data.json');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const ZIP_OUT_PATH = path.join(PUBLIC_DIR, 'reicon-icons.zip');

console.log('Generating compressed ZIP archive for all Reicon icons...');

function rewriteColors(svg) {
  let code = svg.replace(/fill="white"/g, 'fill="#000000"');
  return code.replace(/currentColor/g, '#000000');
}

async function run() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      throw new Error(`Data file not found at ${DATA_PATH}`);
    }

    const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    const zip = new JSZip();
    
    // Create folders inside zip
    const outlineFolder = zip.folder('outline');
    const filledFolder = zip.folder('filled');

    let outlineCount = 0;
    let filledCount = 0;

    if (rawData.categories) {
      for (const [catKey, catData] of Object.entries(rawData.categories)) {
        for (const [iconKey, icon] of Object.entries(catData.icons || {})) {
          if (icon.weights) {
            // Outline weight
            if (icon.weights.Outline && icon.weights.Outline.code) {
              const code = rewriteColors(icon.weights.Outline.code);
              const fileContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${code}</svg>`;
              outlineFolder.file(`${iconKey}.svg`, fileContent);
              outlineCount++;
            }
            // Filled weight
            if (icon.weights.Filled && icon.weights.Filled.code) {
              const code = rewriteColors(icon.weights.Filled.code);
              const fileContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">${code}</svg>`;
              filledFolder.file(`${iconKey}.svg`, fileContent);
              filledCount++;
            }
          }
        }
      }
    }

    console.log(`Adding ${outlineCount} outline icons and ${filledCount} filled icons to ZIP archive...`);

    // Generate zip content as node buffer
    const content = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 } // Maximum compression
    });

    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    fs.writeFileSync(ZIP_OUT_PATH, content);
    console.log(`Successfully generated and compressed Reicon ZIP archive at ${ZIP_OUT_PATH} (${(content.length / 1024 / 1024).toFixed(2)} MB)`);
  } catch (error) {
    console.error('Error generating icons ZIP archive:', error);
    process.exit(1);
  }
}

run();
