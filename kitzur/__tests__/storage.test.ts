/**
 * E2E Tests for Storage Utilities
 */
import { 
  storeData, 
  getData, 
  removeData, 
  getAllKeys, 
  clearAll 
} from '../utils/storage';

describe('Storage Utils E2E', () => {
  beforeEach(async () => {
    // Clear storage before each test
    await clearAll();
  });

  describe('Basic Storage Operations', () => {
    it('should store and retrieve string data', async () => {
      const key = 'test-key';
      const value = 'test-value';
      
      await storeData(key, value);
      const retrieved = await getData(key);
      
      expect(retrieved).toBe(value);
    });

    it('should store and retrieve object data', async () => {
      const key = 'test-object';
      const value = { name: 'Test', number: 42, nested: { value: true } };
      
      await storeData(key, value);
      const retrieved = await getData(key);
      
      expect(retrieved).toEqual(value);
    });

    it('should store and retrieve array data', async () => {
      const key = 'test-array';
      const value = [1, 2, 3, 'four', { five: 5 }];
      
      await storeData(key, value);
      const retrieved = await getData(key);
      
      expect(retrieved).toEqual(value);
    });

    it('should return null for non-existent key', async () => {
      const retrieved = await getData('non-existent-key');
      expect(retrieved).toBeNull();
    });
  });

  describe('Data Removal', () => {
    it('should remove stored data', async () => {
      const key = 'to-be-removed';
      await storeData(key, 'value');
      
      await removeData(key);
      const retrieved = await getData(key);
      
      expect(retrieved).toBeNull();
    });

    it('should not throw error when removing non-existent key', async () => {
      await expect(removeData('non-existent')).resolves.not.toThrow();
    });
  });

  describe('Multiple Keys Operations', () => {
    it('should store multiple items and retrieve all keys', async () => {
      await storeData('key1', 'value1');
      await storeData('key2', 'value2');
      await storeData('key3', 'value3');
      
      const keys = await getAllKeys();
      
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys).toContain('key3');
    });

    it('should clear all data', async () => {
      await storeData('key1', 'value1');
      await storeData('key2', 'value2');
      
      await clearAll();
      const keys = await getAllKeys();
      
      expect(keys.length).toBe(0);
    });
  });

  describe('Data Persistence', () => {
    it('should persist data across operations', async () => {
      await storeData('persistent-key', 'persistent-value');
      await storeData('other-key', 'other-value');
      await removeData('other-key');
      
      const retrieved = await getData('persistent-key');
      expect(retrieved).toBe('persistent-value');
    });

    it('should handle updating existing keys', async () => {
      const key = 'update-key';
      await storeData(key, 'original');
      await storeData(key, 'updated');
      
      const retrieved = await getData(key);
      expect(retrieved).toBe('updated');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string values', async () => {
      const key = 'empty-string';
      await storeData(key, '');
      
      const retrieved = await getData(key);
      expect(retrieved).toBe('');
    });

    it('should handle null values', async () => {
      const key = 'null-value';
      await storeData(key, null);
      
      const retrieved = await getData(key);
      expect(retrieved).toBeNull();
    });

    it('should handle boolean values', async () => {
      await storeData('bool-true', true);
      await storeData('bool-false', false);
      
      expect(await getData('bool-true')).toBe(true);
      expect(await getData('bool-false')).toBe(false);
    });

    it('should handle number values', async () => {
      await storeData('number-int', 42);
      await storeData('number-float', 3.14);
      await storeData('number-zero', 0);
      
      expect(await getData('number-int')).toBe(42);
      expect(await getData('number-float')).toBe(3.14);
      expect(await getData('number-zero')).toBe(0);
    });
  });
});
