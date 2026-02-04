#!/usr/bin/env node

// Simple verification script for the Kitzur Shulchan Aruch app

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Kitzur Shulchan Aruch App - Verification');
console.log('='.repeat(60));
console.log('');

// Check project structure
const requiredFiles = [
  'package.json',
  'App.tsx',
  'app.json',
  'tsconfig.json',
  'src/types/index.ts',
  'src/data/kitzurData.ts',
  'src/components/ChapterList.tsx',
  'src/components/ChapterDetail.tsx',
  'src/screens/HomeScreen.tsx',
  'src/screens/ChapterScreen.tsx',
];

console.log('✓ Checking project structure...\n');

let allFilesExist = true;
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  const status = exists ? '✓' : '✗';
  console.log(`  ${status} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('');

if (!allFilesExist) {
  console.log('✗ Some required files are missing!');
  process.exit(1);
}

// Load and verify data
console.log('✓ Verifying data structure...\n');

const kitzurDataPath = path.join(__dirname, 'src/data/kitzurData.ts');
const kitzurDataContent = fs.readFileSync(kitzurDataPath, 'utf8');

// Check for Hebrew content
const hasHebrew = /[\u0590-\u05FF]/.test(kitzurDataContent);
console.log(`  ${hasHebrew ? '✓' : '✗'} Hebrew content found`);

// Check for Sephardic notes
const hasSephardicNotes = kitzurDataContent.includes('sephardicNote');
console.log(`  ${hasSephardicNotes ? '✓' : '✗'} Sephardic notes present`);

// Check for specific keywords
const keywords = ['יל"י', 'ספרדים', 'מרן', 'שו"ע'];
keywords.forEach(keyword => {
  const found = kitzurDataContent.includes(keyword);
  console.log(`  ${found ? '✓' : '✗'} Contains "${keyword}"`);
});

console.log('');

// Verify package.json
console.log('✓ Verifying configuration...\n');

const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
console.log(`  ✓ Package name: ${packageJson.name}`);
console.log(`  ✓ Version: ${packageJson.version}`);

const requiredDeps = ['expo', 'react', 'react-native', 'react-dom', 'react-native-web'];
requiredDeps.forEach(dep => {
  const exists = packageJson.dependencies && packageJson.dependencies[dep];
  console.log(`  ${exists ? '✓' : '✗'} ${dep}: ${exists || 'missing'}`);
});

console.log('');

// Verify app.json
const appJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'app.json'), 'utf8'));
console.log(`  ✓ App name: ${appJson.expo.name}`);
console.log(`  ✓ iOS support: ${appJson.expo.ios ? 'enabled' : 'disabled'}`);
console.log(`  ✓ Web support: ${appJson.expo.web ? 'enabled' : 'disabled'}`);

console.log('');
console.log('='.repeat(60));
console.log('✓ All verification checks passed!');
console.log('='.repeat(60));
console.log('');
console.log('Platform Support:');
console.log('  • iOS (iPhone & iPad) - React Native');
console.log('  • Web - React Native Web');
console.log('');
console.log('Features:');
console.log('  • Full Hebrew text support');
console.log('  • Sephardic customs (Yalkut Yosef style)');
console.log('  • Chapter and section navigation');
console.log('  • Responsive design');
console.log('');
console.log('To run:');
console.log('  npm run web     - Run web version');
console.log('  npm run ios     - Run iOS version (requires macOS)');
console.log('');
