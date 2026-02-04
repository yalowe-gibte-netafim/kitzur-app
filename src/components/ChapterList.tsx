import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Chapter } from '../types';

interface ChapterListProps {
  chapters: Chapter[];
  onSelectChapter: (chapter: Chapter) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({ chapters, onSelectChapter }) => {
  const renderItem = ({ item }: { item: Chapter }) => (
    <TouchableOpacity
      style={styles.chapterItem}
      onPress={() => onSelectChapter(item)}
    >
      <View style={styles.chapterNumber}>
        <Text style={styles.chapterNumberText}>{item.number}</Text>
      </View>
      <Text style={styles.chapterTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chapters}
      renderItem={renderItem}
      keyExtractor={(item) => item.number.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  chapterItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chapterNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2c5aa0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  chapterNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chapterTitle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
    fontWeight: '600',
    color: '#333',
  },
});
