#!/usr/bin/env node
/**
 * Shulchan Aruch Downloader
 * Downloads all four sections of Shulchan Aruch from Sefaria API
 * and converts them to the app's JSON format
 */

import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_DIR = join(__dirname, '../content/chapters');

// Book configurations
const BOOKS = [
  {
    sefaria: 'Shulchan_Arukh,_Orach_Chayim',
    prefix: 'orach_chaim',
    hebrewLabel: 'אורח חיים',
    maxSiman: 697 // Orach Chayim has 697 simanim
  },
  {
    sefaria: 'Shulchan_Arukh,_Yoreh_De\'ah',
    prefix: 'yoreh_deah',
    hebrewLabel: 'יורה דעה',
    maxSiman: 403 // Yoreh De'ah has 403 simanim
  },
  {
    sefaria: 'Shulchan_Arukh,_Even_HaEzer',
    prefix: 'even_haezer',
    hebrewLabel: 'אבן העזר',
    maxSiman: 178 // Even HaEzer has 178 simanim
  },
  {
    sefaria: 'Shulchan_Arukh,_Choshen_Mishpat',
    prefix: 'choshen_mishpat',
    hebrewLabel: 'חושן משפט',
    maxSiman: 427 // Choshen Mishpat has 427 simanim
  }
];

// Hebrew numerals conversion
const HEBREW_NUMERALS = {
  1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה', 6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט',
  10: 'י', 20: 'כ', 30: 'ל', 40: 'מ', 50: 'נ', 60: 'ס', 70: 'ע', 80: 'פ', 90: 'צ',
  100: 'ק', 200: 'ר', 300: 'ש', 400: 'ת'
};

function toHebrewNumeral(num) {
  // Special cases for 15 and 16 (avoid writing God's name)
  if (num === 15) return 'טו';
  if (num === 16) return 'טז';
  
  let result = '';
  let remaining = num;
  
  // Hundreds
  const hundreds = Math.floor(remaining / 100) * 100;
  if (hundreds > 0) {
    result += HEBREW_NUMERALS[hundreds] || '';
    remaining -= hundreds;
  }
  
  // Tens
  const tens = Math.floor(remaining / 10) * 10;
  if (tens > 0) {
    result += HEBREW_NUMERALS[tens] || '';
    remaining -= tens;
  }
  
  // Ones
  if (remaining > 0) {
    result += HEBREW_NUMERALS[remaining] || '';
  }
  
  return result;
}

function cleanText(text) {
  if (!text) return '';
  
  return text
    // Remove HTML tags
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Convert HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchFromSefariaV3(book, siman) {
  const url = `https://www.sefaria.org/api/v3/texts/${book}.${siman}?version=source`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // V3 returns the text in a nested structure
    if (data && data.versions && data.versions.length > 0) {
      const hebrewVersion = data.versions.find(v => v.language === 'he');
      if (hebrewVersion && hebrewVersion.text) {
        return {
          text: hebrewVersion.text,
          title: data.title || ''
        };
      }
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

async function fetchFromSefariaV1(book, siman) {
  const url = `https://www.sefaria.org/api/texts/${book}.${siman}?lang=he&pad=0&context=0&commentary=0`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    if (data && data.he && Array.isArray(data.he)) {
      return {
        text: data.he,
        title: data.heTitle || ''
      };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

async function fetchSiman(book, siman) {
  // Try v3 first
  let result = await fetchFromSefariaV3(book, siman);
  
  // Fallback to v1
  if (!result) {
    result = await fetchFromSefariaV1(book, siman);
  }
  
  return result;
}

function createSimanJson(bookConfig, simanNumber, data) {
  const id = `${bookConfig.prefix}-${String(simanNumber).padStart(3, '0')}`;
  const hebrewNumber = toHebrewNumeral(simanNumber);
  const chapterLabel = `${bookConfig.hebrewLabel} סימן ${hebrewNumber}`;
  
  // Extract title - remove the book name and siman number from it
  let title = '';
  if (data.title) {
    title = data.title
      .replace(/^.*?סימן\s*\w+\s*/, '')
      .trim();
  }
  
  // Process sections (se'ifim)
  const sections = [];
  if (Array.isArray(data.text)) {
    data.text.forEach((seifText, index) => {
      const seifNumber = index + 1;
      const cleanedText = cleanText(seifText);
      
      // Only add non-empty sections
      if (cleanedText) {
        sections.push({
          id: `${id}-s${seifNumber}`,
          section: seifNumber,
          text: cleanedText
        });
      }
    });
  }
  
  return {
    id,
    chapterLabel,
    title,
    sections,
    version: 1
  };
}

async function downloadBook(bookConfig) {
  console.log(`\n📖 Downloading ${bookConfig.hebrewLabel}...`);
  const chapterIds = [];
  let consecutiveFailures = 0;
  
  for (let siman = 1; siman <= bookConfig.maxSiman; siman++) {
    // Add delay to be respectful to Sefaria's API
    if (siman > 1) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    const data = await fetchSiman(bookConfig.sefaria, siman);
    
    if (!data || !data.text || data.text.length === 0) {
      consecutiveFailures++;
      console.log(`   ⚠️  Siman ${siman}: No data found`);
      
      // Stop if we have 5 consecutive failures
      if (consecutiveFailures >= 5) {
        console.log(`   ⛔ Stopping after ${consecutiveFailures} consecutive failures`);
        break;
      }
      continue;
    }
    
    consecutiveFailures = 0; // Reset counter on success
    
    const simanJson = createSimanJson(bookConfig, siman, data);
    const filename = `${bookConfig.prefix}-${String(siman).padStart(3, '0')}.json`;
    const filepath = join(OUTPUT_DIR, filename);
    
    await writeFile(filepath, JSON.stringify(simanJson, null, 2), 'utf-8');
    chapterIds.push(simanJson.id);
    
    console.log(`   ✅ Siman ${siman} (${simanJson.sections.length} se'ifim)`);
  }
  
  return chapterIds;
}

async function generateManifest(allChapterIds) {
  const manifest = {
    chapterIds: allChapterIds.sort()
  };
  
  const manifestPath = join(OUTPUT_DIR, '../manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`\n📄 Generated manifest.json with ${allChapterIds.length} chapters`);
}

async function main() {
  console.log('🔥 Shulchan Aruch Downloader');
  console.log('============================\n');
  
  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true });
  
  const allChapterIds = [];
  
  // Download each book
  for (const book of BOOKS) {
    const chapterIds = await downloadBook(book);
    allChapterIds.push(...chapterIds);
  }
  
  // Generate manifest
  await generateManifest(allChapterIds);
  
  console.log('\n✨ Download complete!');
  console.log(`📊 Total chapters: ${allChapterIds.length}`);
}

main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
