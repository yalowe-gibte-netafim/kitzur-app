# Content Creation Guide

## Adding New Chapters

This guide explains how to add new chapters to the Kitzur Shulchan Aruch app.

## JSON Structure

Each chapter is stored as a JSON file in `content/chapters/`. The file must follow this exact structure:

```json
{
  "id": "siman-XXX",
  "chapterLabel": "סימן XXX",
  "title": "Chapter Title in Hebrew",
  "sections": [
    {
      "id": "siman-XXX-seif-001",
      "section": 1,
      "text": "Full Hebrew text of the section. Can be multiple paragraphs."
    },
    {
      "id": "siman-XXX-seif-002",
      "section": 2,
      "text": "Full Hebrew text of the second section."
    }
  ],
  "version": 1
}
```

## Field Descriptions

### Chapter Level

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (format: `siman-XXX`) |
| `chapterLabel` | string | Yes | Hebrew chapter number (e.g., "סימן א") |
| `title` | string | Yes | Hebrew title of the chapter |
| `sections` | array | Yes | Array of section objects |
| `version` | number | Yes | Version number (start with 1) |

### Section Level

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (format: `siman-XXX-seif-YYY`) |
| `section` | number | Yes | Section number (1, 2, 3, etc.) |
| `text` | string | Yes | Full Hebrew text of the section |

## Step-by-Step Guide

### 1. Create JSON File

Create a new file in `content/chapters/`:

```bash
touch content/chapters/siman-006.json
```

### 2. Add Chapter Content

Use the template above and fill in your content:

```json
{
  "id": "siman-006",
  "chapterLabel": "סימן ו",
  "title": "דיני נטילת ידיים",
  "sections": [
    {
      "id": "siman-006-seif-001",
      "section": 1,
      "text": "חובת נטילת ידיים שחרית היא מדאורייתא לפי כמה פוסקים. צריך ליטול את הידיים מיד כשקם משנתו, שלוש פעמים לסירוגין. לפי מנהג הספרדים, מברכים 'על נטילת ידיים' לאחר הנטילה."
    },
    {
      "id": "siman-006-seif-002",
      "section": 2,
      "text": "כמות המים צריכה להיות רביעית לכל יד. אם אין מים, ניתן להשתמש בשאר משקים כמו מיץ או יין. לפי רבנו עובדיה יוסף, במקרה של דוחק ניתן לנגב את הידיים במקום נטילה."
    },
    {
      "id": "siman-006-seif-003",
      "section": 3,
      "text": "לאחר נטילת ידיים אין לדבר עד גמר הברכה. יש להקפיד שלא יפסיק בין הנטילה לברכה, ובין הברכה לאמירת 'אשר יצר' ו'אלוהי נשמה'."
    }
  ],
  "version": 1
}
```

### 3. Register Chapter

Open `utils/contentLoader.ts` and add the new chapter ID to the array:

```typescript
const CHAPTER_IDS = [
  "siman-001",
  "siman-002",
  "siman-003",
  "siman-004",
  "siman-005",
  "siman-006", // Add your new chapter here
];
```

### 4. Verify Content

Restart the development server:
```bash
npm start -- --clear
```

Check that:
- [ ] New chapter appears in the home screen
- [ ] Chapter title displays correctly
- [ ] All sections are visible
- [ ] Hebrew text renders properly (RTL)
- [ ] Section navigation works
- [ ] Search finds content in new chapter

## Content Guidelines

### Hebrew Text

- Use proper Hebrew Unicode characters (not ASCII approximations)
- Include nikud (vowels) if desired
- Use correct Hebrew punctuation (מקף, פסיק, נקודה)
- Maintain right-to-left text direction

### Structure

- Keep sections reasonably sized (1-3 paragraphs)
- Break very long sections into subsections
- Use consistent numbering (1, 2, 3, not א, ב, ג)
- Maintain logical flow between sections

### Content Sources

Follow Sephardic customs based on:
- Rabbi Ovadia Yosef's rulings
- Yalkut Yosef
- Halichot Olam
- Other Sephardic poskim

### Quality Checklist

Before adding content:
- [ ] Verified Hebrew text accuracy
- [ ] Checked against authoritative sources
- [ ] Ensured proper JSON formatting
- [ ] Tested all sections load correctly
- [ ] Confirmed search finds content
- [ ] Verified share/bookmark functions work

## Example Chapters

### Short Chapter

