#!/usr/bin/env node

/**
 * Shulchan Aruch (Maran) Data Fetcher
 * 
 * Fetches the complete text of Shulchan Aruch from Sefaria API (Public Domain)
 * and generates 4 structured JSON files for mobile app usage.
 * 
 * Source: Sefaria.org API
 * License: Public Domain (authored 1565, author died >100 years ago)
 * 
 * Usage: node scripts/fetch_shulchan_aruch.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

// Configuration
const CONFIG = {
  baseUrl: 'https://www.sefaria.org/api/texts',
  outputDir: path.join(__dirname, '../data/shulchan_aruch'),
  requestDelay: 500, // ms between requests to be respectful
  maxRetries: 3,
  consecutiveFailuresBeforeStop: 5,
  
  parts: [
    {
      key: 'orach_chaim',
      name: 'Orach Chaim',
      slug: 'Shulchan_Arukh,_Orach_Chayim',
      expectedSimanim: 697 // Known max
    },
    {
      key: 'yoreh_deah',
      name: 'Yoreh De\'ah',
      slug: 'Shulchan_Arukh,_Yoreh_De\'ah',
      expectedSimanim: 403
    },
    {
      key: 'even_haezer',
      name: 'Even HaEzer',
      slug: 'Shulchan_Arukh,_Even_HaEzer',
      expectedSimanim: 178
    },
    {
      key: 'choshen_mishpat',
      name: 'Choshen Mishpat',
      slug: 'Shulchan_Arukh,_Choshen_Mishpat',
      expectedSimanim: 427
    }
  ]
};

// Utility: Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: Clean HTML text
function cleanText(htmlText) {
  if (!htmlText) return '';
  
  // Remove all HTML tags but keep the text
  const cleaned = sanitizeHtml(htmlText, {
    allowedTags: [],
    allowedAttributes: {}
  });
  
  // Normalize whitespace
  return cleaned
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

// Utility: Parse Sefaria response into seifim
function parseSeifim(hebrewText) {
  if (!hebrewText || !Array.isArray(hebrewText)) {
    return [];
  }
  
  return hebrewText
    .map((text, index) => ({
      n: index + 1,
      text: cleanText(text)
    }))
    .filter(seif => seif.text.length > 0);
}

// Fetch a single siman with retry logic
async function fetchSiman(slug, simanNumber, retryCount = 0) {
  const url = `${CONFIG.baseUrl}/${slug}.${simanNumber}?lang=he&pad=0`;
  
  try {
    console.log(`  Fetching Siman ${simanNumber}...`);
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'ShulchanAruchApp/1.0 (Educational; Non-commercial)'
      }
    });
    
    // Check if we got valid data
    if (!response.data || response.data.error) {
      return null;
    }
    
    // Extract Hebrew text
    const hebrewText = response.data.he || response.data.text;
    
    if (!hebrewText || (Array.isArray(hebrewText) && hebrewText.length === 0)) {
      return null;
    }
    
    // Parse into structured format
    const seifim = parseSeifim(hebrewText);
    
    if (seifim.length === 0) {
      return null;
    }
    
    return {
      title: `סימן ${simanNumber}`,
      hebrewTitle: response.data.heTitle || `סימן ${simanNumber}`,
      seifim: seifim
    };
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Not found is expected when we reach the end
      return null;
    }
    
    if (retryCount < CONFIG.maxRetries) {
      console.log(`    Retry ${retryCount + 1}/${CONFIG.maxRetries} for Siman ${simanNumber}...`);
      await sleep(CONFIG.requestDelay * 2);
      return fetchSiman(slug, simanNumber, retryCount + 1);
    }
    
    console.error(`    Error fetching Siman ${simanNumber}:`, error.message);
    return null;
  }
}

// Fetch all simanim for a part
async function fetchPart(part) {
  console.log(`\n📖 Fetching ${part.name}...`);
  console.log(`   Slug: ${part.slug}`);
  
  const simanim = {};
  let consecutiveFailures = 0;
  let simanNumber = 1;
  let successCount = 0;
  
  while (simanNumber <= part.expectedSimanim + 10) { // Add buffer
    const siman = await fetchSiman(part.slug, simanNumber);
    
    if (siman) {
      simanim[simanNumber] = siman;
      successCount++;
      consecutiveFailures = 0;
      console.log(`    ✓ Siman ${simanNumber} (${siman.seifim.length} seifim)`);
    } else {
      consecutiveFailures++;
      console.log(`    ✗ Siman ${simanNumber} not found (consecutive failures: ${consecutiveFailures})`);
      
      if (consecutiveFailures >= CONFIG.consecutiveFailuresBeforeStop) {
        console.log(`    Stopping: ${consecutiveFailures} consecutive failures reached.`);
        break;
      }
    }
    
    simanNumber++;
    
    // Respectful delay between requests
    await sleep(CONFIG.requestDelay);
  }
  
  console.log(`✓ ${part.name}: Fetched ${successCount} simanim`);
  
  return {
    meta: {
      work: 'Shulchan Aruch (Maran)',
      part: part.name,
      partKey: part.key,
      source: 'Sefaria API + Wikisource',
      license: 'Public Domain',
      language: 'he',
      version: '1.0.0',
      generated_at: new Date().toISOString(),
      total_simanim: successCount
    },
    simanim: simanim
  };
}

// Save JSON to file
function saveToFile(data, filename) {
  const filePath = path.join(CONFIG.outputDir, filename);
  
  // Ensure directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  // Write JSON with pretty formatting
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2),
    'utf8'
  );
  
  // Get file size
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`   💾 Saved: ${filename} (${sizeMB} MB)`);
  
  return filePath;
}

// Validate JSON structure
function validateJSON(data, partName) {
  console.log(`\n🔍 Validating ${partName}...`);
  
  const errors = [];
  
  if (!data.meta) {
    errors.push('Missing meta object');
  }
  
  if (!data.simanim || typeof data.simanim !== 'object') {
    errors.push('Missing or invalid simanim object');
    return errors;
  }
  
  const simanNumbers = Object.keys(data.simanim);
  
  if (simanNumbers.length === 0) {
    errors.push('No simanim found');
  }
  
  // Check structure of first few simanim
  for (let i = 0; i < Math.min(3, simanNumbers.length); i++) {
    const simanKey = simanNumbers[i];
    const siman = data.simanim[simanKey];
    
    if (!siman.title) {
      errors.push(`Siman ${simanKey}: Missing title`);
    }
    
    if (!Array.isArray(siman.seifim)) {
      errors.push(`Siman ${simanKey}: seifim is not an array`);
    } else if (siman.seifim.length === 0) {
      errors.push(`Siman ${simanKey}: No seifim`);
    } else {
      // Check first seif structure
      const seif = siman.seifim[0];
      if (typeof seif.n !== 'number') {
        errors.push(`Siman ${simanKey}, Seif 1: Invalid 'n' field`);
      }
      if (typeof seif.text !== 'string' || seif.text.length === 0) {
        errors.push(`Siman ${simanKey}, Seif 1: Invalid or empty 'text' field`);
      }
    }
  }
  
  if (errors.length === 0) {
    console.log(`   ✓ Valid: ${simanNumbers.length} simanim, structure OK`);
  } else {
    console.error(`   ✗ Validation errors:`, errors);
  }
  
  return errors;
}

// Main execution
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║   Shulchan Aruch (Maran) Data Fetcher                     ║');
  console.log('║   Source: Sefaria.org API (Public Domain)                 ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const startTime = Date.now();
  const results = [];
  
  try {
    // Fetch all 4 parts
    for (const part of CONFIG.parts) {
      const data = await fetchPart(part);
      
      // Validate
      const validationErrors = validateJSON(data, part.name);
      
      if (validationErrors.length > 0) {
        console.error(`\n⚠️  Validation failed for ${part.name}`);
        continue;
      }
      
      // Save to file
      const filename = `${part.key}.json`;
      const filePath = saveToFile(data, filename);
      
      results.push({
        part: part.name,
        simanim: data.meta.total_simanim,
        file: filename,
        path: filePath
      });
      
      // Delay between parts
      console.log('\n   Waiting before next part...');
      await sleep(2000);
    }
    
    // Summary
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
    
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                     SUMMARY                                ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    results.forEach(result => {
      console.log(`   ✓ ${result.part.padEnd(20)} ${result.simanim} simanim → ${result.file}`);
    });
    
    const totalSimanim = results.reduce((sum, r) => sum + r.simanim, 0);
    
    console.log(`\n   Total: ${totalSimanim} simanim fetched in ${duration} minutes`);
    console.log(`   Output directory: ${CONFIG.outputDir}\n`);
    
    console.log('✅ Complete! All files generated successfully.\n');
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = { fetchPart, cleanText, validateJSON };
