/**
 * E2E Tests for Utils - Content Loader
 */
import { 
  listChapters, 
  getChapter, 
  searchContent,
  getChapterCount,
  getChapterIds,
  __setChapterRegistryForTests
} from '../utils/contentLoader';

// Mock chapter data
const mockChapterRegistry = {
  'kitzur_orach_chaim-001': {
    id: 'kitzur_orach_chaim-001',
    chapterLabel: 'פרק א',
    title: 'הלכות השכמת הבוקר',
    category: 'אורח חיים',
    sections: [
      { id: 'section-1', section: 1, text: 'צריך להתגבר כארי לעמוד בבוקר לעבודת בוראו' },
      { id: 'section-2', section: 2, text: 'כשמתלבש יכוון שהוא מתעטף במצוות' }
    ],
    version: 1
  },
  'kitzur_orach_chaim-002': {
    id: 'kitzur_orach_chaim-002',
    chapterLabel: 'פרק ב',
    title: 'סדר נטילת ידים ברכת המוציא',
    category: 'אורח חיים',
    sections: [
      { id: 'section-1', section: 1, text: 'נטילת ידים שחרית' }
    ],
    version: 1
  }
};

describe('Content Loader Utils', () => {
  // Setup mock before all tests
  beforeAll(() => {
    __setChapterRegistryForTests(mockChapterRegistry);
  });

  // Clean up after all tests
  afterAll(() => {
    __setChapterRegistryForTests(null);
  });

  describe('getChapterCount', () => {
    it('should return a positive number of chapters', () => {
      const count = getChapterCount();
      expect(count).toBeGreaterThan(0);
      expect(typeof count).toBe('number');
    });
  });

  describe('listChapters', () => {
    it('should return an array of chapters', async () => {
      const chapters = await listChapters();
      expect(Array.isArray(chapters)).toBe(true);
      expect(chapters.length).toBeGreaterThan(0);
    });

    it('should return chapters with required properties', async () => {
      const chapters = await listChapters();
      if (chapters.length > 0) {
        const firstChapter = chapters[0];
        
        expect(firstChapter).toHaveProperty('id');
        expect(firstChapter).toHaveProperty('chapterLabel');
        expect(firstChapter).toHaveProperty('title');
        expect(firstChapter).toHaveProperty('sections');
      }
    });

    it('should have chapters with category property', async () => {
      const chapters = await listChapters();
      
      if (chapters.length > 0) {
        chapters.forEach(chapter => {
          expect(chapter).toHaveProperty('category');
        });
      }
    });
  });

  describe('getChapter', () => {
    it('should load chapter content by ID', async () => {
      const chapterId = 'kitzur_orach_chaim-001';
      const content = await getChapter(chapterId);
      
      expect(content).toBeDefined();
      expect(content).toHaveProperty('id');
      expect(content).toHaveProperty('sections');
      expect(Array.isArray(content.sections)).toBe(true);
    });

    it('should return null for invalid chapter ID', async () => {
      const content = await getChapter('invalid-id');
      expect(content).toBeNull();
    });

    it('should load chapter with Hebrew content', async () => {
      const chapterId = 'kitzur_orach_chaim-001';
      const content = await getChapter(chapterId);
      
      if (content && content.sections.length > 0) {
        const firstSection = content.sections[0];
        expect(firstSection).toHaveProperty('text');
        expect(typeof firstSection.text).toBe('string');
        expect(firstSection.text.length).toBeGreaterThan(0);
      }
    });
  });

  describe('searchContent', () => {
    it('should search and return results', async () => {
      const query = 'שבת';
      const results = await searchContent(query);
      
      expect(Array.isArray(results)).toBe(true);
    });

    it('should return results with match scores', async () => {
      const query = 'ברכה';
      const results = await searchContent(query);
      
      if (results.length > 0) {
        results.forEach(result => {
          expect(result).toHaveProperty('matchScore');
          expect(typeof result.matchScore).toBe('number');
        });
      }
    });

    it('should return empty array for empty query', async () => {
      const results = await searchContent('');
      expect(results).toEqual([]);
    });
  });
});
