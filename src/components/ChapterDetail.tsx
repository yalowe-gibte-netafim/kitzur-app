import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Chapter } from '../types';

interface ChapterDetailProps {
  chapter: Chapter;
}

export const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.chapterNumber}>סימן {chapter.number}</Text>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
      </View>

      {chapter.sections.map((section) => (
        <View key={section.number} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionNumber}>סעיף {section.number}</Text>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>

          <Text style={styles.sectionContent}>{section.content}</Text>

          {section.sephardicNote && (
            <View style={styles.sephardicNoteContainer}>
              <Text style={styles.sephardicNoteTitle}>📖 הערה ספרדית (ע"פ יל"י):</Text>
              <Text style={styles.sephardicNoteText}>{section.sephardicNote}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  header: {
    backgroundColor: '#2c5aa0',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  chapterNumber: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'right',
    marginBottom: 8,
    fontWeight: '600',
  },
  chapterTitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  sectionNumber: {
    fontSize: 14,
    color: '#2c5aa0',
    textAlign: 'right',
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
    fontWeight: '600',
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
    color: '#333',
    marginBottom: 12,
  },
  sephardicNoteContainer: {
    backgroundColor: '#fff9e6',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    marginTop: 8,
  },
  sephardicNoteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f57f17',
    textAlign: 'right',
    marginBottom: 8,
  },
  sephardicNoteText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'right',
    color: '#555',
  },
});
