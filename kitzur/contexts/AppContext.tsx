/**
 * AppContext - Global state management for the Kitzur Shulchan Aruch app
 * Manages bookmarks, theme, text size, and other app-wide settings
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import * as storage from '@/utils/storage';
import type { Bookmark, ThemeMode, TextSize } from '@/utils/storage';

type AppContextType = {
  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  isBookmarked: (id: string) => boolean;
  refreshBookmarks: () => Promise<void>;

  // Theme
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  effectiveTheme: 'light' | 'dark';

  // Text Size
  textSize: TextSize;
  setTextSize: (size: TextSize) => Promise<void>;
  getTextSizeMultiplier: () => number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useNativeColorScheme();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [textSize, setTextSizeState] = useState<TextSize>('medium');

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    const [savedBookmarks, savedTheme, savedTextSize] = await Promise.all([
      storage.getBookmarks(),
      storage.getTheme(),
      storage.getTextSize(),
    ]);
    setBookmarks(savedBookmarks);
    setThemeModeState(savedTheme);
    setTextSizeState(savedTextSize);
  }

  // Bookmark management
  async function addBookmark(bookmark: Bookmark) {
    await storage.addBookmark(bookmark);
    await refreshBookmarks();
  }

  async function removeBookmark(id: string) {
    await storage.removeBookmark(id);
    await refreshBookmarks();
  }

  function isBookmarked(id: string): boolean {
    return bookmarks.some(b => b.id === id);
  }

  async function refreshBookmarks() {
    const updated = await storage.getBookmarks();
    setBookmarks(updated);
  }

  // Theme management
  async function setThemeMode(mode: ThemeMode) {
    await storage.setTheme(mode);
    setThemeModeState(mode);
  }

  const effectiveTheme: 'light' | 'dark' =
    themeMode === 'system'
      ? systemColorScheme || 'light'
      : themeMode;

  // Text size management
  async function setTextSize(size: TextSize) {
    await storage.setTextSize(size);
    setTextSizeState(size);
  }

  function getTextSizeMultiplier(): number {
    const multipliers = {
      small: 0.85,
      medium: 1.0,
      large: 1.2,
      xlarge: 1.4,
    };
    return multipliers[textSize];
  }

  const value: AppContextType = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refreshBookmarks,
    themeMode,
    setThemeMode,
    effectiveTheme,
    textSize,
    setTextSize,
    getTextSizeMultiplier,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Hook to access app context
 */
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
