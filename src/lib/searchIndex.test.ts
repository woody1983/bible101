import { describe, it, expect } from 'vitest';
import { createSearchIndex, type SearchIndex, type SearchResult } from './searchIndex';
import type { Book } from './bibleParser';

describe('Search Index', () => {
  const mockBooks: Book[] = [
    {
      id: 'psalms',
      name: '诗篇',
      nameEn: 'Psalms',
      chapters: [
        {
          chapter: 23,
          verses: [
            { verse: 1, text: '耶和华是我的牧者，我必不至缺乏。', textEn: 'The Lord is my shepherd' },
            { verse: 2, text: '他使我躺卧在青草地上，领我在可安歇的水边。', textEn: 'He maketh me to lie down' },
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
            { verse: 1, text: '起初，上帝创造天地。', textEn: 'In the beginning God created' },
            { verse: 2, text: '地是空虚混沌，渊面黑暗；上帝的灵运行在水面上。', textEn: 'And the earth was without form' },
          ],
        },
      ],
    },
  ];

  it('should create search index from books', () => {
    const index = createSearchIndex(mockBooks);
    
    expect(index).toBeDefined();
    expect(Array.isArray(index.documents)).toBe(true);
    expect(index.documents.length).toBeGreaterThan(0);
  });

  it('should have correct document structure', () => {
    const index = createSearchIndex(mockBooks);
    const doc = index.documents[0];
    
    expect(doc).toHaveProperty('id');
    expect(doc).toHaveProperty('bookId');
    expect(doc).toHaveProperty('bookName');
    expect(doc).toHaveProperty('chapter');
    expect(doc).toHaveProperty('verse');
    expect(doc).toHaveProperty('text');
    expect(doc).toHaveProperty('textEn');
  });

  it('should index all verses', () => {
    const index = createSearchIndex(mockBooks);
    
    // 诗篇 23 章有 2 节，创世记 1 章有 2 节，共 4 节
    expect(index.documents.length).toBe(4);
  });

  it('should create unique IDs for each verse', () => {
    const index = createSearchIndex(mockBooks);
    const ids = index.documents.map((d) => d.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should include Chinese text content', () => {
    const index = createSearchIndex(mockBooks);
    const texts = index.documents.map((d) => d.text);
    
    expect(texts.some((t) => t.includes('耶和华'))).toBe(true);
    expect(texts.some((t) => t.includes('上帝'))).toBe(true);
  });

  it('should handle empty books array', () => {
    const index = createSearchIndex([]);
    
    expect(index.documents).toEqual([]);
  });
});
