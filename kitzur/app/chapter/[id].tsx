/**
 * Chapter Detail Screen
 * Displays the list of sections within a selected chapter
 */
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { getChapter, type Chapter } from '@/utils/contentLoader';
import SectionList from '@/components/SectionList';

export default function ChapterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapter();
  }, [id]);

  async function loadChapter() {
    if (!id) return;
    setLoading(true);
    const data = await getChapter(id);
    setChapter(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!chapter) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>לא נמצא פרק</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.chapterLabel}>
          {chapter.chapterLabel}
        </ThemedText>
        <ThemedText style={styles.title}>
          {chapter.title}
        </ThemedText>
      </ThemedView>
      <SectionList chapter={chapter} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 24,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#8B7BB8',
    borderBottomWidth: 0,
  },
  chapterLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 0,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 12,
  },
  sectionCountBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#007AFF',
  },
  sectionCountText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#8E8E93',
  },
});
