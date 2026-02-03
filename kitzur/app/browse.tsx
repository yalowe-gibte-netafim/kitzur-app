/**
 * Browse Screen - Full chapter list
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ChapterList from '@/components/ChapterList';
import { listChapters, type Chapter } from '@/utils/contentLoader';
import { Colors, spacing } from '@/constants/theme';

export default function BrowseScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapters();
  }, []);

  async function loadChapters() {
    setLoading(true);
    const data = await listChapters();
    setChapters(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <ThemedView style={[styles.loadingContainer, { backgroundColor: colors.background.base }]}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <ThemedText style={[styles.loadingText, { color: colors.text.primary }]}>טוען...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>

      <ScrollView style={styles.scrollView}>
        <ChapterList chapters={chapters} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
  },
});
