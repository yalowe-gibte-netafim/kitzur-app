/**
 * Home Screen - Main entry point showing list of chapters
 */
import { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import ChapterList from '@/components/ChapterList';
import { listChapters, type Chapter } from '@/utils/contentLoader';

export default function HomeScreen() {
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
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText style={styles.loadingText}>טוען...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>קיצור שולחן ערוך</ThemedText>
        <ThemedText style={styles.subtitle}>נוסח עדות המזרח</ThemedText>
        <View style={styles.divider} />
      </ThemedView>
      <ChapterList chapters={chapters} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 16,
    color: '#000000',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#8B7BB8',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 0,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
});
