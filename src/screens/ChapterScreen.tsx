import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChapterDetail } from '../components/ChapterDetail';
import { Chapter } from '../types';

interface ChapterScreenProps {
  chapter: Chapter;
  onBack: () => void;
}

export const ChapterScreen: React.FC<ChapterScreenProps> = ({ chapter, onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← חזרה</Text>
        </TouchableOpacity>
      </View>
      <ChapterDetail chapter={chapter} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c5aa0',
    padding: 12,
    alignItems: 'flex-start',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
