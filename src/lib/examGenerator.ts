import type { ExamQuestion } from '../types/exam';
import type { Chapter } from './bibleParser';

interface GenerateQuestionsOptions {
  memoryDensity?: 'low' | 'medium' | 'high';
  includeCategories?: Array<'memory' | 'comprehension' | 'analysis' | 'application'>;
}

/**
 * 根据章节内容生成问答题
 * 使用简单的规则引擎生成问题
 * 
 * @param bookId - 书卷ID
 * @param chapter - 章节号
 * @param chapterData - 章节数据
 * @param options - 配置选项
 *   - memoryDensity: 记忆类问题密度 ('low' | 'medium' | 'high')
 *   - includeCategories: 要包含的问题类别
 */
export function generateQuestions(
  bookId: string,
  chapter: number,
  chapterData: Chapter | null,
  options: GenerateQuestionsOptions = {}
): ExamQuestion[] {
  if (!chapterData || chapterData.verses.length === 0) {
    return [];
  }

  const { 
    memoryDensity = 'medium',
    includeCategories = ['memory', 'comprehension', 'analysis', 'application']
  } = options;

  const questions: ExamQuestion[] = [];
  const verses = chapterData.verses;

  // 1. 记忆类问题 - 关于具体事实
  if (includeCategories.includes('memory')) {
    questions.push(...generateMemoryQuestions(bookId, chapter, verses, memoryDensity));
  }

  // 2. 理解类问题 - 关于章节主旨
  if (includeCategories.includes('comprehension')) {
    questions.push(...generateComprehensionQuestions(bookId, chapter, verses));
  }

  // 3. 分析类问题 - 关于关系和意义
  if (includeCategories.includes('analysis')) {
    questions.push(...generateAnalysisQuestions(bookId, chapter, verses));
  }

  // 4. 应用类问题 - 关于实际应用
  if (includeCategories.includes('application')) {
    questions.push(...generateApplicationQuestions(bookId, chapter, verses));
  }

  // 按顺序排序
  return questions.sort((a, b) => a.order - b.order);
}

/**
 * 生成记忆类问题
 * 可配置密度：根据章节长度动态选择经文数量
 */
function generateMemoryQuestions(
  bookId: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>,
  density: 'low' | 'medium' | 'high' = 'medium'
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // 根据密度确定要生成问题的经文数量
  const densityMap = {
    low: Math.max(1, Math.floor(verses.length * 0.1)),    // 10% 的经文
    medium: Math.max(2, Math.floor(verses.length * 0.2)), // 20% 的经文
    high: Math.max(3, Math.floor(verses.length * 0.3)),   // 30% 的经文
  };
  
  const count = Math.min(densityMap[density], verses.length);
  
  // 策略：选择关键位置的经文（开头、中间、结尾）
  const selectedIndices = selectRepresentativeVerses(verses.length, count);
  
  selectedIndices.forEach((verseIndex, index) => {
    const verse = verses[verseIndex];
    const templates = [
      `第 ${verse.verse} 节提到："${verse.text.substring(0, 30)}..." 请回忆这节经文的完整内容。`,
      `请背诵第 ${verse.verse} 节的经文。`,
      `第 ${verse.verse} 节说："${verse.text.substring(0, 20)}..." 这节经文的后半部分是什么？`,
    ];
    
    questions.push({
      id: `${bookId}-${chapter}-memory-${index + 1}`,
      bookId,
      chapter,
      question: templates[index % templates.length],
      order: index + 1,
      difficulty: 'easy',
      category: 'memory',
    });
  });

  return questions;
}

/**
 * 选择有代表性的经文位置
 */
