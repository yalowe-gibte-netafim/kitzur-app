/**
 * E2E Tests for Utils - Content Loader
 */
import { 
  listChapters, 
  getChapterContent, 
  searchContent,
  getChapterCount 
} from '../utils/contentLoader';

describe('Content Loader Utils', () => {
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
      const firstChapter = chapters[0];
      
      expect(firstChapter).toHaveProperty('id');
      expect(firstChapter).toHaveProperty('number');
      expect(firstChapter).toHaveProperty('hebrewName');
      expect(firstChapter).toHaveProperty('category');
    });

    it('should filter chapters by category', async () => {
      const category = 'אורח חיים';
      const chapters = await listChapters(category);
      
      chapters.forEach(chapter => {
        expect(chapter.category).toBe(category);
      });
    });
  });

  describe('getChapterContent', () => {
    it('should load chapter content by ID', async () => {
      const chapterId = 'kitzur_orach_chaim-001';
      const content = await getChapterContent(chapterId);
      
      expect(content).toBeDefined();
      expect(content).toHaveProperty('id');
      expect(content).toHaveProperty('sections');
      expect(Array.isArray(content.sections)).toBe(true);
    });

    it('should return null for invalid chapter ID', async () => {
      const content = await getChapterContent('invalid-id');
      expect(content).toBeNull();
    });

    it('should load chapter with Hebrew content', async () => {
      const chapterId = 'kitzur_orach_chaim-001';
      const content = await getChapterContent(chapterId);
      
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
