import { describe, it, expect, vi } from 'vitest';
import {
  getRandomVerse,
  getMultipleRandomVerses,
  isPriorityBook,
  formatVerseReference,
  formatVerseReferenceEn,
} from './randomVerse';
import type { Book } from './bibleParser';

describe('Random Verse', () => {
  const mockBooks: Book[] = [
    {
      id: 'psalms',
      name: '诗篇',
      nameEn: 'Psalms',
      chapters: [
        {
          chapter: 23,
          verses: [
            { verse: 1, text: '耶和华是我的牧者，我必不至缺乏。', textEn: 'The Lord is my shepherd; I shall not want.' },
            { verse: 2, text: '他使我躺卧在青草地上，领我在可安歇的水边。', textEn: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
          ],
        },
      ],
    },
    {
      id: 'proverbs',
      name: '箴言',
      nameEn: 'Proverbs',
      chapters: [
        {
          chapter: 1,
          verses: [
            { verse: 1, text: '以色列王大卫儿子所罗门的箴言。', textEn: 'The proverbs of Solomon the son of David, king of Israel;' },
          ],
        },
      ],
    },
    {
      id: 'genesis',
      name: '创世记',
      nameEn: 'Genesis',
      chapters: [
        {
          chapter: 1,
          verses: [
            { verse: 1, text: '起初，上帝创造天地。', textEn: 'In the beginning God created the heaven and the earth.' },
          ],
        },
      ],
    },
  ];

  describe('getRandomVerse', () => {
    it('should return null for empty books array', () => {
      const verse = getRandomVerse([]);
      expect(verse).toBeNull();
    });

    it('should return a verse with correct structure', () => {
      const verse = getRandomVerse(mockBooks);
      expect(verse).not.toBeNull();
      expect(verse).toHaveProperty('bookId');
      expect(verse).toHaveProperty('bookName');
      expect(verse).toHaveProperty('bookNameEn');
      expect(verse).toHaveProperty('chapter');
      expect(verse).toHaveProperty('verse');
      expect(verse).toHaveProperty('text');
      expect(verse).toHaveProperty('textEn');
    });

    it('should return verse from priority books more often', () => {
      // 运行多次统计
      const results = { priority: 0, other: 0 };
      for (let i = 0; i < 100; i++) {
        const verse = getRandomVerse(mockBooks);
        if (verse) {
          if (verse.bookId === 'psalms' || verse.bookId === 'proverbs') {
            results.priority++;
          } else {
            results.other++;
          }
        }
      }
      // 优先书卷应该占大多数（70% 概率）
      expect(results.priority).toBeGreaterThan(results.other);
    });

    it('should return valid verse numbers', () => {
      const verse = getRandomVerse(mockBooks);
      expect(verse).not.toBeNull();
      expect(verse?.verse).toBeGreaterThan(0);
      expect(verse?.chapter).toBeGreaterThan(0);
    });
  });

  describe('getMultipleRandomVerses', () => {
    it('should return specified number of verses', () => {
      const verses = getMultipleRandomVerses(mockBooks, 3);
      expect(verses.length).toBeLessThanOrEqual(3);
    });

    it('should return unique verses', () => {
      const verses = getMultipleRandomVerses(mockBooks, 5);
      const uniqueKeys = new Set(
        verses.map(v => `${v.bookId}-${v.chapter}-${v.verse}`)
      );
      expect(uniqueKeys.size).toBe(verses.length);
    });

    it('should handle request for more verses than available', () => {
      const verses = getMultipleRandomVerses(mockBooks, 100);
      expect(verses.length).toBeLessThanOrEqual(4); // 总共只有 4 节经文
    });
  });

  describe('isPriorityBook', () => {
    it('should return true for psalms', () => {
      expect(isPriorityBook('psalms')).toBe(true);
    });

    it('should return true for proverbs', () => {
      expect(isPriorityBook('proverbs')).toBe(true);
    });

    it('should return false for other books', () => {
      expect(isPriorityBook('genesis')).toBe(false);
      expect(isPriorityBook('john')).toBe(false);
    });
  });

  describe('formatVerseReference', () => {
    it('should format Chinese reference correctly', () => {
      const verse = {
        bookId: 'psalms',
        bookName: '诗篇',
        bookNameEn: 'Psalms',
        chapter: 23,
        verse: 1,
        text: 'test',
        textEn: 'test',
      };
      expect(formatVerseReference(verse)).toBe('诗篇 23:1');
    });
  });

  describe('formatVerseReferenceEn', () => {
    it('should format English reference correctly', () => {
      const verse = {
        bookId: 'psalms',
        bookName: '诗篇',
        bookNameEn: 'Psalms',
        chapter: 23,
        verse: 1,
        text: 'test',
        textEn: 'test',
      };
      expect(formatVerseReferenceEn(verse)).toBe('Psalms 23:1');
    });
  });
});
