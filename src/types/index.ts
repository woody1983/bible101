// 圣经书卷分类
export interface BibleCategory {
  id: string;
  name: string;
  nameEn: string;
  testament: 'old' | 'new';
  order: number;
  books: BibleBook[];
}

// 书卷
export interface BibleBook {
  id: string;
  name: string;
  nameEn: string;
  nameShort: string;
  abbreviation: string;
  chapters: number;
  categoryId: string;
  order: number;
}

// 章节
export interface BibleChapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  verseCount: number;
  keyVerses: KeyVerse[];
  keyPoints: KeyPoint[];
  studyNotes: StudyNotes;
  application: Application;
  relatedChapters: string[];
}

// 核心句子
export interface KeyVerse {
  id: string;
  verseNumber: number;
  text: string;
  textEn: string;
  highlight: string;
  explanation: string;
}

// 关键观点
export interface KeyPoint {
  id: string;
  title: string;
  content: string;
  order: number;
  icon?: string;
}

// 关键词
export interface KeyTerm {
  term: string;
  definition: string;
  references: string[];
}

// 交叉引用
export interface CrossReference {
  book: string;
  chapter: number;
  verses: string;
  text: string;
}

// 考点解析
export interface StudyNotes {
  historicalContext: string;
  culturalContext: string;
  theologicalThemes: string[];
  keyTerms: KeyTerm[];
  crossReferences: CrossReference[];
}

// 应用问题
export interface Question {
  id: string;
  question: string;
  order: number;
}

// 应用思考
export interface Application {
  personalQuestions: Question[];
  groupQuestions: Question[];
  practicalSteps: string[];
}

// 章节摘要（用于列表展示）
export interface ChapterSummary {
  id: string;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  title: string;
  preview?: string;
}

// 搜索建议
export interface SearchSuggestion {
  type: 'book' | 'chapter' | 'verse';
  reference: string;
  text: string;
  bookId?: string;
  chapter?: number;
  verse?: number;
}

// 搜索结果（用于搜索结果展示）
export interface SearchResult {
  verse: {
    book: string;
    chapter: number;
    verse: number;
    text: string;
  };
  score: number;
  snippet: string;
}
