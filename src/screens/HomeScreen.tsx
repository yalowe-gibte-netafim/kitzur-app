import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ChapterList } from '../components/ChapterList';
import { kitzurData } from '../data/kitzurData';
import { Chapter } from '../types';

interface HomeScreenProps {
  onSelectChapter: (chapter: Chapter) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectChapter }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>קיצור שולחן ערוך</Text>
        <Text style={styles.subtitle}>מנהג ספרדים - על פי יל"י</Text>
      </View>
      <ChapterList chapters={kitzurData} onSelectChapter={onSelectChapter} />
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
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e3f2fd',
    textAlign: 'center',
    marginTop: 8,
  },
});
