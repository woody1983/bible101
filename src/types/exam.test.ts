import { describe, it, expect } from 'vitest';
import type { ExamQuestion, ExamSession, ExamResult } from './exam';

describe('Exam Types', () => {
  describe('ExamQuestion', () => {
    it('should have required fields', () => {
      const question: ExamQuestion = {
        id: 'gen-1-1',
        bookId: 'genesis',
        chapter: 1,
        question: '上帝在第一天创造了什么？',
        order: 1,
        difficulty: 'easy',
        category: 'memory',
      };
      
      expect(question.id).toBeDefined();
      expect(question.bookId).toBe('genesis');
      expect(question.chapter).toBe(1);
      expect(question.question).toBeDefined();
      expect(question.order).toBe(1);
      expect(question.difficulty).toBe('easy');
      expect(question.category).toBe('memory');
    });

    it('should accept all difficulty levels', () => {
      const difficulties: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
      difficulties.forEach((difficulty) => {
        const question: ExamQuestion = {
          id: 'test',
          bookId: 'genesis',
          chapter: 1,
          question: 'Test',
          order: 1,
          difficulty,
          category: 'memory',
        };
        expect(question.difficulty).toBe(difficulty);
      });
    });

    it('should accept all categories', () => {
      const categories: Array<'memory' | 'comprehension' | 'analysis' | 'application'> = [
        'memory', 'comprehension', 'analysis', 'application'
      ];
      categories.forEach((category) => {
        const question: ExamQuestion = {
          id: 'test',
          bookId: 'genesis',
          chapter: 1,
          question: 'Test',
          order: 1,
          difficulty: 'easy',
          category,
        };
        expect(question.category).toBe(category);
      });
    });
  });

  describe('ExamSession', () => {
    it('should initialize with correct structure', () => {
      const session: ExamSession = {
        bookId: 'genesis',
        chapter: 1,
        questions: [],
        currentIndex: 0,
        answers: {},
        startedAt: new Date(),
      };
      
      expect(session.bookId).toBe('genesis');
      expect(session.chapter).toBe(1);
      expect(session.questions).toEqual([]);
      expect(session.currentIndex).toBe(0);
      expect(session.answers).toEqual({});
      expect(session.startedAt).toBeInstanceOf(Date);
    });
  });

  describe('ExamResult', () => {
    it('should have result fields', () => {
      const result: ExamResult = {
        totalQuestions: 10,
        answeredQuestions: 8,
        score: 80,
        completedAt: new Date(),
      };
      
      expect(result.totalQuestions).toBe(10);
      expect(result.answeredQuestions).toBe(8);
      expect(result.score).toBe(80);
      expect(result.completedAt).toBeInstanceOf(Date);
    });
  });
});
