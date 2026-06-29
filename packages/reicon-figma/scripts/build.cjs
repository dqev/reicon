#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', '..', '..', 'data', 'icon-data.json');
const TEMPLATE_HTML_PATH = path.join(__dirname, '..', 'src', 'ui.html');
const OUTPUT_HTML_PATH = path.join(__dirname, '..', 'Reicon', 'ui.html');
const LOGO_PATH = path.join(__dirname, '..', '..', '..', 'public', 'apple-touch-icon.png');
const NEW_ICONS_PATH = path.join(__dirname, '..', '..', '..', 'data', 'new-icons-added.json');

console.log('Compiling Reicon Figma icons database and inlining into ui.html...');

try {
  if (!fs.existsSync(DATA_PATH)) {
    throw new Error(`Data file not found at ${DATA_PATH}`);
  }
  if (!fs.existsSync(TEMPLATE_HTML_PATH)) {
    throw new Error(`Template HTML file not found at ${TEMPLATE_HTML_PATH}`);
  }

  const rawData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const compactData = {};
  const categoriesList = [];

  if (rawData.categories) {
    for (const [catKey, catData] of Object.entries(rawData.categories)) {
      categoriesList.push({
        id: catKey,
        name: catData.name || catKey.charAt(0).toUpperCase() + catKey.slice(1)
      });

      for (const [iconKey, icon] of Object.entries(catData.icons || {})) {
        const weights = {};
        if (icon.weights) {
          if (icon.weights.Outline && icon.weights.Outline.code) {
            weights.Outline = icon.weights.Outline.code;
          }
          if (icon.weights.Filled && icon.weights.Filled.code) {
            weights.Filled = icon.weights.Filled.code;
          }
        }

        // Only include icon if it has at least one weight
        if (Object.keys(weights).length > 0) {
          compactData[iconKey] = {
            category: catKey,
            weights: weights,
            description: icon.description || []
          };
        }
      }
    }
  }

  // Load logo as base64
  let logoBase64 = '';
  if (fs.existsSync(LOGO_PATH)) {
    const logoBuffer = fs.readFileSync(LOGO_PATH);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  }

  // Load new icons count
  let newIconsCount = 0;
  if (fs.existsSync(NEW_ICONS_PATH)) {
    const newIcons = JSON.parse(fs.readFileSync(NEW_ICONS_PATH, 'utf-8'));
    newIconsCount = Array.isArray(newIcons) ? newIcons.length : 0;
  }

  // Read the HTML template
  let templateContent = fs.readFileSync(TEMPLATE_HTML_PATH, 'utf-8');

  // Replace logo placeholder
  templateContent = templateContent.replace(/__REICON_LOGO_BASE64__/g, logoBase64);
  templateContent = templateContent.replace(/__NEW_ICONS_COUNT__/g, newIconsCount.toString());

  // Create inline scripts
  const inlineScripts = `
  <script>
    window.REICON_DATA = ${JSON.stringify(compactData)};
    window.REICON_CATEGORIES = ${JSON.stringify(categoriesList)};
  </script>
  `;

  // Inject before the closing </head> or at placeholder
  if (templateContent.includes('<!-- INJECT_ICONS_DATA -->')) {
    templateContent = templateContent.replace('<!-- INJECT_ICONS_DATA -->', inlineScripts);
  } else {
    templateContent = templateContent.replace('</head>', `${inlineScripts}\n</head>`);
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_HTML_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_HTML_PATH, templateContent, 'utf-8');
  console.log(`Successfully compiled ${Object.keys(compactData).length} icons directly into ${OUTPUT_HTML_PATH}`);
} catch (error) {
  console.error('Error compiling Figma plugin UI:', error);
  process.exit(1);
}
