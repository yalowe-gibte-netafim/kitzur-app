# Kitzur Shulchan Aruch - React Native & Web App

A fully functional application for displaying the complete Kitzur Shulchan Aruch in Hebrew, following Sephardic customs (Rabbi Ovadia Yosef / Yalkut Yosef style).

## Features

### ✅ Implemented Features

1. **Content Management**
   - Load content from local JSON files
   - Structured by chapters, sections, and subsections
   - Easy to extend with more content
   - 5 sample chapters included

2. **User Interface**
   - Home screen with chapter list
   - Chapter detail screen with sections
   - Section detail screen with full text
   - Clean, readable Hebrew font with RTL support
   - Dark Mode / Light Mode toggle (automatic, light, dark)
   - Responsive design for Web and iPhone
   - Tab-based navigation

3. **Navigation Features**
   - Back/forward navigation between sections and chapters
   - Search functionality across all chapters and sections
   - Bookmarks/favorites system with persistent storage
   - Quick navigation from bookmarks to sections

4. **Performance and Usability**
   - Smooth scrolling for long sections
   - Efficient content loading
   - Offline support (AsyncStorage for mobile, localStorage for web)
   - Fast search with match scoring

5. **Additional Features**
   - Share sections via native share dialog (WhatsApp, email, etc.)
   - Copy text to clipboard
   - Text scaling for accessibility (small, medium, large, xlarge)
   - Modular component architecture
   - Context API for global state management
   - TypeScript for type safety

## Tech Stack

- **React Native**: 0.81.5 (for iOS and Android)
- **Expo**: ~54.0 (for unified development)
- **React**: 19.1.0 (for Web)
- **Expo Router**: ~6.0 (file-based routing)
- **TypeScript**: ~5.9
- **AsyncStorage**: 2.1.2 (persistent storage)

## Project Structure

```
kitzur/
├── app/                        # Main application screens
│   ├── _layout.tsx            # Root layout with AppProvider
│   ├── (tabs)/                # Tab navigation
│   │   ├── _layout.tsx        # Tab layout configuration
│   │   ├── index.tsx          # Home screen (chapter list)
│   │   └── explore.tsx        # Search, bookmarks, settings
│   ├── chapter/[id].tsx       # Chapter detail screen
│   └── section/[id].tsx       # Section detail screen
├── components/                 # Reusable UI components
│   ├── ChapterList.tsx        # Chapter list component
│   ├── SectionList.tsx        # Section list component
│   ├── SearchBar.tsx          # Search input component
│   ├── DarkModeToggle.tsx     # Theme toggle component
│   ├── themed-text.tsx        # Themed text component
│   └── themed-view.tsx        # Themed view component
├── contexts/                   # React Context for state management
│   └── AppContext.tsx         # Global app state (bookmarks, theme, text size)
├── content/                    # Content JSON files
│   └── chapters/              # Chapter files
│       ├── siman-001.json     # Morning blessings
│       ├── siman-002.json     # Tzitzit laws
│       ├── siman-003.json     # Tefillin laws
│       ├── siman-004.json     # Torah blessings
│       └── siman-005.json     # Morning prayer
├── utils/                      # Utility functions
│   ├── contentLoader.ts       # Load and search content
│   ├── storage.ts             # Persistent storage (bookmarks, settings)
│   └── hebrewNormalize.ts     # Hebrew text normalization
├── constants/                  # App constants
│   └── theme.ts               # Theme configuration
├── package.json               # Dependencies
├── app.json                   # Expo configuration
└── tsconfig.json              # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS: macOS with Xcode
- For Android: Android Studio

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd /workspaces/kitzur-app/kitzur
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

### Running on Different Platforms

#### iPhone (iOS)
```bash
npm run ios
```
Or press `i` in the Expo terminal.

Requirements:
- macOS with Xcode installed
- iOS Simulator or physical device with Expo Go app

#### Android
```bash
npm run android
```
Or press `a` in the Expo terminal.

Requirements:
- Android Studio with Android SDK
- Android Emulator or physical device with Expo Go app

#### Web
```bash
npm run web
```
Or press `w` in the Expo terminal.

Opens in your default browser at `http://localhost:8081`

## Content Structure

### JSON Format

Each chapter is a JSON file in `content/chapters/`:

```json
{
  "id": "siman-001",
  "chapterLabel": "סימן א",
  "title": "סדר השכמת הבוקר וברכות השחר",
  "sections": [
    {
      "id": "siman-001-seif-001",
      "section": 1,
      "text": "Full Hebrew text of the section..."
    },
    {
      "id": "siman-001-seif-002",
      "section": 2,
      "text": "Full Hebrew text of the section..."
    }
  ],
  "version": 1
}
```

### Adding New Content

1. **Create a new chapter file**:
   ```bash
   touch content/chapters/siman-006.json
   ```

2. **Add the chapter data** following the JSON format above

3. **Register the chapter** in `utils/contentLoader.ts`:
   ```typescript
   const CHAPTER_IDS = [
     "siman-001",
     "siman-002",
     "siman-003",
     "siman-004",
     "siman-005",
     "siman-006", // Add new chapter ID
   ];
   ```

4. **Content will automatically appear** in the app on next reload

### Content Guidelines

- Use proper Hebrew Unicode characters
- Keep section IDs unique across all chapters
- Follow the format: `{chapterId}-seif-{sectionNumber}`
- Add version numbers for future updates
- Include all relevant Sephardic customs and rulings

## Key Features Implementation

### 1. Search Functionality

