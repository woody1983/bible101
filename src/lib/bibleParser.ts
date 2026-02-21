import bibleData from '../data/kjvBible.json';
import searchIndex from '../data/bibleSearchIndex.json';

export interface Verse {
  verse: number;
  text: string;
  textEn: string;
}

export interface Chapter {
  chapter: number;
  verses: Verse[];
}

export interface Book {
  id: string;
  name: string;
  nameEn: string;
  chapters: Chapter[];
}

export interface BibleData {
  books: Book[];
}

export interface SearchResult {
  ref: string;
  bookId: string;
  bookName: string;
  bookNameEn: string;
  chapter: number;
  verse: number;
  text: string;
  textEn: string;
  keywords?: string[];
}

// Type assertions for imported JSON
const typedBibleData = bibleData as BibleData;
const typedSearchIndex = searchIndex as SearchResult[];

// Build lookup maps for faster access
const bookMap = new Map<string, Book>();
const bookNameMap = new Map<string, Book>();

// Initialize lookup maps
for (const book of typedBibleData.books) {
  bookMap.set(book.id, book);
  bookNameMap.set(book.name, book);
  bookNameMap.set(book.nameEn.toLowerCase(), book);
}

/**
 * Get a specific verse by book ID, chapter, and verse number
 */
export function getVerse(bookId: string, chapter: number, verse: number): Verse | null {
  const book = bookMap.get(bookId);
  if (!book) return null;
  
  const chapterData = book.chapters.find(c => c.chapter === chapter);
  if (!chapterData) return null;
  
  const verseData = chapterData.verses.find(v => v.verse === verse);
  return verseData || null;
}

/**
 * Get all verses in a specific chapter
 */
export function getChapter(bookId: string, chapter: number): Chapter | null {
  const book = bookMap.get(bookId);
  if (!book) return null;
  
  return book.chapters.find(c => c.chapter === chapter) || null;
}

/**
 * Get a book by its ID
 */
export function getBook(bookId: string): Book | null {
  return bookMap.get(bookId) || null;
}

/**
 * Get a book by its name (Chinese or English)
 */
export function getBookByName(name: string): Book | null {
  // Try exact match first
  let book = bookNameMap.get(name);
  if (book) return book;
  
  // Try case-insensitive match for English names
  book = bookNameMap.get(name.toLowerCase());
  if (book) return book;
  
  // Try partial match for Chinese names
  for (const [bookName, bookData] of bookNameMap.entries()) {
    if (bookName.includes(name) || name.includes(bookName)) {
      return bookData;
    }
  }
  
  return null;
}

/**
 * Search the Bible for verses containing the query string
 */
export function searchBible(query: string): SearchResult[] {
  if (!query || query.trim() === '') return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];
  
  for (const entry of typedSearchIndex) {
    // Search in Chinese text
    if (entry.text.toLowerCase().includes(lowerQuery)) {
      results.push(entry);
      continue;
    }
    
    // Search in English text
    if (entry.textEn.toLowerCase().includes(lowerQuery)) {
      results.push(entry);
      continue;
    }
    
    // Search in keywords (if available)
    if (entry.keywords && Array.isArray(entry.keywords) && entry.keywords.some((kw: string) => kw.toLowerCase().includes(lowerQuery))) {
      results.push(entry);
    }
  }
  
  return results;
}

/**
 * Search Bible with reference (e.g., "John 3:16" or "genesis 1:1")
 */
export function searchByReference(reference: string): SearchResult | null {
  // Match patterns like "John 3:16", "Genesis 1:1", "1 John 3:16"
  const match = reference.match(/^(\d?\s*\w+)\s+(\d+):(\d+)$/i);
  if (!match) return null;
  
  const [, bookName, chapter, verse] = match;
  const book = getBookByName(bookName.trim());
  
  if (!book) return null;
  
  const verseData = getVerse(book.id, parseInt(chapter), parseInt(verse));
  if (!verseData) return null;
  
  return {
    ref: `${book.id}:${chapter}:${verse}`,
    bookId: book.id,
    bookName: book.name,
    bookNameEn: book.nameEn,
    chapter: parseInt(chapter),
    verse: parseInt(verse),
    text: verseData.text,
    textEn: verseData.textEn
  };
}

/**
 * Get all books
 */
export function getAllBooks(): Book[] {
  return typedBibleData.books;
}

/**
 * Get total verse count
 */
export function getTotalVerseCount(): number {
  return typedSearchIndex.length;
}

/**
 * Format a verse reference
 */
export function formatReference(bookId: string, chapter: number, verse: number): string {
  const book = getBook(bookId);
  if (!book) return `${bookId} ${chapter}:${verse}`;
  return `${book.nameEn} ${chapter}:${verse}`;
}

/**
 * Get verses around a specific verse (context)
 */
export function getVerseContext(
  bookId: string, 
  chapter: number, 
  verse: number, 
  contextSize: number = 2
): Verse[] {
  const chapterData = getChapter(bookId, chapter);
  if (!chapterData) return [];
  
  const startIdx = Math.max(0, verse - contextSize - 1);
  const endIdx = Math.min(chapterData.verses.length, verse + contextSize);
  
  return chapterData.verses.slice(startIdx, endIdx);
}

/**
 * 根据书卷 ID 获取中文书卷名
 */
export function getBookNameCN(bookId: string): string {
  const book = bookMap.get(bookId);
  return book?.name || bookId;
}

export default {
  getVerse,
  getChapter,
  getBook,
  getBookByName,
  searchBible,
  searchByReference,
  getAllBooks,
  getTotalVerseCount,
  formatReference,
  getVerseContext,
  getBookNameCN
};
