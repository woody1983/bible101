// 考官模式 - 问答题类型

export interface ExamQuestion {
  id: string;
  bookId: string;
  chapter: number;
  question: string;
  order: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'comprehension' | 'analysis' | 'application' | 'memory';
}

export interface ExamSession {
  bookId: string;
  chapter: number;
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  startedAt: Date;
  completedAt?: Date;
}

export interface ExamResult {
  totalQuestions: number;
  answeredQuestions: number;
  score?: number;
  completedAt: Date;
}
