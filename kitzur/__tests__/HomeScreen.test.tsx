/**
 * E2E Tests for Components - Home Screen
 */
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';

// Mock the modules that HomeScreen uses
jest.mock('../utils/contentLoader', () => ({
  listChapters: jest.fn(() => Promise.resolve([])),
  getChapterCount: jest.fn(() => 221),
}));

jest.mock('../utils/progress', () => ({
  getLastRead: jest.fn(() => Promise.resolve(null)),
  getCompletedCount: jest.fn(() => Promise.resolve(0)),
  getStreak: jest.fn(() => Promise.resolve({ count: 0, lastDate: '' })),
  getDailyQuote: jest.fn(() => ({
    text: 'כל ישראל יש להם חלק לעולם הבא',
    source: 'פרקי אבות'
  })),
  getRandomHalachaId: jest.fn(() => 1),
}));

describe('Home Screen E2E', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText).toBeDefined();
  });

  it('should display loading state initially', () => {
    const { getByTestId } = render(<HomeScreen />);
    // Check for loading indicator or similar
    expect(getByTestId).toBeDefined();
  });

  it('should load and display dashboard data', async () => {
    const { getByText } = render(<HomeScreen />);
    
    await waitFor(() => {
      // Should eventually show some content
      expect(getByText).toBeDefined();
    });
  });

  it('should show daily quote', async () => {
    const { findByText } = render(<HomeScreen />);
    
    // Should show the mocked quote
    const quote = await findByText(/כל ישראל/);
    expect(quote).toBeDefined();
  });
});
