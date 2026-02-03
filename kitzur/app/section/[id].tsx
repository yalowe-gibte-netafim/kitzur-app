/**
 * Section Detail Screen
 * Displays the full text of a selected section with sharing and bookmark features
 */
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, Pressable, Share, Alert, View, Text } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { findSectionById, type Chapter, type Section } from '@/utils/contentLoader';
import { useApp } from '@/contexts/AppContext';
import { setLastRead } from '@/utils/storage';

export default function SectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const { addBookmark, removeBookmark, isBookmarked, getTextSizeMultiplier } = useApp();

  useEffect(() => {
    loadSection();
  }, [id]);

  async function loadSection() {
    if (!id) return;
    setLoading(true);
    const result = await findSectionById(id);
    if (result) {
      setChapter(result.chapter);
      setSection(result.section);
      // Save last read position
      await setLastRead(result.chapter.id, result.section.id);
    }
    setLoading(false);
  }

  async function handleBookmark() {
    if (!section || !chapter) return;
    
    const bookmarkId = section.id;
    
    if (isBookmarked(bookmarkId)) {
      await removeBookmark(bookmarkId);
      Alert.alert('הסרה', 'הסימניה הוסרה');
    } else {
      await addBookmark({
        id: bookmarkId,
        chapterId: chapter.id,
        sectionId: section.id,
        sectionNumber: section.section,
        chapterLabel: chapter.chapterLabel,
        chapterTitle: chapter.title,
        timestamp: Date.now(),
      });
      Alert.alert('נוסף', 'הסימניה נוספה בהצלחה');
    }
  }

  async function handleShare() {
    if (!section || !chapter) return;
    const text = `${chapter.chapterLabel} - ${chapter.title}\nסעיף ${section.section}\n\n${section.text}`;
    
    try {
      await Share.share({
        message: text,
        title: `${chapter.chapterLabel} - ${chapter.title}`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  }

  async function handleCopy() {
    if (!section || !chapter) return;
    const text = `${chapter.chapterLabel} - ${chapter.title}\nסעיף ${section.section}\n\n${section.text}`;
    await Clipboard.setStringAsync(text);
    Alert.alert('הועתק', 'הטקסט הועתק ללוח');
  }

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!section || !chapter) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>לא נמצא סעיף</ThemedText>
      </ThemedView>
    );
  }

  const textMultiplier = getTextSizeMultiplier();
  const bookmarked = isBookmarked(section.id);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.breadcrumb}>
          {chapter.chapterLabel}
        </ThemedText>
        <ThemedText style={styles.chapterTitle}>
          {chapter.title}
        </ThemedText>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>
        <ThemedText style={styles.sectionTitle}>
          סעיף {section.section}
        </ThemedText>
      </ThemedView>

      <View style={styles.contentCard}>
        <Text 
          style={[styles.text, { fontSize: 17 * textMultiplier }]}
        >
          {section.text}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable 
          style={styles.actionButton} 
          onPress={handleBookmark}
        >
          <Ionicons 
            name={bookmarked ? 'bookmark' : 'bookmark-outline'} 
            size={24} 
            color="#8B7BB8" 
          />
          <Text style={styles.actionText}>
            {bookmarked ? 'שמור' : 'שמור'}
          </Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#8B7BB8" />
          <Text style={styles.actionText}>שתף</Text>
        </Pressable>

        <Pressable style={styles.actionButton} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={24} color="#8B7BB8" />
          <Text style={styles.actionText}>העתק</Text>
        </Pressable>
      </View>
      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: '#8B7BB8',
  },
  breadcrumb: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 6,
    color: '#FFFFFF',
    fontWeight: '500',
    opacity: 0.9,
  },
  chapterTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dividerContainer: {
    marginVertical: 8,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  text: {
    lineHeight: 32,
    textAlign: 'right',
    color: '#000000',
    fontSize: 17,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
    minWidth: 80,
  },
  actionText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#8B7BB8',
  },
  footer: {
    height: 40,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#000000',
  },
});
