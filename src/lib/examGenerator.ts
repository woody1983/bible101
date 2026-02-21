import type { ExamQuestion } from '../types/exam';
import type { Chapter } from './bibleParser';

/**
 * 根据章节内容生成问答题
 * 使用简单的规则引擎生成问题
 */
export function generateQuestions(
  bookId: string,
  chapter: number,
  chapterData: Chapter | null
): ExamQuestion[] {
  if (!chapterData || chapterData.verses.length === 0) {
    return [];
  }

  const questions: ExamQuestion[] = [];
  const verses = chapterData.verses;

  // 1. 记忆类问题 - 关于具体事实
  questions.push(...generateMemoryQuestions(bookId, chapter, verses));

  // 2. 理解类问题 - 关于章节主旨
  questions.push(...generateComprehensionQuestions(bookId, chapter, verses));

  // 3. 分析类问题 - 关于关系和意义
  questions.push(...generateAnalysisQuestions(bookId, chapter, verses));

  // 4. 应用类问题 - 关于实际应用
  questions.push(...generateApplicationQuestions(bookId, chapter, verses));

  // 按顺序排序
  return questions.sort((a, b) => a.order - b.order);
}

/**
 * 生成记忆类问题
 */
function generateMemoryQuestions(
  bookId: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // 为前 3 节经文生成记忆问题
  verses.slice(0, 3).forEach((verse, index) => {
    questions.push({
      id: `${bookId}-${chapter}-memory-${index + 1}`,
      bookId,
      chapter,
      question: `第 ${verse.verse} 节提到："${verse.text.substring(0, 30)}..." 请回忆这节经文的完整内容。`,
      order: index + 1,
      difficulty: 'easy',
      category: 'memory',
    });
  });

  return questions;
}

/**
 * 生成理解类问题
 */
function generateComprehensionQuestions(
  bookId: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // 基于章节整体内容生成理解问题
  const firstVerse = verses[0];
  const lastVerse = verses[verses.length - 1];
  
  questions.push({
    id: `${bookId}-${chapter}-comp-1`,
    bookId,
    chapter,
    question: `本章开头（第 ${firstVerse.verse} 节）和结尾（第 ${lastVerse.verse} 节）分别讲了什么？这两部分有什么联系？`,
    order: 10,
    difficulty: 'medium',
    category: 'comprehension',
  });

  questions.push({
    id: `${bookId}-${chapter}-comp-2`,
    bookId,
    chapter,
    question: `本章共有 ${verses.length} 节经文。请简要概括本章的主要主题或核心信息。`,
    order: 11,
    difficulty: 'medium',
    category: 'comprehension',
  });

  return questions;
}

/**
 * 生成分析类问题
 */
function generateAnalysisQuestions(
  bookId: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // 找出包含关键词的经文进行分析
  const keyVerses = verses.filter(v => 
    v.text.includes('上帝') || 
    v.text.includes('神') || 
    v.text.includes('耶和华') ||
    v.text.includes('耶稣')
  );

  if (keyVerses.length > 0) {
    const verse = keyVerses[0];
    questions.push({
      id: `${bookId}-${chapter}-anal-1`,
      bookId,
      chapter,
      question: `第 ${verse.verse} 节提到神的工作/属性。请分析这节经文如何展现神的特质或作为？`,
      order: 20,
      difficulty: 'hard',
      category: 'analysis',
    });
  }

  questions.push({
    id: `${bookId}-${chapter}-anal-2`,
    bookId,
    chapter,
    question: `本章中出现了哪些人物（或受造物）？他们之间的关系是什么？`,
    order: 21,
    difficulty: 'medium',
    category: 'analysis',
  });

  return questions;
}

/**
 * 生成应用类问题
 */
function generateApplicationQuestions(
  bookId: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  questions.push({
    id: `${bookId}-${chapter}-app-1`,
    bookId,
    chapter,
    question: `本章的教导如何应用在你的日常生活中？请举一个具体的例子。`,
    order: 30,
    difficulty: 'medium',
    category: 'application',
  });

  questions.push({
    id: `${bookId}-${chapter}-app-2`,
    bookId,
    chapter,
    question: `如果你要向一位朋友分享本章的内容，你会如何总结并传达其核心信息？`,
    order: 31,
    difficulty: 'hard',
    category: 'application',
  });

  return questions;
}

/**
 * 获取指定书卷和章节的问题数量
 */
export function getQuestionCount(
  bookId: string,
  chapter: number,
  chapterData: Chapter | null
): number {
  const questions = generateQuestions(bookId, chapter, chapterData);
  return questions.length;
}

/**
 * 按类别筛选问题
 */
export function filterQuestionsByCategory(
  questions: ExamQuestion[],
  category: ExamQuestion['category']
): ExamQuestion[] {
  return questions.filter(q => q.category === category);
}

/**
 * 按难度筛选问题
 */
export function filterQuestionsByDifficulty(
  questions: ExamQuestion[],
  difficulty: ExamQuestion['difficulty']
): ExamQuestion[] {
  return questions.filter(q => q.difficulty === difficulty);
}