function selectRepresentativeVerses(totalVerses: number, count: number): number[] {
  if (count >= totalVerses) {
    return Array.from({ length: totalVerses }, (_, i) => i);
  }
  
  const indices: number[] = [];
  
  // 总是包含开头
  indices.push(0);
  
  // 如果数量允许，包含结尾
  if (count > 1) {
    indices.push(totalVerses - 1);
  }
  
  // 在剩余空间中均匀分布
  const remaining = count - indices.length;
  if (remaining > 0 && totalVerses > 2) {
    const step = (totalVerses - 2) / (remaining + 1);
    for (let i = 1; i <= remaining; i++) {
      const index = Math.round(i * step);
      if (!indices.includes(index) && index < totalVerses - 1) {
        indices.push(index);
      }
    }
  }
  
  return indices.sort((a, b) => a - b);
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
 * 支持多个关键词经文，扩大分析范围
 */
function generateAnalysisQuestions(
  bookId: string,
  chapter: number,
  verses: Array<{ verse: number; text: string; textEn: string }>
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  
  // 扩展关键词列表，包含更多神学概念
  const theologicalKeywords = [
    { keyword: '上帝', type: '神性' },
    { keyword: '神', type: '神性' },
    { keyword: '耶和华', type: '神性' },
    { keyword: '耶稣', type: '基督' },
    { keyword: '基督', type: '基督' },
    { keyword: '圣灵', type: '圣灵' },
    { keyword: '爱', type: '属性' },
    { keyword: '恩典', type: '属性' },
    { keyword: '信', type: '信仰' },
    { keyword: '罪', type: '救恩' },
    { keyword: '救赎', type: '救恩' },
    { keyword: '盼望', type: '信仰' },
  ];
  
  // 找出包含关键词的经文，最多取前3个
  const keyVerses: Array<{ verse: typeof verses[0]; keyword: string; type: string }> = [];
  
  for (const { keyword, type } of theologicalKeywords) {
    const found = verses.find(v => 
      v.text.includes(keyword) && 
      !keyVerses.some(kv => kv.verse.verse === v.verse)
    );
    if (found) {
      keyVerses.push({ verse: found, keyword, type });
    }
    if (keyVerses.length >= 3) break;
  }

  // 为每个关键经文生成分析问题
  keyVerses.forEach((item, index) => {
    const templates = [
      `第 ${item.verse.verse} 节提到"${item.keyword}"（${item.type}）。请分析这节经文如何展现${item.type}的特质？`,
      `第 ${item.verse.verse} 节中的"${item.keyword}"一词有何神学意义？请结合上下文分析。`,
      `请解释第 ${item.verse.verse} 节中"${item.keyword}"这个概念在本章中的作用。`,
    ];
    
    questions.push({
      id: `${bookId}-${chapter}-anal-${index + 1}`,
      bookId,
      chapter,
      question: templates[index % templates.length],
      order: 20 + index,
      difficulty: 'hard',
      category: 'analysis',
    });
  });

  // 如果没有找到关键词，生成一个通用分析题
  if (keyVerses.length === 0) {
    questions.push({
      id: `${bookId}-${chapter}-anal-1`,
      bookId,
      chapter,
      question: `本章的核心主题是什么？请分析作者通过本章想要传达的主要信息。`,
      order: 20,
      difficulty: 'hard',
      category: 'analysis',
    });
  }

  // 添加人物关系分析题
  questions.push({
    id: `${bookId}-${chapter}-anal-relation`,
    bookId,
    chapter,
    question: `本章中出现了哪些人物（或受造物）？他们之间的关系是什么？这些关系如何反映神学真理？`,
    order: 25,
    difficulty: 'medium',
    category: 'analysis',
  });

  // 添加结构分析题
  questions.push({
    id: `${bookId}-${chapter}-anal-structure`,
    bookId,
    chapter,
    question: `本章的经文结构是如何组织的？这种结构如何帮助理解作者意图？`,
    order: 26,
    difficulty: 'hard',
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
  chapterData: Chapter | null,
  options?: GenerateQuestionsOptions
): number {
  const questions = generateQuestions(bookId, chapter, chapterData, options);
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
