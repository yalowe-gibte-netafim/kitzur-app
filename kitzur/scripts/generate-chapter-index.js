#!/usr/bin/env node
/**
 * Generate chapters-index.ts with all chapter imports
 */
const fs = require('fs');
const path = require('path');

const CHAPTERS_DIR = path.join(__dirname, '../content/chapters');
const OUTPUT_FILE = path.join(__dirname, '../content/chapters-index.ts');

// Get all chapter files
const files = fs.readdirSync(CHAPTERS_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

const chapterId = files.map(f => f.replace('.json', ''));

// Generate the file content
const content = `/**
 * Auto-generated chapter index for Metro bundler
 * Generated: ${new Date().toISOString()}
 */

const chapters: Record<string, any> = {
${chapterId.map(id => `  '${id}': require('./chapters/${id}.json'),`).join('\n')}
};

export default chapters;

export const chapterIds = [
${chapterId.map(id => `  '${id}',`).join('\n')}
];
`;

fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
console.log(`✅ Generated chapters-index.ts with ${chapterId.length} chapters`);
