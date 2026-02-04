/**
 * E2E Tests for Utils - Progress Tracking
 */
import {
  saveLastRead,
  getLastRead,
  markChapterCompleted,
  isChapterCompleted,
  getCompletedCount,
  getStreak,
  updateStreak,
  resetAllProgress,
  getDailyQuote,
  getRandomHalachaId,
} from '../utils/progress';

describe('Progress Tracking Utils', () => {
  beforeEach(async () => {
    // Reset progress before each test
    await resetAllProgress();
  });

  describe('Last Read Functionality', () => {
    it('should save and retrieve last read chapter', async () => {
      const testData = {
        chapterId: 'kitzur_orach_chaim-001',
        chapterNumber: 1,
        chapterName: 'הלכות השכמת הבוקר',
        sectionId: 'section-1',
        timestamp: Date.now(),
      };

      await saveLastRead(testData);
      const retrieved = await getLastRead();

      expect(retrieved).toBeDefined();
      expect(retrieved?.chapterId).toBe(testData.chapterId);
      expect(retrieved?.chapterNumber).toBe(testData.chapterNumber);
    });

    it('should return null when no last read exists', async () => {
      const lastRead = await getLastRead();
      expect(lastRead).toBeNull();
    });
  });

  describe('Chapter Completion', () => {
    it('should mark chapter as completed', async () => {
      const chapterId = 'kitzur_orach_chaim-001';
      
      await markChapterCompleted(chapterId);
      const isCompleted = await isChapterCompleted(chapterId);
      
      expect(isCompleted).toBe(true);
    });

    it('should return false for incomplete chapter', async () => {
      const chapterId = 'kitzur_orach_chaim-999';
      const isCompleted = await isChapterCompleted(chapterId);
      
      expect(isCompleted).toBe(false);
    });

    it('should track completed count correctly', async () => {
      await markChapterCompleted('kitzur_orach_chaim-001');
      await markChapterCompleted('kitzur_orach_chaim-002');
      await markChapterCompleted('kitzur_orach_chaim-003');

      const count = await getCompletedCount();
      expect(count).toBe(3);
    });

    it('should not double-count completed chapters', async () => {
      const chapterId = 'kitzur_orach_chaim-001';
      
      await markChapterCompleted(chapterId);
      await markChapterCompleted(chapterId);

      const count = await getCompletedCount();
      expect(count).toBe(1);
    });
  });

  describe('Streak Functionality', () => {
    it('should initialize streak to zero', async () => {
      const streak = await getStreak();
      
      expect(streak).toBeDefined();
      expect(streak.count).toBe(0);
      expect(streak.lastDate).toBe('');
    });

    it('should update streak for today', async () => {
      await updateStreak();
      const streak = await getStreak();
      
      expect(streak.count).toBe(1);
      expect(streak.lastDate).toBeTruthy();
    });

    it('should maintain streak when updated same day', async () => {
      await updateStreak();
      await updateStreak();
      
      const streak = await getStreak();
      expect(streak.count).toBe(1);
    });
  });

  describe('Reset Progress', () => {
    it('should reset all progress data', async () => {
      // Setup some data
      await saveLastRead({
        chapterId: 'test',
        chapterNumber: 1,
        chapterName: 'Test',
        sectionId: 'test-1',
        timestamp: Date.now(),
      });
      await markChapterCompleted('kitzur_orach_chaim-001');
      await updateStreak();

      // Reset
      await resetAllProgress();

      // Verify reset
      const lastRead = await getLastRead();
      const completed = await getCompletedCount();
      const streak = await getStreak();

      expect(lastRead).toBeNull();
      expect(completed).toBe(0);
      expect(streak.count).toBe(0);
    });
  });

  describe('Helper Functions', () => {
    it('should return a daily quote', () => {
      const quote = getDailyQuote();
      
      expect(quote).toBeDefined();
      expect(typeof quote).toBe('string');
      expect(quote.length).toBeGreaterThan(0);
    });

    it('should generate random halacha ID within range', () => {
      const maxId = 100;
      const randomId = getRandomHalachaId(maxId);
      
      expect(randomId).toBeGreaterThanOrEqual(1);
      expect(randomId).toBeLessThanOrEqual(maxId);
    });

    it('should generate different random IDs', () => {
      const ids = new Set();
      const maxId = 221;
      
      for (let i = 0; i < 10; i++) {
        ids.add(getRandomHalachaId(maxId));
      }
      
      // Should generate at least a few different IDs
      expect(ids.size).toBeGreaterThan(1);
    });
  });
});