The search feature:
- Searches across all chapters and sections
- Matches text in section content, chapter titles, and labels
- Scores matches for relevance
- Returns top 20 results
- Real-time search as you type

Located in: `utils/contentLoader.ts` → `searchContent()`

### 2. Bookmarks System

Users can:
- Save sections for later reading
- Access bookmarks from the Explore tab
- Remove bookmarks with a tap
- Bookmarks persist across app restarts

Stored in: AsyncStorage (mobile) or localStorage (web)
Managed by: `contexts/AppContext.tsx` and `utils/storage.ts`

### 3. Dark Mode

Three themes available:
- **Light**: Always light theme
- **Dark**: Always dark theme
- **System**: Follows device settings (default)

Toggle in Explore tab → "ערכת צבעים"

### 4. Text Scaling

Four text sizes:
- **Small** (קטן): 0.85x
- **Medium** (בינוני): 1.0x (default)
- **Large** (גדול): 1.2x
- **X-Large** (גדול מאוד): 1.4x

Adjust in Explore tab → "גודל טקסט"

### 5. Share & Copy

On section detail screen:
- **Share button**: Opens native share dialog
- **Copy button**: Copies section text to clipboard
- Includes chapter and section labels for context

### 6. RTL Support

- Right-to-left layout enabled globally
- Hebrew text properly aligned
- Navigation flows right-to-left
- Fully compatible with Hebrew keyboards

## iOS Deployment

### Configuration

Update `app.json`:
```json
{
  "expo": {
    "name": "Kitzur Shulchan Aruch",
    "slug": "kitzur-shulchan-aruch",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yalkutyosef.kitzur",
      "buildNumber": "1",
      "supportsTablet": true
    }
  }
}
```

### Build for iOS

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**:
   ```bash
   eas login
   ```

3. **Configure build**:
   ```bash
   eas build:configure
   ```

4. **Build for iOS**:
   ```bash
   eas build --platform ios
   ```

5. **Submit to App Store**:
   ```bash
   eas submit --platform ios
   ```

### TestFlight

After building, download the `.ipa` file and upload to App Store Connect for TestFlight distribution.

## Web Deployment

### Build for Production

```bash
npm run web:export
```

This creates a static export in `web-build/`.

### Deployment Options

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run web:export`
3. Set publish directory: `web-build`

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### PWA Support

The app can be installed as a Progressive Web App (PWA) on supported browsers.

To enhance PWA features, add:
- Service worker for offline caching
- Web app manifest (already configured in `app.json`)
- App icons for home screen

## Development Guidelines

### Adding New Features

1. **Create feature branch**:
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes** following existing code patterns

3. **Test on all platforms**:
   - iOS Simulator
   - Android Emulator
   - Web Browser

4. **Update documentation**

5. **Submit pull request**

### Code Style

- Use TypeScript for type safety
- Follow existing component patterns
- Add comments for complex logic
- Use functional components with hooks
- Keep components modular and reusable

### Testing

```bash
npm run lint        # Check code style
npm run test        # Run tests (if configured)
```

## Roadmap / Future Enhancements

### Planned Features

1. **Daily Learning Mode**
   - Schedule daily sections
   - Progress tracking
   - Notifications

2. **Commentary & Footnotes**
   - Add detailed explanations
   - Source references
   - Cross-references between sections

3. **Audio Playback**
   - Section narration
   - Pronunciation guide
   - Downloadable audio files

4. **Advanced Search**
   - Filter by chapter
   - Hebrew root search
   - Search history

5. **User Notes**
   - Personal annotations
   - Highlight text
   - Export notes

6. **Multi-language Support**
   - English translations
   - Transliterations
   - Side-by-side view

7. **Offline-first Architecture**
   - Download all content for offline use
   - Sync across devices
   - Background updates

8. **Social Features**
   - Share study progress
   - Study groups
   - Discussion forums

## Troubleshooting

### Common Issues

**Issue**: App not starting
```bash
# Clear cache
npm start -- --clear

# Reinstall dependencies
rm -rf node_modules
npm install
```

**Issue**: RTL not working
- Check `I18nManager.forceRTL(true)` in `app/_layout.tsx`
- Restart the development server

**Issue**: Content not loading
- Verify JSON files are valid
- Check chapter IDs in `contentLoader.ts`
- Look for console errors

**Issue**: AsyncStorage errors on web
- The app uses localStorage for web, which should work automatically
- Clear browser cache if issues persist

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Content Contributions

To contribute additional chapters or corrections:

1. Follow the JSON structure exactly
2. Verify Hebrew text accuracy
3. Include sources (Rabbi Ovadia Yosef, Yalkut Yosef)
4. Test on mobile and web

## License

This project is for educational and religious purposes.

Content is based on Kitzur Shulchan Aruch following Sephardic traditions as ruled by Rabbi Ovadia Yosef זצ"ל.

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Contact the development team
- Check existing documentation

## Acknowledgments

- **Rabbi Ovadia Yosef זצ"ל**: For his comprehensive halakhic rulings
- **Yalkut Yosef**: Primary source for Sephardic customs
- **Contributors**: Everyone who helped build and improve this app

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Platform**: iOS, Android, Web  
**Framework**: React Native + Expo

---

## Quick Reference

### Start Development
```bash
cd /workspaces/kitzur-app/kitzur
npm install
npm start
```

### Build for Production
```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Web
npm run web:export
```

### Add Content
1. Create `content/chapters/siman-XXX.json`
2. Add ID to `utils/contentLoader.ts`
3. Reload app

### Update Styles
- Modify `constants/theme.ts`
- Update component styles
- Test dark and light modes

---

**Built with ❤️ for Torah learning**
