/**
 * E2E Tests for Hebrew Utilities
 */
import { normalizeHebrew, removeNikud } from '../utils/hebrewNormalize';
import { 
  numberToHebrewGematria, 
  parseHebrewNumber 
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
      
      expect(normalized).toBe('שלום');
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
      expect(numberToHebrewGematria(1)).toBe('א');
      expect(numberToHebrewGematria(2)).toBe('ב');
      expect(numberToHebrewGematria(5)).toBe('ה');
      expect(numberToHebrewGematria(10)).toBe('י');
    });

    it('should handle teens correctly (avoiding God\'s name)', () => {
      expect(numberToHebrewGematria(15)).not.toBe('יה');
      expect(numberToHebrewGematria(16)).not.toBe('יו');
      expect(numberToHebrewGematria(15)).toBe('טו');
      expect(numberToHebrewGematria(16)).toBe('טז');
    });

    it('should convert larger numbers', () => {
      expect(numberToHebrewGematria(20)).toBe('כ');
      expect(numberToHebrewGematria(100)).toBe('ק');
      expect(numberToHebrewGematria(221)).toBeTruthy();
    });

    it('should parse Hebrew numbers back to integers', () => {
      expect(parseHebrewNumber('א')).toBe(1);
      expect(parseHebrewNumber('ב')).toBe(2);
      expect(parseHebrewNumber('י')).toBe(10);
      expect(parseHebrewNumber('כ')).toBe(20);
    });

    it('should handle round trip conversion', () => {
      for (let i = 1; i <= 30; i++) {
        if (i !== 15 && i !== 16) { // Special cases
          const hebrew = numberToHebrewGematria(i);
          const parsed = parseHebrewNumber(hebrew);
          expect(parsed).toBe(i);
        }
      }
    });

    it('should handle geresh marks in parsing', () => {
      expect(parseHebrewNumber("א'")).toBe(1);
      expect(parseHebrewNumber('ב\u05F3')).toBe(2);
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
      const result = numberToHebrewGematria(0);
      expect(result).toBeTruthy();
    });

    it('should handle negative numbers gracefully', () => {
      const result = numberToHebrewGematria(-5);
      expect(result).toBeTruthy(); // Should not crash
    });

    it('should handle very large numbers', () => {
      const result = numberToHebrewGematria(1000);
      expect(result).toBeTruthy();
    });

    it('should handle invalid Hebrew number strings', () => {
      expect(parseHebrewNumber('')).toBe(0);
      expect(parseHebrewNumber('abc')).toBe(0);
    });
  });
});
