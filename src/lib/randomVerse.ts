import type { Book, Chapter, Verse } from './bibleParser';

// 优先书卷：诗篇和箴言
const PRIORITY_BOOKS = ['psalms', 'proverbs'];

export interface RandomVerse {
  bookId: string;
  bookName: string;
  bookNameEn: string;
  chapter: number;
  verse: number;
  text: string;
  textEn: string;
}

/**
 * 从圣经数据中获取随机经文
 * 优先选择诗篇和箴言
 */
export function getRandomVerse(books: Book[]): RandomVerse | null {
  if (!books || books.length === 0) {
    return null;
  }

  // 分离优先书卷和其他书卷
  const priorityBooks = books.filter(book => PRIORITY_BOOKS.includes(book.id));
  const otherBooks = books.filter(book => !PRIORITY_BOOKS.includes(book.id));

  // 70% 概率选择优先书卷，30% 概率选择其他书卷
  const usePriority = Math.random() < 0.7;
  const selectedBooks = usePriority && priorityBooks.length > 0 
    ? priorityBooks 
    : otherBooks.length > 0 
      ? otherBooks 
      : books;

  // 随机选择书卷
  const randomBook = selectedBooks[Math.floor(Math.random() * selectedBooks.length)];
  
  if (!randomBook || !randomBook.chapters || randomBook.chapters.length === 0) {
    return null;
  }

  // 随机选择章节
  const randomChapter = randomBook.chapters[Math.floor(Math.random() * randomBook.chapters.length)];
  
  if (!randomChapter || !randomChapter.verses || randomChapter.verses.length === 0) {
    return null;
  }

  // 随机选择经文
  const randomVerse = randomChapter.verses[Math.floor(Math.random() * randomChapter.verses.length)];

  return {
    bookId: randomBook.id,
    bookName: randomBook.name,
    bookNameEn: randomBook.nameEn,
    chapter: randomChapter.chapter,
    verse: randomVerse.verse,
    text: randomVerse.text,
    textEn: randomVerse.textEn,
  };
}

/**
 * 获取多个随机经文
 */
export function getMultipleRandomVerses(books: Book[], count: number = 1): RandomVerse[] {
  const verses: RandomVerse[] = [];
  const maxAttempts = count * 10; // 防止无限循环
  let attempts = 0;

  while (verses.length < count && attempts < maxAttempts) {
    const verse = getRandomVerse(books);
    if (verse) {
      // 检查是否重复
      const isDuplicate = verses.some(
        v => v.bookId === verse.bookId && 
            v.chapter === verse.chapter && 
            v.verse === verse.verse
      );
      
      if (!isDuplicate) {
        verses.push(verse);
      }
    }
    attempts++;
  }

  return verses;
}

/**
 * 检查是否是优先书卷
 */
export function isPriorityBook(bookId: string): boolean {
  return PRIORITY_BOOKS.includes(bookId);
}

/**
 * 格式化经文引用
 */
export function formatVerseReference(verse: RandomVerse): string {
  return `${verse.bookName} ${verse.chapter}:${verse.verse}`;
}

/**
 * 格式化经文引用（英文）
 */
export function formatVerseReferenceEn(verse: RandomVerse): string {
  return `${verse.bookNameEn} ${verse.chapter}:${verse.verse}`;
}
