# Shulchan Aruch Download Tool

Automated tool to download the complete Shulchan Aruch from Sefaria API.

## Usage

```bash
npm run fetch:sa
```

## What it does

1. Downloads all four sections of Shulchan Aruch:
   - **Orach Chayim** (697 simanim)
   - **Yoreh De'ah** (403 simanim)
   - **Even HaEzer** (178 simanim)
   - **Choshen Mishpat** (427 simanim)

2. Fetches Mechaber + Rema combined text from Sefaria

3. Converts to app's JSON format with:
   - Hebrew chapter labels
   - Cleaned text (no HTML tags)
   - Proper se'if numbering
   - Hebrew numeral conversion (with 15/16 special cases)

4. Writes files to `content/chapters/`:
   - `orach_chaim-001.json` through `orach_chaim-697.json`
   - `yoreh_deah-001.json` through `yoreh_deah-403.json`
   - `even_haezer-001.json` through `even_haezer-178.json`
   - `choshen_mishpat-001.json` through `choshen_mishpat-427.json`

5. Generates `content/manifest.json` with all chapter IDs

## API

Uses Sefaria's public API:
- Primary: v3 API (`/api/v3/texts/`)
- Fallback: v1 API (`/api/texts/`)

Respects API limits with 200ms delay between requests.

## License

The Shulchan Aruch text is in the public domain. Sefaria data is available under CC-BY-SA.
