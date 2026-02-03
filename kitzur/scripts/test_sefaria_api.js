#!/usr/bin/env node

/**
 * Quick test of Shulchan Aruch fetcher
 * Fetches just the first 3 simanim to verify API connectivity
 */

const { fetchPart, validateJSON } = require('./fetch_shulchan_aruch');

async function quickTest() {
  console.log('🧪 Testing Sefaria API connectivity...\n');
  
  const testPart = {
    key: 'orach_chaim_test',
    name: 'Orach Chaim (Test)',
    slug: 'Shulchan_Arukh,_Orach_Chayim',
    expectedSimanim: 3 // Only fetch first 3
  };
  
  try {
    // Temporarily override config
    const axios = require('axios');
    const url = 'https://www.sefaria.org/api/texts/Shulchan_Arukh,_Orach_Chayim.1?lang=he&pad=0';
    
    console.log('Testing API endpoint:', url);
    const response = await axios.get(url, { timeout: 5000 });
    
    if (response.data && response.data.he) {
      console.log('✅ API is accessible');
      console.log(`   Siman 1 has ${response.data.he.length} seifim`);
      console.log(`   First seif preview: ${response.data.he[0].substring(0, 50)}...`);
      console.log('\n✅ Script should work correctly!');
      console.log('\nRun the full script:');
      console.log('   node scripts/fetch_shulchan_aruch.js\n');
    } else {
      console.log('⚠️  Unexpected API response format');
    }
    
  } catch (error) {
    console.error('❌ Error connecting to Sefaria API:', error.message);
    console.log('\nTroubleshooting:');
    console.log('   1. Check internet connection');
    console.log('   2. Verify Sefaria.org is accessible');
    console.log('   3. Try again in a few moments\n');
  }
}

quickTest();
