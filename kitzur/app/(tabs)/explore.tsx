/**
 * Explore Screen - Search, Bookmarks, and Settings
 */
import { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, View, TextInput, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { searchContent } from '@/utils/contentLoader';

type SearchResult = {
  chapter: any;
  section: any;
  matchScore: number;
};

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(true);
  const { bookmarks, textSize, setTextSize, themeMode, setThemeMode, effectiveTheme } = useApp();

  async function handleSearch(query: string) {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setShowBookmarks(true);
      return;
    }
    
    setSearching(true);
    const results = await searchContent(query);
    setSearchResults(results);
    setSearching(false);
    setShowBookmarks(false);
  }

  function navigateToSection(sectionId: string) {
    router.push(`/section/${sectionId}`);
  }

  const textSizes: Array<{ value: typeof textSize; label: string }> = [
    { value: 'small', label: 'קטן' },
    { value: 'medium', label: 'בינוני' },
    { value: 'large', label: 'גדול' },
    { value: 'xlarge', label: 'גדול מאוד' },
  ];

  const themes: Array<{ value: typeof themeMode; label: string }> = [
    { value: 'light', label: 'בהיר' },
    { value: 'dark', label: 'כהה' },
    { value: 'system', label: 'אוטומטי' },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          חיפוש
        </ThemedText>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="חפש בטקסט..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {searching && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" />
          </View>
        )}

        {searchResults.length > 0 && (
          <View style={styles.resultsContainer}>
            {searchResults.slice(0, 20).map((result, index) => (
              <Pressable
                key={index}
                style={styles.resultItem}
                onPress={() => navigateToSection(result.section.id)}
              >
                <ThemedText style={styles.resultChapter}>
                  {result.chapter.chapterLabel} - {result.chapter.title}
                </ThemedText>
                <ThemedText style={styles.resultSection}>
                  סעיף {result.section.section}
                </ThemedText>
                <ThemedText style={styles.resultText} numberOfLines={2}>
                  {result.section.text}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        )}
      </ThemedView>

      {showBookmarks && (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            סימניות ({bookmarks.length})
          </ThemedText>
          {bookmarks.length === 0 ? (
            <ThemedText style={styles.emptyText}>אין סימניות שמורות</ThemedText>
          ) : (
            bookmarks.map((bookmark) => (
              <Pressable
                key={bookmark.id}
                style={styles.bookmarkItem}
                onPress={() => navigateToSection(bookmark.sectionId)}
              >
                <View style={styles.bookmarkContent}>
                  <ThemedText style={styles.bookmarkChapter}>
                    {bookmark.chapterLabel} - {bookmark.chapterTitle}
                  </ThemedText>
                  <ThemedText style={styles.bookmarkSection}>
                    סעיף {bookmark.sectionNumber}
                  </ThemedText>
                </View>
                <Ionicons name="bookmark" size={20} color="#FFD700" />
              </Pressable>
            ))
          )}
        </ThemedView>
      )}

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          גודל טקסט
        </ThemedText>
        <View style={styles.optionsRow}>
          {textSizes.map((size) => (
            <Pressable
              key={size.value}
              style={[
                styles.optionButton,
                textSize === size.value && styles.optionButtonActive,
              ]}
              onPress={() => setTextSize(size.value)}
            >
              <ThemedText
                style={[
                  styles.optionText,
                  textSize === size.value && styles.optionTextActive,
                ]}
              >
                {size.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          ערכת צבעים
        </ThemedText>
        <View style={styles.optionsRow}>
          {themes.map((theme) => (
            <Pressable
              key={theme.value}
              style={[
                styles.optionButton,
                themeMode === theme.value && styles.optionButtonActive,
              ]}
              onPress={() => setThemeMode(theme.value)}
            >
              <ThemedText
                style={[
                  styles.optionText,
                  themeMode === theme.value && styles.optionTextActive,
                ]}
              >
                {theme.label}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          אודות
        </ThemedText>
        <ThemedText style={styles.aboutText}>
          קיצור שולחן ערוך לפי מנהג הספרדים{'\n'}
          מבוסס על פסקי הרב עובדיה יוסף זצ"ל{'\n'}
          גרסה 1.0.0
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
    color: '#000000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    marginLeft: 8,
    color: '#999999',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: '#000000',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  resultsContainer: {
    marginTop: 12,
  },
  resultItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  resultChapter: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#007AFF',
  },
  resultSection: {
    fontSize: 14,
    marginBottom: 6,
    color: '#666666',
  },
  resultText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  bookmarkContent: {
    flex: 1,
  },
  bookmarkChapter: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000000',
  },
  bookmarkSection: {
    fontSize: 14,
    color: '#666666',
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  optionButtonActive: {
    backgroundColor: '#8B7BB8',
    borderColor: '#8B7BB8',
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    padding: 20,
    color: '#999999',
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000000',
  },
});
