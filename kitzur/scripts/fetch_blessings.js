const fs = require('fs');
const path = require('path');
const https = require('https');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function stripHtmlTags(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&thinsp;/g, ' ')
    .replace(/&[a-z]+;/g, '')
    .replace(/\{[פס]\}/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .trim();
}

async function fetchBirkatHaMazon() {
  console.log('\n📖 Fetching Birkat HaMazon...');
  
  try {
    // Fetch the main sections of Birkat HaMazon
    const sections = [
      'Birkat_Hamazon,_Zimmun',
      'Birkat_Hamazon,_Blessing_on_the_Food',
      'Birkat_Hamazon,_Blessing_on_the_Land',
      'Birkat_Hamazon,_Blessing_on_Jerusalem',
      'Birkat_Hamazon,_Hatov_Vehametiv'
    ];
    
    const allParagraphs = [];
    let paragraphNum = 1;
    
    for (const section of sections) {
      const url = `https://www.sefaria.org/api/texts/${section}?lang=he`;
      const response = await httpsGet(url);
      
      if (response.he && response.he.length > 0) {
        for (const text of response.he) {
          const cleaned = stripHtmlTags(text);
          if (cleaned.length > 0) {
            allParagraphs.push({
              paragraph: paragraphNum++,
              text: cleaned
            });
          }
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    const birkatHaMazon = {
      name: "בִּרְכַּת הַמָּזוֹן",
      hebrewName: "בִּרְכַּת הַמָּזוֹן",
      category: "ברכות",
      description: "בִּרְכַּת הַמָּזוֹן הַשְּׁלֵמָה לְאַחַר סְעוּדָה שֶׁיֵּשׁ בָּהּ פַּת",
      paragraphs: allParagraphs
    };

    const outputPath = path.join(__dirname, '..', 'content', 'special', 'birkat_hamazon.json');
    fs.writeFileSync(outputPath, JSON.stringify(birkatHaMazon, null, 2), 'utf8');
    
    console.log(`✓ Birkat HaMazon saved successfully!`);
    console.log(`   Location: ${outputPath}`);
    console.log(`   Total paragraphs: ${allParagraphs.length}`);
    
    return birkatHaMazon;
  } catch (error) {
    console.error('❌ Error fetching Birkat HaMazon:', error.message);
    return null;
  }
}

async function fetchBoreiNefashot() {
  console.log('\n📖 Fetching Borei Nefashot...');
  
  try {
    const url = 'https://www.sefaria.org/api/texts/Siddur_Sefard,_Blessings,_Borei_Nefashot?lang=he';
    const response = await httpsGet(url);
    
    if (!response.he || response.he.length === 0) {
      console.log('❌ No Hebrew text found for Borei Nefashot');
      return null;
    }

    // The actual blessing text is typically the last paragraph
    const text = stripHtmlTags(response.he[response.he.length - 1]);

    const boreiNefashot = {
      name: "בּוֹרֵא נְפָשׁוֹת",
      hebrewName: "בּוֹרֵא נְפָשׁוֹת",
      category: "ברכות",
      description: "בְּרָכָה אַחֲרוֹנָה עַל מַאֲכָלִים שֶׁאֵין בָּהֶם מִשִּׁבְעַת הַמִּינִים אוֹ פַּת",
      text: text
    };

    const outputPath = path.join(__dirname, '..', 'content', 'special', 'borei_nefashot.json');
    fs.writeFileSync(outputPath, JSON.stringify(boreiNefashot, null, 2), 'utf8');
    
    console.log(`✓ Borei Nefashot saved successfully!`);
    console.log(`   Location: ${outputPath}`);
    console.log(`   Text length: ${text.length} characters`);
    
    return boreiNefashot;
  } catch (error) {
    console.error('❌ Error fetching Borei Nefashot:', error.message);
    return null;
  }
}

async function fetchMeeinShalosh() {
  console.log('\n📖 Fetching Me\'ein Shalosh...');
  
  try {
    const url = 'https://www.sefaria.org/api/texts/Siddur_Sefard,_Blessings,_Me\'ein_Shalosh?lang=he';
    const response = await httpsGet(url);
    
    if (!response.he || response.he.length === 0) {
      console.log('❌ No Hebrew text found for Me\'ein Shalosh');
      return null;
    }

    // Skip headers and get the actual blessing text
    const paragraphs = response.he.slice(2).map((text, index) => ({
      paragraph: index + 1,
      text: stripHtmlTags(text)
    })).filter(p => p.text.length > 0);

    const meeinShalosh = {
      name: "מְעֵין שָׁלוֹשׁ",
      hebrewName: "מְעֵין שָׁלוֹשׁ",
      category: "ברכות",
      description: "בְּרָכָה אַחֲרוֹנָה עַל מַאֲכָלִים מִשִּׁבְעַת הַמִּינִים - עַל הַמִּחְיָה, עַל הַגֶּפֶן, עַל הָעֵץ",
      paragraphs: paragraphs
    };

    const outputPath = path.join(__dirname, '..', 'content', 'special', 'meein_shalosh.json');
    fs.writeFileSync(outputPath, JSON.stringify(meeinShalosh, null, 2), 'utf8');
    
    console.log(`✓ Me'ein Shalosh saved successfully!`);
    console.log(`   Location: ${outputPath}`);
    console.log(`   Total paragraphs: ${paragraphs.length}`);
    
    return meeinShalosh;
  } catch (error) {
    console.error('❌ Error fetching Me\'ein Shalosh:', error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting to fetch blessings from Sefaria...\n');
  
  // Ensure special directory exists
  const specialDir = path.join(__dirname, '..', 'content', 'special');
  if (!fs.existsSync(specialDir)) {
    fs.mkdirSync(specialDir, { recursive: true });
  }

  await fetchBirkatHaMazon();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await fetchBoreiNefashot();
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  await fetchMeeinShalosh();
  
  console.log('\n✅ All blessings fetched successfully!');
}

main().catch(console.error);
