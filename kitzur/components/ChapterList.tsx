/**
 * ChapterList Component
 * Displays a list of chapters on the home screen
 */
import { Link } from "expo-router";
import { View, Pressable, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { Chapter } from "../utils/contentLoader";
import { useApp } from "@/contexts/AppContext";

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
  const { getTextSizeMultiplier } = useApp();
  const textMultiplier = getTextSizeMultiplier();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.listContainer}>
        {chapters.map((ch, index) => (
          <Link key={ch.id} href={`/chapter/${ch.id}`} asChild>
            <Pressable 
              style={({ pressed }) => [
                styles.chapterCard,
                pressed && styles.pressed
              ]}
            >
              <View style={styles.cardContent}>
                <ThemedText 
                  style={[styles.chapterLabel, { fontSize: 16 * textMultiplier }]}
                >
                  {ch.chapterLabel}
                </ThemedText>
                <ThemedText 
                  style={[styles.chapterTitle, { fontSize: 15 * textMultiplier }]}
                  numberOfLines={2}
                >
                  {ch.title}
                </ThemedText>
                <ThemedText style={styles.sectionCount}>
                  {ch.sections.length} סעיפים
                </ThemedText>
              </View>
              <View style={styles.chevron}>
                <ThemedText style={styles.chevronText}>›</ThemedText>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  chapterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: '#F5F5F5',
  },
  cardContent: {
    flex: 1,
  },
  chapterLabel: {
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 4,
    color: '#000000',
    fontSize: 17,
  },
  chapterTitle: {
    textAlign: 'right',
    marginBottom: 0,
    lineHeight: 21,
    color: '#666666',
    fontSize: 15,
  },
  sectionCount: {
    fontSize: 13,
    textAlign: 'right',
    opacity: 0.5,
    color: '#999999',
  },
  chevron: {
    marginLeft: 8,
  },
  chevronText: {
    fontSize: 20,
    opacity: 0.3,
    color: '#000000',
  },
  spacer: {
    height: 40,
  },
});

