/**
 * Explore Screen - Search, Bookmarks, and Settings
 */
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, View, TextInput, ActivityIndicator, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useApp } from '@/contexts/AppContext';
import { searchContent } from '@/utils/contentLoader';
import { resetAllProgress } from '@/utils/progress';
import { getDeviceId, resetDeviceId } from '@/utils/deviceId';
import { Colors, spacing } from '@/constants/theme';

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
  const [deviceId, setDeviceId] = useState<string>('');
  const { bookmarks, textSize, setTextSize, themeMode, setThemeMode, effectiveTheme } = useApp();

  useEffect(() => {
    loadDeviceId();
  }, []);

  async function loadDeviceId() {
    const id = await getDeviceId();
    setDeviceId(id);
  }

  async function handleResetRatings() {
    Alert.alert(
      'איפוס דירוגים',
      'פעולה זו תאפס את כל הדירוגים שנתת לתשובות. תוכל לדרג מחדש את כל השאלות. האם להמשיך?',
      [
        {
          text: 'ביטול',
          style: 'cancel',
        },
        {
          text: 'אפס דירוגים',
          style: 'destructive',
          onPress: async () => {
            const newId = await resetDeviceId();
            setDeviceId(newId);
            Alert.alert('הושלם', 'הדירוגים אופסו בהצלחה. תוכל לדרג מחדש את השאלות.');
          },
        },
      ]
    );
  }

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

  async function handleResetProgress() {
    Alert.alert(
      'איפוס התקדמות',
      'האם אתה בטוח שברצונך לאפס את כל ההתקדמות? פעולה זו תמחק את כל הסימנים שסומנו כהושלמו, את מיקום הקריאה האחרון ואת רצף הלימוד היומי.',
      [
        {
          text: 'ביטול',
          style: 'cancel',
        },
        {
          text: 'אפס',
          style: 'destructive',
          onPress: async () => {
            await resetAllProgress();
            Alert.alert('הושלם', 'ההתקדמות אופסה בהצלחה');
          },
        },
      ]
    );
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
          למען שמו באהבה{'\n'}
          קיצור שולחן ערוך + ברכות ותפילות{'\n'}
          גרסה 1.2.0
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          ניהול נתונים
        </ThemedText>
        
        {/* Device ID Info */}
        <View style={styles.deviceIdContainer}>
          <ThemedText style={styles.deviceIdLabel}>
            📱 מזהה מכשיר (למניעת דירוג כפול)
          </ThemedText>
          <ThemedText style={styles.deviceIdText} numberOfLines={1}>
            {deviceId || 'טוען...'}
          </ThemedText>
          <ThemedText style={styles.deviceIdNote}>
            מזהה ייחודי שנוצר אוטומטית למניעת דירוג כפול של אותה תשובה
          </ThemedText>
        </View>

        {/* Reset Ratings Button */}
        <Pressable 
          style={styles.resetButton}
          onPress={handleResetRatings}
        >
          <Ionicons name="star-outline" size={20} color={Colors.light.semantic.warning} />
          <ThemedText style={[styles.resetButtonText, { color: Colors.light.semantic.warning }]}>
            אפס את כל הדירוגים (שאלות ותשובות)
          </ThemedText>
        </Pressable>
        <ThemedText style={styles.resetWarning}>
          תוכל לדרג מחדש את כל השאלות אחרי האיפוס
        </ThemedText>

        {/* Reset Progress Button */}
        <Pressable 
          style={[styles.resetButton, { marginTop: 12 }]}
          onPress={handleResetProgress}
        >
          <Ionicons name="refresh" size={20} color={Colors.light.semantic.error} />
          <ThemedText style={styles.resetButtonText}>
            אפס את כל ההתקדמות
          </ThemedText>
        </Pressable>
        <ThemedText style={styles.resetWarning}>
          פעולה זו תמחק את כל הסימנים שסומנו כהושלמו ואת רצף הלימוד היומי
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background.base,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border.default,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    textAlign: 'right',
    color: Colors.light.text.primary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Colors.light.background.surface,
    borderWidth: 1,
    borderColor: Colors.light.border.default,
  },
  searchIcon: {
    marginLeft: 8,
    color: Colors.light.text.secondary,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: Colors.light.text.primary,
  },
  loadingContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  resultsContainer: {
    marginTop: 12,
  },
  resultItem: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: Colors.light.background.surface,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border.default,
  },
  resultChapter: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: Colors.light.primary.main,
  },
  resultSection: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.light.text.secondary,
  },
  resultText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.light.text.primary,
  },
  bookmarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: Colors.light.background.surface,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border.default,
  },
  bookmarkContent: {
    flex: 1,
  },
  bookmarkChapter: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: Colors.light.text.primary,
  },
  bookmarkSection: {
    fontSize: 14,
    color: Colors.light.text.secondary,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border.default,
    backgroundColor: Colors.light.background.surface,
  },
  optionButtonActive: {
    backgroundColor: Colors.light.primary.main,
    borderColor: Colors.light.primary.main,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text.primary,
  },
  optionTextActive: {
    color: Colors.light.text.onPrimary,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    padding: spacing.lg,
    color: Colors.light.text.secondary,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    color: Colors.light.text.primary,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    backgroundColor: Colors.light.semantic.error + '15',
    borderWidth: 1,
    borderColor: Colors.light.semantic.error,
    gap: 8,
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.semantic.error,
  },
  resetWarning: {
    fontSize: 12,
    color: Colors.light.text.secondary,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  deviceIdContainer: {
    padding: spacing.md,
    borderRadius: 8,
    backgroundColor: Colors.light.background.surface,
    borderWidth: 1,
    borderColor: Colors.light.border.default,
    marginBottom: 16,
  },
  deviceIdLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.text.primary,
    marginBottom: 8,
  },
  deviceIdText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: Colors.light.primary.main,
    backgroundColor: Colors.light.primary.light,
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  deviceIdNote: {
    fontSize: 11,
    color: Colors.light.text.secondary,
    fontStyle: 'italic',
    lineHeight: 16,
  },
});
