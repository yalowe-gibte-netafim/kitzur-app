# Kitzur Shulchan Aruch App - Visual Guide

## App Overview

This is a fully functional React Native application built with Expo that displays the Kitzur Shulchan Aruch in Hebrew with Sephardic customs (Yalkut Yosef style). The app works on both iPhone and Web platforms.

## Screenshots Description

### Home Screen
```
┌─────────────────────────────────────────┐
│                                         │
│   ╔═════════════════════════════════╗   │
│   ║    קיצור שולחן ערוך              ║   │
│   ║   מנהג ספרדים - על פי יל"י       ║   │
│   ╚═════════════════════════════════╝   │
│                                         │
│   ┌───────────────────────────────┐     │
│   │ הלכות השכמת הבוקר          [1]│     │
│   └───────────────────────────────┘     │
│                                         │
│   ┌───────────────────────────────┐     │
│   │ הלכות ברכות השחר           [2]│     │
│   └───────────────────────────────┘     │
│                                         │
│   ┌───────────────────────────────┐     │
│   │ הלכות ציצית                [3]│     │
│   └───────────────────────────────┘     │
│                                         │
│   ┌───────────────────────────────┐     │
│   │ הלכות תפילין               [4]│     │
│   └───────────────────────────────┘     │
│                                         │
│   ┌───────────────────────────────┐     │
│   │ הלכות תפילה                [5]│     │
│   └───────────────────────────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**
- Clean list view of all chapters
- Hebrew text displayed right-to-left
- Blue header with title and subtitle
- Numbered chapter badges
- Card-style layout with shadows
- Touch/click to navigate

### Chapter Detail Screen
```
┌─────────────────────────────────────────┐
│                                         │
│   [← חזרה]                             │
│                                         │
│   ╔═════════════════════════════════╗   │
│   ║ סימן 1                          ║   │
│   ║ הלכות השכמת הבוקר              ║   │
│   ╚═════════════════════════════════╝   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ סעיף 1                          │   │
│   │ התעוררות מהשינה                │   │
│   ├─────────────────────────────────┤   │
│   │ יתגבר כארי לעמוד בבוקר לעבודת  │   │
│   │ בוראו, והוא יעיר השחר. וצריך   │   │
│   │ להזהר מאוד בדבר זה...          │   │
│   │                                 │   │
│   │ ┌─────────────────────────────┐ │   │
│   │ │ 📖 הערה ספרדית (ע"פ יל"י): │ │   │
│   │ │ לפי מנהג הספרדים עפ"י      │ │   │
│   │ │ הרמב"ם והשלחן ערוך...      │ │   │
│   │ └─────────────────────────────┘ │   │
│   └─────────────────────────────────┘   │
│                                         │
│   ┌─────────────────────────────────┐   │
│   │ סעיף 2                          │   │
│   │ נטילת ידיים שחרית               │   │
│   ├─────────────────────────────────┤   │
│   │ מיד כשעומד משנתו, יטול ידיו    │   │
│   │ שלוש פעמים לסירוגין...         │   │
│   └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

**Features:**
- Back button for navigation
- Chapter header with number and title
- Sections with clear separation
- Hebrew text content
- Special Sephardic notes in yellow boxes
- Scrollable content

## Content Structure

### Chapters (סימנים)

The app includes 5 chapters with comprehensive content:

1. **הלכות השכמת הבוקר** - Laws of Waking Up in the Morning
   - 3 sections covering morning rituals
   - Sephardic customs for waking and hand washing
   
2. **הלכות ברכות השחר** - Laws of Morning Blessings
   - 3 sections on morning prayers
   - Sephardic traditions for blessings
   
3. **הלכות ציצית** - Laws of Tzitzit
   - 3 sections on wearing tzitzit
   - Sephardic rulings on the commandment
   
4. **הלכות תפילין** - Laws of Tefillin
   - 3 sections on tefillin placement
   - Sephardic customs for wearing tefillin
   
5. **הלכות תפילה** - Laws of Prayer
   - 3 sections on prayer times and intentions
   - Sephardic practices in prayer

### Sephardic Customs (מנהג ספרדים)

Each section includes special notes following:
- **Yalkut Yosef** (יל"י) - Rabbi Yitzchak Yosef
- **Rabbi Ovadia Yosef** rulings
- **Maran's Shulchan Aruch** (השלחן ערוך)

These notes are highlighted in yellow boxes with a book emoji (📖) for easy identification.

## Technical Features

### Platform Support
- ✅ **iOS (iPhone & iPad)** - Full native React Native support
- ✅ **Web** - React Native Web for browser access
- 📱 Responsive design for all screen sizes

### UI/UX Features
- 🎨 Modern, clean interface
- 📖 Hebrew RTL (right-to-left) text support
- 🎯 Easy navigation between chapters
- 📝 Clear section organization
- 💡 Highlighted Sephardic customs
- 🌈 Blue theme with good contrast

### Technical Stack
- **Framework:** React Native + Expo
- **Language:** TypeScript
- **Web Support:** react-native-web
- **Navigation:** Component-based navigation
- **Styling:** React Native StyleSheet

## Running the App

### Prerequisites
```bash
npm install
```

### Start Development Server
```bash
# For Web
npm run web

# For iOS (requires macOS with Xcode)
npm run ios

# For Android
npm run android
```

### Project Structure
```
kitzur-app/
├── App.tsx                    # Main app component
├── src/
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── data/
│   │   └── kitzurData.ts     # Hebrew content data
│   ├── components/
│   │   ├── ChapterList.tsx   # Chapter list component
│   │   └── ChapterDetail.tsx # Chapter detail view
│   └── screens/
│       ├── HomeScreen.tsx    # Home screen
│       └── ChapterScreen.tsx # Chapter screen
├── package.json
├── app.json                  # Expo configuration
└── tsconfig.json            # TypeScript configuration
```

## Data Content

All content is stored in `src/data/kitzurData.ts` as structured TypeScript data:

```typescript
{
  number: 1,
  title: 'הלכות השכמת הבוקר',
  sections: [
    {
      number: 1,
      title: 'התעוררות מהשינה',
      content: '...',
      sephardicNote: '...'
    }
  ]
}
```

## Future Enhancements

Possible additions:
- 🔍 Search functionality
- 🔖 Bookmarks and favorites
- 📅 Daily learning schedule
- 🌙 Dark mode
- 🔤 Font size adjustment
- 🌐 Multiple language support
- 📚 Additional halakhic sources
- 💾 Offline data caching

## License

Private and proprietary.

---

**Note:** This app is designed to help Jewish learners study Halakha according to Sephardic customs. All content follows the rulings of Rabbi Ovadia Yosef and Yalkut Yosef.
