# 🚀 Quick Start: Fetch Shulchan Aruch

## Complete Workflow (3 Simple Steps)

### Step 1: Test API ✅
```bash
npm run test:sefaria
```

**Expected**: 
```
✅ API is accessible
✅ Script should work correctly!
```

---

### Step 2: Fetch Full Dataset 📚
```bash
npm run fetch:shulchan-aruch
```

**Time**: ~30-60 minutes  
**Output**: 4 JSON files in `data/shulchan_aruch/`
- `orach_chaim.json` (697 simanim, ~5 MB)
- `yoreh_deah.json` (403 simanim, ~3 MB)
- `even_haezer.json` (178 simanim, ~1 MB)
- `choshen_mishpat.json` (427 simanim, ~3 MB)

---

### Step 3: Convert to App Format (Optional) 🔄
```bash
# Convert one part at a time
npm run convert:shulchan-aruch orach_chaim
npm run convert:shulchan-aruch yoreh_deah
npm run convert:shulchan-aruch even_haezer
npm run convert:shulchan-aruch choshen_mishpat
```

**Output**: Individual JSON files in `content/<part>/siman-001.json`, etc.

---

## ⚡ One-Liner (All Parts)

```bash
npm run test:sefaria && \
npm run fetch:shulchan-aruch && \
npm run convert:shulchan-aruch orach_chaim && \
npm run convert:shulchan-aruch yoreh_deah && \
npm run convert:shulchan-aruch even_haezer && \
npm run convert:shulchan-aruch choshen_mishpat
```

---

## 📊 What You'll Get

| Part | Simanim | Topics | Size |
|------|---------|--------|------|
| **Orach Chaim** | 697 | Daily life, prayer, Shabbat | ~5 MB |
| **Yoreh De'ah** | 403 | Kashrut, charity, mourning | ~3 MB |
| **Even HaEzer** | 178 | Marriage, divorce, family | ~1 MB |
| **Choshen Mishpat** | 427 | Civil law, courts | ~3 MB |
| **TOTAL** | **1,705** | Complete Shulchan Aruch | **~12 MB** |

---

## 🎯 Progress Example

```
╔════════════════════════════════════════════════════════════╗
║   Shulchan Aruch (Maran) Data Fetcher                     ║
║   Source: Sefaria.org API (Public Domain)                 ║
╚════════════════════════════════════════════════════════════╝

📖 Fetching Orach Chaim...
   Slug: Shulchan_Arukh,_Orach_Chayim
  Fetching Siman 1...
    ✓ Siman 1 (9 seifim)
  Fetching Siman 2...
    ✓ Siman 2 (8 seifim)
  ...
✓ Orach Chaim: Fetched 697 simanim
   💾 Saved: orach_chaim.json (5.23 MB)

╔════════════════════════════════════════════════════════════╗
║                     SUMMARY                                ║
╚════════════════════════════════════════════════════════════╝

   ✓ Orach Chaim          697 simanim → orach_chaim.json
   ✓ Yoreh De'ah          403 simanim → yoreh_deah.json
   ✓ Even HaEzer          178 simanim → even_haezer.json
   ✓ Choshen Mishpat      427 simanim → choshen_mishpat.json

   Total: 1705 simanim fetched in 45.2 minutes
   Output directory: data/shulchan_aruch

✅ Complete! All files generated successfully.
```

---

## 🔍 Verify Output

```bash
# List generated files
ls -lh data/shulchan_aruch/

# Check JSON structure
cat data/shulchan_aruch/orach_chaim.json | head -50

# Count simanim
cat data/shulchan_aruch/orach_chaim.json | jq '.simanim | length'
```

---

## ⚖️ Legal Notice

**Source**: Shulchan Aruch by Rabbi Yosef Karo (1488-1575)  
**Published**: 1565  
**Status**: ✅ **Public Domain**  
**Confirmation**: [Wikisource](https://en.wikisource.org/wiki/Translation:Shulchan_Aruch)

The author died over 100 years ago and the work predates 1931 copyright laws.

---

## 📚 Full Documentation

- **Complete Guide**: [README_SHULCHAN_ARUCH.md](./README_SHULCHAN_ARUCH.md)
- **Scripts Overview**: [README.md](./README.md)
- **Setup Details**: [SETUP_COMPLETE.md](./SETUP_COMPLETE.md)

---

## 🐛 Troubleshooting

### Network Error
```bash
# Test connectivity
npm run test:sefaria
```

### Out of Memory
```bash
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=4096" npm run fetch:shulchan-aruch
```

### Partial Download
Just re-run the script - it will continue from where it stopped.

---

## 🎉 That's It!

You now have the **complete Shulchan Aruch (Maran)** ready to integrate into your app!

**Questions?** Check the full documentation or open an issue on GitHub.

---

**Last Updated**: February 2026  
**Status**: ✅ Ready to use
