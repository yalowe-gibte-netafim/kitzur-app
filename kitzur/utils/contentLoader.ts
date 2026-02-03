import chapterRegistry, { chapterIds } from '../content/chapters-index';

export type Section = { id: string; section: number; text: string };
export type Chapter = {
  id: string;
  chapterLabel: string;
  title: string;
  sections: Section[];
  version: number;
};

// Use statically imported chapter IDs
const CHAPTER_IDS = chapterIds;

/**
 * Load all chapters from JSON files
 */
export async function listChapters(): Promise<Chapter[]> {
  const chapters = await Promise.all(
    CHAPTER_IDS.map(async id => {
      const chapter = await getChapter(id);
      return chapter;
    })
  );
  return chapters.filter(Boolean) as Chapter[];
}

/**
 * Load a specific chapter by ID
 */
export async function getChapter(chapterId: string): Promise<Chapter | null> {
  try {
    // Use static chapter registry
    const chapter = chapterRegistry[chapterId];
    return chapter ? (chapter as Chapter) : null;
  } catch (error) {
    console.error(`Failed to load chapter: ${chapterId}`, error);
    return null;
  }
}

/**
 * Find a section by its ID across all chapters
 */
export async function findSectionById(sectionId: string): Promise<{ chapter: Chapter; section: Section } | null> {
  for (const id of CHAPTER_IDS) {
    const ch = await getChapter(id);
    if (!ch) continue;
    const sec = ch.sections.find(s => s.id === sectionId);
    if (sec) return { chapter: ch, section: sec };
  }
  return null;
}

/**
 * Search for text across all chapters and sections
 */
export async function searchContent(query: string): Promise<Array<{
  chapter: Chapter;
  section: Section;
  matchScore: number;
}>> {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const results: Array<{ chapter: Chapter; section: Section; matchScore: number }> = [];
  const chapters = await listChapters();

  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      const text = section.text.toLowerCase();
      const chapterTitle = chapter.title.toLowerCase();
      const chapterLabel = chapter.chapterLabel.toLowerCase();

      // Calculate match score
      let score = 0;
      if (text.includes(normalizedQuery)) score += 10;
      if (chapterTitle.includes(normalizedQuery)) score += 5;
      if (chapterLabel.includes(normalizedQuery)) score += 3;

      if (score > 0) {
        results.push({ chapter, section, matchScore: score });
      }
    }
  }

  // Sort by match score descending
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Get all chapter IDs
 */
export function getChapterIds(): string[] {
  return [...CHAPTER_IDS];
}
