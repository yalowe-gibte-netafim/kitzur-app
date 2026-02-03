# 🎉 Shulchan Aruch Fetcher - Setup Complete!

## ✅ What's Been Created

### 1. Main Fetcher Script
**File**: [`scripts/fetch_shulchan_aruch.js`](./fetch_shulchan_aruch.js)

A production-ready Node.js script that:
- ✅ Fetches all 4 parts of Shulchan Aruch from Sefaria API
- ✅ Cleans HTML and normalizes text
- ✅ Structures data into mobile-friendly JSON
- ✅ Includes retry logic, rate limiting, and validation
- ✅ Automatically handles missing simanim
- ✅ Progress logging with detailed output

### 2. API Test Script
**File**: [`scripts/test_sefaria_api.js`](./test_sefaria_api.js)

Quick connectivity test to verify:
- Sefaria API is accessible
- Data format is correct
- Network connection works

### 3. Documentation
- **[README_SHULCHAN_ARUCH.md](./README_SHULCHAN_ARUCH.md)** - Complete guide for the fetcher
- **[README.md](./README.md)** - Overview of all scripts

### 4. NPM Scripts
Added to `package.json`:
```json
{
  "scripts": {
    "fetch:shulchan-aruch": "node ./scripts/fetch_shulchan_aruch.js",
    "test:sefaria": "node ./scripts/test_sefaria_api.js"
  }
}
```

### 5. Dependencies Installed
- `axios` - HTTP client
- `sanitize-html` - Text cleaning

---

## 🚀 How to Use

### Step 1: Test API Connection
```bash
npm run test:sefaria
```

Expected output:
```
🧪 Testing Sefaria API connectivity...
✅ API is accessible
   Siman 1 has 9 seifim
✅ Script should work correctly!
```

### Step 2: Fetch Full Dataset
```bash
npm run fetch:shulchan-aruch
```

**Time**: ~30-60 minutes (1,705 total simanim)  
**Output**: 4 JSON files in `data/shulchan_aruch/`

### Step 3: Check Output
```bash
ls -lh data/shulchan_aruch/
```

Expected files:
- `orach_chaim.json` (~5 MB)
- `yoreh_deah.json` (~3 MB)
- `even_haezer.json` (~1 MB)
- `choshen_mishpat.json` (~3 MB)

---

## 📊 Data Coverage

| Part | Simanim | Topics |
|------|---------|--------|
| **Orach Chaim** | ~697 | Daily prayers, Shabbat, holidays |
| **Yoreh De'ah** | ~403 | Kashrut, charity, mourning |
| **Even HaEzer** | ~178 | Marriage, divorce, family |
| **Choshen Mishpat** | ~427 | Civil law, courts, damages |
| **TOTAL** | **~1,705** | Complete Shulchan Aruch |

---

## 🎯 Features Implemented

### Robustness
- ✅ Automatic retry on network failures (3 attempts)
- ✅ Smart stopping after 5 consecutive 404s
- ✅ Timeout handling (10 seconds per request)
- ✅ User-Agent header (identifies as educational)

### Performance
- ✅ Rate limiting: 500ms between requests (respectful)
- ✅ 2-second pause between different parts
- ✅ Efficient memory usage
- ✅ Streaming JSON writes

### Data Quality
- ✅ HTML stripping (clean Hebrew text)
- ✅ Whitespace normalization
- ✅ Empty paragraph filtering
- ✅ Structure validation
- ✅ Integrity checks

### User Experience
- ✅ Real-time progress logging
- ✅ Colored console output
- ✅ Summary statistics
- ✅ Error messages with suggestions

---

## 📝 JSON Structure Example

```json
{
  "meta": {
    "work": "Shulchan Aruch (Maran)",
    "part": "Orach Chaim",
    "source": "Sefaria API + Wikisource",
    "license": "Public Domain",
    "language": "he",
    "version": "1.0.0",
    "generated_at": "2026-02-03T12:00:00.000Z",
    "total_simanim": 697
  },
  "simanim": {
    "1": {
      "title": "סימן א",
      "hebrewTitle": "דין השכמת הבוקר",
      "seifim": [
        {
          "n": 1,
          "text": "יתגבר כארי לעמוד בבוקר לעבודת בוראו שיהא הוא מעורר השחר..."
        },
        {
          "n": 2,
          "text": "אינו חייב לומר מודה אני מיד כשניעור משנתו..."
        }
      ]
    }
  }
}
```

---

## ⚖️ Legal & Attribution

### Public Domain Confirmation
- **Work**: Shulchan Aruch by Rabbi Yosef Karo (1488-1575)
- **Published**: 1565
- **Status**: Public Domain (author died >100 years ago, predates 1931)
- **Source**: Sefaria.org (William Davidson Edition)
- **Reference**: [Wikisource](https://en.wikisource.org/wiki/Translation:Shulchan_Aruch)

### Script License
- MIT License (this repository)

---

## 🔧 Advanced Options

### Customize Configuration
Edit the `CONFIG` object in `fetch_shulchan_aruch.js`:

```javascript
const CONFIG = {
  requestDelay: 500,        // ms between requests
  maxRetries: 3,            // retry attempts
  consecutiveFailuresBeforeStop: 5, // when to stop
  expectedSimanim: { ... }  // known maximums
};
```

### Increase Memory (if needed)
```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run fetch:shulchan-aruch
```

### Fetch Single Part Only
Edit the script and comment out unwanted parts in `CONFIG.parts` array.

---

## 🐛 Troubleshooting

### Script hangs
- Check internet connection
- Verify Sefaria.org is accessible: https://www.sefaria.org
- Try again later (API may be busy)

### Missing simanim
- Normal - some simanim don't exist in Sefaria's database
- Script automatically skips and continues

### JSON validation errors
- Re-run the script
- Check console for specific error messages
- Report persistent issues on GitHub

---

## 📚 Next Steps

1. **Run the fetcher** to get the complete dataset
2. **Integrate with app** - Update `utils/contentLoader.ts` to load Shulchan Aruch
3. **Add UI** - Create new tabs/screens for browsing Shulchan Aruch
4. **Search** - Extend search functionality to include Shulchan Aruch
5. **Bookmarks** - Enable bookmarking of seifim

---

## 📞 Support

- **Documentation**: [README_SHULCHAN_ARUCH.md](./README_SHULCHAN_ARUCH.md)
- **API Docs**: https://github.com/Sefaria/Sefaria-Project/wiki/API-Documentation
- **Issues**: Open on GitHub
- **Sefaria**: https://www.sefaria.org

---

**Created**: February 2026  
**Status**: ✅ Ready to use  
**Tested**: ✅ API connectivity verified

**Happy learning! 📚✨**
