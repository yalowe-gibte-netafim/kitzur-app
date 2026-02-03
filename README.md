# Kitzur Shulchan Aruch App

A fully functional React Native application for iPhone and Web that displays the Kitzur Shulchan Aruch in Hebrew, following Sephardic customs (Rabbi Ovadia Yosef / Yalkut Yosef style).

## Features

- 📱 Full support for iPhone (iOS) and Web platforms
- 🕍 Display of Kitzur Shulchan Aruch chapters and sections in Hebrew
- 📖 Sephardic customs and rulings (Yalkut Yosef style)
- 🎨 Clean, modern UI with Hebrew text support
- 📝 Detailed sections with Sephardic annotations

## Technologies

- React Native with Expo
- TypeScript
- React Native Web (for web support)

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the App

### Web
```bash
npm run web
```

### iOS (requires macOS)
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Project Structure

```
src/
├── components/     # React components (ChapterList, ChapterDetail)
├── screens/        # Screen components (HomeScreen, ChapterScreen)
├── data/          # Kitzur Shulchan Aruch content data
└── types/         # TypeScript type definitions
```

## Content

The app includes the following chapters (סימנים):

1. הלכות השכמת הבוקר - Laws of Waking Up in the Morning
2. הלכות ברכות השחר - Laws of Morning Blessings
3. הלכות ציצית - Laws of Tzitzit
4. הלכות תפילין - Laws of Tefillin
5. הלכות תפילה - Laws of Prayer

Each chapter includes:
- Hebrew text content
- Sephardic customs notes (following Yalkut Yosef)
- Section-by-section breakdown

## Sephardic Customs

The app follows Sephardic customs as codified by:
- Rabbi Ovadia Yosef zt"l
- Yalkut Yosef (יל"י)
- Maran's Shulchan Aruch

Special notes are highlighted in yellow boxes throughout the text to indicate specific Sephardic practices.

## License

This project is private and proprietary.
