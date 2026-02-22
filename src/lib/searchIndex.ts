import type { Book } from './bibleParser';

export interface SearchDocument {
  id: string;           // 格式: bookId-chapter-verse
  bookId: string;
  bookName: string;
  bookNameEn: string;
  chapter: number;
  verse: number;
  text: string;         // 中文经文
  textEn: string;       // 英文经文
}

export interface SearchIndex {
  documents: SearchDocument[];
}

export interface SearchResult {
  document: SearchDocument;
  score: number;        // 匹配分数
  matches: string[];    // 匹配的片段
}

/**
 * 从圣经书卷数据创建搜索索引
 */
export function createSearchIndex(books: Book[]): SearchIndex {
  const documents: SearchDocument[] = [];

  for (const book of books) {
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        documents.push({
          id: `${book.id}-${chapter.chapter}-${verse.verse}`,
          bookId: book.id,
          bookName: book.name,
          bookNameEn: book.nameEn,
          chapter: chapter.chapter,
          verse: verse.verse,
          text: verse.text,
          textEn: verse.textEn,
        });
      }
    }
  }

  return { documents };
}

/**
 * 简单的文本搜索（精确匹配）
 * 后续会替换为 Fuse.js 或更高级的算法
 */
export function searchIndex(
  index: SearchIndex,
  query: string,
  limit: number = 10
): SearchResult[] {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const lowerQuery = query.toLowerCase();

  for (const doc of index.documents) {
    const text = doc.text.toLowerCase();
    const textEn = doc.textEn.toLowerCase();

    if (text.includes(lowerQuery) || textEn.includes(lowerQuery)) {
      // 计算匹配分数（简单的包含检查）
      let score = 0;
      if (text.includes(lowerQuery)) score += 1;
      if (textEn.includes(lowerQuery)) score += 0.5;

      // 提取匹配的片段
      const matches: string[] = [];
      const index = text.indexOf(lowerQuery);
      if (index !== -1) {
        // 提取前后文（最多 20 个字符）
        const start = Math.max(0, index - 20);
        const end = Math.min(text.length, index + query.length + 20);
        const snippet = '...' + text.slice(start, end) + '...';
        matches.push(snippet);
      }

      results.push({
        document: doc,
        score,
        matches,
      });
    }
  }

  // 按分数排序并限制数量
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * 获取经文片段（用于显示前后文）
 */
export function getVerseSnippet(
  text: string,
  query: string,
  contextLength: number = 15
): string {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    // 如果没有匹配，返回开头
    return text.slice(0, contextLength * 2) + '...';
  }

  const start = Math.max(0, index - contextLength);
  const end = Math.min(text.length, index + query.length + contextLength);
  
  let snippet = text.slice(start, end);
  
  // 添加省略号
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}
