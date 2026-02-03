import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { ChapterScreen } from './src/screens/ChapterScreen';
import { Chapter } from './src/types';

export default function App() {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  return (
    <>
      {selectedChapter ? (
        <ChapterScreen 
          chapter={selectedChapter} 
          onBack={() => setSelectedChapter(null)} 
        />
      ) : (
        <HomeScreen onSelectChapter={setSelectedChapter} />
      )}
      <StatusBar style="light" />
    </>
  );
}
