/**
 * E2E Tests for Hebrew Utilities
 */
import { normalizeHebrew, removeNikud } from '../utils/hebrewNormalize';
import { 
  toHebrewNumeral,
  formatHebrewChapter
} from '../utils/hebrewNumbers';

describe('Hebrew Utilities E2E', () => {
  describe('Hebrew Normalization', () => {
    it('should remove nikud from Hebrew text', () => {
      const text = 'בָּרוּךְ אַתָּה';
      const normalized = removeNikud(text);
      
      expect(normalized).toBe('ברוך אתה');
      expect(normalized).not.toMatch(/[\u0591-\u05C7]/); // No nikud marks
    });

    it('should normalize Hebrew text', () => {
      const text = 'שָׁלוֹם';
      const normalized = normalizeHebrew(text);
      
      // normalizeHebrew also converts final forms to regular forms
      expect(normalized).toBe('שלומ');
    });

    it('should handle text without nikud', () => {
      const text = 'שלום עליכם';
      const normalized = removeNikud(text);
      
      expect(normalized).toBe(text);
    });

    it('should preserve spaces and punctuation', () => {
      const text = 'בָּרוּךְ, אַתָּה.';
      const normalized = removeNikud(text);
      
      expect(normalized).toBe('ברוך, אתה.');
    });

    it('should handle empty strings', () => {
      expect(removeNikud('')).toBe('');
      expect(normalizeHebrew('')).toBe('');
    });

    it('should handle mixed Hebrew and non-Hebrew text', () => {
      const text = 'Hello שָׁלוֹם 123';
      const normalized = removeNikud(text);
      
      expect(normalized).toContain('Hello');
      expect(normalized).toContain('שלום');
      expect(normalized).toContain('123');
    });
  });

  describe('Hebrew Numbers (Gematria)', () => {
    it('should convert numbers to Hebrew gematria', () => {
      expect(toHebrewNumeral(1)).toContain('א');
      expect(toHebrewNumeral(2)).toContain('ב');
      expect(toHebrewNumeral(5)).toContain('ה');
      expect(toHebrewNumeral(10)).toContain('י');
    });

    it('should handle teens correctly (avoiding God\'s name)', () => {
      expect(toHebrewNumeral(15)).not.toContain('יה');
      expect(toHebrewNumeral(16)).not.toContain('יו');
      expect(toHebrewNumeral(15)).toContain('טו');
      expect(toHebrewNumeral(16)).toContain('טז');
    });

    it('should convert larger numbers', () => {
      expect(toHebrewNumeral(20)).toContain('כ');
      expect(toHebrewNumeral(100)).toContain('ק');
      expect(toHebrewNumeral(221)).toBeTruthy();
    });

    it('should format chapter numbers', () => {
      const formatted = formatHebrewChapter(1);
      expect(formatted).toContain('פרק');
      expect(formatted).toContain('א');
    });

    it('should add proper punctuation marks', () => {
      // Single letter should have geresh
      const single = toHebrewNumeral(1);
      expect(single).toMatch(/׳/);
      
      // Multiple letters should have gershayim
      const multiple = toHebrewNumeral(11);
      expect(multiple).toMatch(/״/);
    });
  });

  describe('Integration Tests', () => {
    it('should normalize and convert chapter references', () => {
      const text = 'פֶּרֶק י״ד';
      const normalized = normalizeHebrew(text);
      
      expect(normalized).toContain('פרק');
      expect(normalized).not.toMatch(/[\u0591-\u05C7]/);
    });

    it('should handle full verses with nikud and numbers', () => {
      const text = 'בָּרוּךְ אַתָּה ה\' אֱלֹהֵינוּ מֶלֶךְ הָעוֹלָם';
      const normalized = removeNikud(text);
      
      expect(normalized).not.toMatch(/[\u0591-\u05C7]/);
      expect(normalized).toContain('ברוך');
      expect(normalized).toContain('אתה');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero', () => {
      const result = toHebrewNumeral(0);
      expect(result).toBeTruthy();
    });

    it('should handle negative numbers gracefully', () => {
      const result = toHebrewNumeral(-5);
      expect(result).toBeTruthy(); // Should not crash
    });

    it('should handle very large numbers', () => {
      const result = toHebrewNumeral(1000);
      expect(result).toBeTruthy();
    });
  });
});
