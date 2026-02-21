import type { Chapter } from './bibleParser';

export interface ExamQuestionV2 {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  question: string;
  verseReference?: string;  // 引用的经文
  category: 'reflection' | 'application' | 'understanding';
}

/**
 * 生成深度思考题（不是记忆题）
 */
export function generateDeepQuestions(
  bookId: string,
  bookName: string,
  chapter: number,
  chapterData: Chapter | null
): ExamQuestionV2[] {
  if (!chapterData || chapterData.verses.length === 0) {
    return [];
  }

  const questions: ExamQuestionV2[] = [];
  const verses = chapterData.verses;

  // 1. 反思类问题 - 关于经文含义
  questions.push(...generateReflectionQuestions(bookId, bookName, chapter, verses));

  // 2. 应用类问题 - 关于生活实践
  questions.push(...generateApplicationQuestions(bookId, bookName, chapter, verses));

  // 3. 理解类问题 - 关于神学意义
  questions.push(...generateUnderstandingQuestions(bookId, bookName, chapter, verses));

  return questions;
}

function generateReflectionQuestions(
  bookId: string,
  bookName: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestionV2[] {
  const questions: ExamQuestionV2[] = [];
  
  // 选择关键经文进行深度反思
  const keyVerses = verses.filter((v, i) => {
    // 选择第1节、中间节、最后节，以及包含关键词的节
    return i === 0 || 
           i === Math.floor(verses.length / 2) || 
           i === verses.length - 1 ||
           v.text.includes('神') || 
           v.text.includes('上帝') ||
           v.text.includes('耶和华');
  }).slice(0, 3); // 最多3个

  keyVerses.forEach((verse, index) => {
    const truncatedText = verse.text.length > 20 
      ? verse.text.substring(0, 20) + '...' 
      : verse.text;
    
    questions.push({
      id: `${bookId}-${chapter}-reflection-${index}`,
      bookId,
      bookName,
      chapter,
      question: `${bookName} ${chapter}:${verse.verse} "${truncatedText}" 这句话对你有什么特别的意义？它如何触动你的心？`,
      verseReference: `${bookName} ${chapter}:${verse.verse}`,
      category: 'reflection',
    });
  });

  return questions;
}

function generateApplicationQuestions(
  bookId: string,
  bookName: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestionV2[] {
  const questions: ExamQuestionV2[] = [];
  
  // 基于章节主题生成应用问题
  questions.push({
    id: `${bookId}-${chapter}-app-1`,
    bookId,
    bookName,
    chapter,
    question: `本章的教导如何应用在你的日常生活中？请举一个具体的例子，说明你可以如何活出这段经文。`,
    category: 'application',
  });

  questions.push({
    id: `${bookId}-${chapter}-app-2`,
    bookId,
    bookName,
    chapter,
    question: `如果你要将本章的核心信息分享给一位正在经历困难的朋友，你会如何表达？你会如何鼓励他们？`,
    category: 'application',
  });

  // 针对特定书卷的应用问题
  if (bookId === 'psalms') {
    questions.push({
      id: `${bookId}-${chapter}-app-3`,
      bookId,
      bookName,
      chapter,
      question: `这篇诗篇如何帮助你祷告？你可以如何将这篇诗篇转化为自己的祷告词？`,
      category: 'application',
    });
  } else if (bookId === 'proverbs') {
    questions.push({
      id: `${bookId}-${chapter}-app-3`,
      bookId,
      bookName,
      chapter,
      question: `本章的智慧如何帮助你在工作或人际关系中做出更好的决定？`,
      category: 'application',
    });
  }

  return questions;
}

function generateUnderstandingQuestions(
  bookId: string,
  bookName: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestionV2[] {
  const questions: ExamQuestionV2[] = [];
  
  // 关于神属性的理解
  const versesAboutGod = verses.filter(v => 
    v.text.includes('神') || v.text.includes('上帝') || v.text.includes('耶和华')
  );

  if (versesAboutGod.length > 0) {
    const verse = versesAboutGod[0];
    questions.push({
      id: `${bookId}-${chapter}-understand-1`,
      bookId,
      bookName,
      chapter,
      question: `从本章中，你看到了神的哪些属性或作为？这些认识如何影响你对神的信靠？`,
      verseReference: `${bookName} ${chapter}:${verse.verse}`,
      category: 'understanding',
    });
  }

  // 关于信仰生活的理解
  questions.push({
    id: `${bookId}-${chapter}-understand-2`,
    bookId,
    bookName,
    chapter,
    question: `本章如何帮助你更深地理解基督徒的生命？有什么是你需要悔改或更新的？`,
    category: 'understanding',
  });

  return questions;
}

/**
 * 生成唯一的问题 ID
 */
export function generateQuestionId(bookId: string, chapter: number, index: number): string {
  return `${bookId}-${chapter}-${index}`;
}