```json
{
  "id": "siman-010",
  "chapterLabel": "סימן י",
  "title": "דיני תפילת מנחה",
  "sections": [
    {
      "id": "siman-010-seif-001",
      "section": 1,
      "text": "תפילת מנחה מתחילה מחצי שעה לאחר חצות היום ועד צאת הכוכבים."
    }
  ],
  "version": 1
}
```

### Long Chapter with Many Sections

```json
{
  "id": "siman-020",
  "chapterLabel": "סימן כ",
  "title": "הלכות שבת",
  "sections": [
    {
      "id": "siman-020-seif-001",
      "section": 1,
      "text": "שבת היא מצות עשה מן התורה..."
    },
    {
      "id": "siman-020-seif-002",
      "section": 2,
      "text": "זמן כניסת שבת הוא עם השקיעה..."
    },
    {
      "id": "siman-020-seif-003",
      "section": 3,
      "text": "יש להדליק נרות שבת לפני הכניסה..."
    }
    // ... many more sections
  ],
  "version": 1
}
```

## Bulk Content Import

If you have many chapters to add:

### 1. Prepare Content

Organize content in a spreadsheet with columns:
- Chapter Number
- Chapter Title
- Section Number
- Section Text

### 2. Convert to JSON

Use a script or online tool to convert CSV/Excel to JSON format.

Example Python script:

```python
import json
import pandas as pd

# Read Excel/CSV
df = pd.read_excel('chapters.xlsx')

# Group by chapter
for chapter_num, group in df.groupby('Chapter'):
    sections = []
    chapter_id = f"siman-{chapter_num:03d}"
    
    for _, row in group.iterrows():
        sections.append({
            "id": f"{chapter_id}-seif-{row['Section']:03d}",
            "section": row['Section'],
            "text": row['Text']
        })
    
    chapter_data = {
        "id": chapter_id,
        "chapterLabel": f"סימן {chapter_num}",
        "title": group.iloc[0]['Title'],
        "sections": sections,
        "version": 1
    }
    
    # Write JSON file
    with open(f'content/chapters/{chapter_id}.json', 'w', encoding='utf-8') as f:
        json.dump(chapter_data, f, ensure_ascii=False, indent=2)
```

### 3. Register All Chapters

Generate the chapter IDs array:

```python
chapter_ids = [f'"siman-{i:03d}"' for i in range(1, 221)]
print(f"const CHAPTER_IDS = [{', '.join(chapter_ids)}];")
```

Paste into `utils/contentLoader.ts`.

## Version Control

When updating content:

1. **Increment version number**:
   ```json
   "version": 2
   ```

2. **Document changes** in comments:
   ```json
   {
     "id": "siman-001",
     "version": 2,
     "_changelog": "Updated section 3 based on new ruling",
     ...
   }
   ```

3. **Keep backups** of previous versions

## Validation

### JSON Validator

Use online tool or command:
```bash
cat content/chapters/siman-006.json | python -m json.tool
```

### Content Validator Script

Create `scripts/validate-content.js`:

```javascript
const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, '../content/chapters');
const files = fs.readdirSync(chaptersDir);

files.forEach(file => {
  if (!file.endsWith('.json')) return;
  
  const content = fs.readFileSync(path.join(chaptersDir, file), 'utf8');
  const chapter = JSON.parse(content);
  
  // Validate structure
  console.assert(chapter.id, `Missing id in ${file}`);
  console.assert(chapter.chapterLabel, `Missing chapterLabel in ${file}`);
  console.assert(chapter.title, `Missing title in ${file}`);
  console.assert(Array.isArray(chapter.sections), `sections must be array in ${file}`);
  
  chapter.sections.forEach((section, i) => {
    console.assert(section.id, `Missing id in section ${i} of ${file}`);
    console.assert(typeof section.section === 'number', `section must be number in ${file}`);
    console.assert(section.text, `Missing text in section ${i} of ${file}`);
  });
  
  console.log(`✓ ${file} is valid`);
});
```

Run:
```bash
node scripts/validate-content.js
```

## Future Enhancements

Consider adding these fields:

```json
{
  "id": "siman-001",
  "chapterLabel": "סימן א",
  "title": "סדר השכמת הבוקר",
  "summary": "Optional brief summary",
  "tags": ["morning", "blessings", "waking"],
  "relatedChapters": ["siman-002", "siman-005"],
  "sources": [
    {
      "text": "יבי״א ח״א סימן כ",
      "url": "https://example.com"
    }
  ],
  "sections": [...],
  "version": 1
}
```

## Getting Help

For content-related questions:
- Check existing chapter files as examples
- Refer to Sephardic halakha sources
- Consult with Torah scholars for accuracy
- Test thoroughly before publishing

---

**Happy content creation!** 📚
