// Setup file for Jest tests
// import '@testing-library/react-native/extend-expect';

// Disable Expo's winter import meta registry during tests
global.__ExpoImportMetaRegistry = undefined;
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

// Mock Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: (obj) => obj.ios || obj.default,
}));

// Mock chapter content for tests - must be before contentLoader import
const mockChapterRegistry = {
  'kitzur_orach_chaim-001': {
    id: 'kitzur_orach_chaim-001',
    chapterLabel: 'פרק א',
    title: 'הלכות השכמת הבוקר',
    category: 'אורח חיים',
    sections: [
      { id: 'section-1', section: 1, text: 'צריך להתגבר כארי לעמוד בבוקר לעבודת בוראו' },
      { id: 'section-2', section: 2, text: 'כשמתלבש יכוון שהוא מתעטף במצוות' }
    ],
    version: 1
  },
  'kitzur_orach_chaim-002': {
    id: 'kitzur_orach_chaim-002',
    chapterLabel: 'פרק ב',
    title: 'סדר נטילת ידים ברכת המוציא',
    category: 'אורח חיים',
    sections: [
      { id: 'section-1', section: 1, text: 'נטילת ידים שחרית' }
    ],
    version: 1
  }
};

jest.mock('../content/chapters-index', () => ({
  default: mockChapterRegistry
}), { virtual: true });

// Mock chapter IDs
jest.mock('../content/chapter-ids-only', () => ({
  chapterIds: ['kitzur_orach_chaim-001', 'kitzur_orach_chaim-002']
}), { virtual: true });

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Stack: {
    Screen: 'Screen',
  },
  Tabs: {
    Screen: 'Screen',
  },
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
  useFocusEffect: jest.fn(),
}));

// Mock expo modules
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
  getStringAsync: jest.fn(),
}));

jest.mock('expo-sharing', () => ({
  isAvailableAsync: jest.fn(() => Promise.resolve(true)),
  shareAsync: jest.fn(() => Promise.resolve()),
}));

// Mock react-native modules
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Silence console warnings during tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
