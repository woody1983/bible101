import { describe, it, expect } from 'vitest';
import {
  generateQuestions,
  getQuestionCount,
  filterQuestionsByCategory,
  filterQuestionsByDifficulty,
} from './examGenerator';
import type { Chapter } from './bibleParser';

describe('Exam Generator', () => {
  const mockChapter: Chapter = {
    chapter: 1,
    verses: [
      { verse: 1, text: '起初，上帝创造天地。', textEn: 'In the beginning God created the heaven and the earth.' },
      { verse: 2, text: '地是空虚混沌，渊面黑暗；上帝的灵运行在水面上。', textEn: 'And the earth was without form, and void; and darkness was upon the face of the deep.' },
      { verse: 3, text: '上帝说：要有光，就有了光。', textEn: 'And God said, Let there be light: and there was light.' },
    ],
  };

  describe('generateQuestions', () => {
    it('should return empty array for null chapter data', () => {
      const questions = generateQuestions('genesis', 1, null);
      expect(questions).toEqual([]);
    });

    it('should return empty array for empty verses', () => {
      const emptyChapter: Chapter = { chapter: 1, verses: [] };
      const questions = generateQuestions('genesis', 1, emptyChapter);
      expect(questions).toEqual([]);
    });

    it('should generate questions for valid chapter data', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should generate questions with correct structure', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const firstQuestion = questions[0];
      
      expect(firstQuestion.id).toBeDefined();
      expect(firstQuestion.bookId).toBe('genesis');
      expect(firstQuestion.chapter).toBe(1);
      expect(firstQuestion.question).toBeDefined();
      expect(firstQuestion.order).toBeDefined();
      expect(firstQuestion.difficulty).toBeDefined();
      expect(firstQuestion.category).toBeDefined();
    });

    it('should include memory questions', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const memoryQuestions = questions.filter(q => q.category === 'memory');
      expect(memoryQuestions.length).toBeGreaterThan(0);
    });

    it('should include comprehension questions', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const comprehensionQuestions = questions.filter(q => q.category === 'comprehension');
      expect(comprehensionQuestions.length).toBeGreaterThan(0);
    });

    it('should include analysis questions', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const analysisQuestions = questions.filter(q => q.category === 'analysis');
      expect(analysisQuestions.length).toBeGreaterThan(0);
    });

    it('should include application questions', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const applicationQuestions = questions.filter(q => q.category === 'application');
      expect(applicationQuestions.length).toBeGreaterThan(0);
    });

    it('should sort questions by order', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      for (let i = 1; i < questions.length; i++) {
        expect(questions[i].order).toBeGreaterThanOrEqual(questions[i - 1].order);
      }
    });
  });

  describe('getQuestionCount', () => {
    it('should return 0 for null chapter', () => {
      const count = getQuestionCount('genesis', 1, null);
      expect(count).toBe(0);
    });

    it('should return correct count for valid chapter', () => {
      const count = getQuestionCount('genesis', 1, mockChapter);
      expect(count).toBeGreaterThan(0);
    });
  });

  describe('filterQuestionsByCategory', () => {
    it('should filter questions by category', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const memoryQuestions = filterQuestionsByCategory(questions, 'memory');
      
      expect(memoryQuestions.length).toBeGreaterThan(0);
      memoryQuestions.forEach(q => {
        expect(q.category).toBe('memory');
      });
    });

    it('should return empty array if no matching category', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const filtered = filterQuestionsByCategory(questions, 'memory');
      const nonExistent = filtered.filter(q => q.category === 'nonexistent');
      expect(nonExistent).toEqual([]);
    });
  });

  describe('filterQuestionsByDifficulty', () => {
    it('should filter questions by difficulty', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const easyQuestions = filterQuestionsByDifficulty(questions, 'easy');
      
      easyQuestions.forEach(q => {
        expect(q.difficulty).toBe('easy');
      });
    });
  });
});
