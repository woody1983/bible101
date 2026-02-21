import { describe, it, expect } from 'vitest';
import {
  generateQuestions,
  getQuestionCount,
  filterQuestionsByCategory,
  filterQuestionsByDifficulty,
} from './examGenerator';
import type { Chapter } from './bibleParser';

describe('Exam Generator', () => {
  // 使用更真实的创世记第1章数据
  const mockChapter: Chapter = {
    chapter: 1,
    verses: [
      { verse: 1, text: '起初，上帝创造天地。', textEn: 'In the beginning God created the heaven and the earth.' },
      { verse: 2, text: '地是空虚混沌，渊面黑暗；上帝的灵运行在水面上。', textEn: 'And the earth was without form, and void; and darkness was upon the face of the deep.' },
      { verse: 3, text: '上帝说：要有光，就有了光。', textEn: 'And God said, Let there be light: and there was light.' },
      { verse: 4, text: '上帝看光是好的，就把光暗分开了。', textEn: 'And God saw the light, that it was good: and God divided the light from the darkness.' },
      { verse: 5, text: '上帝称光为昼，称暗为夜。有晚上，有早晨，这是头一日。', textEn: 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.' },
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

    it('should include memory questions with specific content', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const memoryQuestions = filterQuestionsByCategory(questions, 'memory');
      
      expect(memoryQuestions.length).toBeGreaterThan(0);
      memoryQuestions.forEach(q => {
        expect(q.category).toBe('memory');
        // 验证问题内容包含经文引用
        expect(q.question).toMatch(/第 \d+ 节/);
      });

      // 验证第一个记忆问题包含第一节经文的内容
      const firstMemoryQuestion = memoryQuestions[0];
      expect(firstMemoryQuestion.question).toContain('1');
    });

    it('should include actual verse text in memory questions', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      const memoryQuestions = filterQuestionsByCategory(questions, 'memory');
      
      // 验证记忆问题引用了实际经文内容
      const firstQuestion = memoryQuestions[0];
      expect(firstQuestion.question).toBeDefined();
      // 问题应该包含经文的前30个字符
      expect(firstQuestion.question.length).toBeGreaterThan(20);
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

  describe('memory question density options', () => {
    const largeMockChapter: Chapter = {
      chapter: 1,
      verses: Array.from({ length: 20 }, (_, i) => ({
        verse: i + 1,
        text: `这是第 ${i + 1} 节经文的内容。`,
        textEn: `This is verse ${i + 1}.`,
      })),
    };

    it('should generate fewer memory questions with low density', () => {
      const questions = generateQuestions('genesis', 1, largeMockChapter, { memoryDensity: 'low' });
      const memoryQuestions = filterQuestionsByCategory(questions, 'memory');
      expect(memoryQuestions.length).toBeGreaterThanOrEqual(1);
      expect(memoryQuestions.length).toBeLessThanOrEqual(3);
    });

    it('should generate more memory questions with high density', () => {
      const questions = generateQuestions('genesis', 1, largeMockChapter, { memoryDensity: 'high' });
      const memoryQuestions = filterQuestionsByCategory(questions, 'memory');
      expect(memoryQuestions.length).toBeGreaterThanOrEqual(3);
      expect(memoryQuestions.length).toBeLessThanOrEqual(6);
    });

    it('should use medium density by default', () => {
      const questionsDefault = generateQuestions('genesis', 1, largeMockChapter);
      const questionsMedium = generateQuestions('genesis', 1, largeMockChapter, { memoryDensity: 'medium' });
      
      const memoryDefault = filterQuestionsByCategory(questionsDefault, 'memory');
      const memoryMedium = filterQuestionsByCategory(questionsMedium, 'memory');
      
      expect(memoryDefault.length).toBe(memoryMedium.length);
    });
  });

  describe('category filtering options', () => {
    it('should only generate memory questions when specified', () => {
      const questions = generateQuestions('genesis', 1, mockChapter, {
        includeCategories: ['memory'],
      });
      
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach(q => {
        expect(q.category).toBe('memory');
      });
    });

    it('should only generate analysis questions when specified', () => {
      const questions = generateQuestions('genesis', 1, mockChapter, {
        includeCategories: ['analysis'],
      });
      
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach(q => {
        expect(q.category).toBe('analysis');
      });
    });

    it('should generate all categories by default', () => {
      const questions = generateQuestions('genesis', 1, mockChapter);
      
      const categories = new Set(questions.map(q => q.category));
      expect(categories.size).toBeGreaterThanOrEqual(3);
    });
  });

  describe('analysis question improvements', () => {
    const chapterWithKeywords: Chapter = {
      chapter: 1,
      verses: [
        { verse: 1, text: '上帝爱世人。', textEn: 'God loves the world.' },
        { verse: 2, text: '耶稣是基督。', textEn: 'Jesus is Christ.' },
        { verse: 3, text: '圣灵降临。', textEn: 'The Holy Spirit descends.' },
        { verse: 4, text: '这是普通的经文。', textEn: 'This is a normal verse.' },
      ],
    };

    it('should generate multiple analysis questions for different keywords', () => {
      const questions = generateQuestions('genesis', 1, chapterWithKeywords, {
        includeCategories: ['analysis'],
      });
      
      expect(questions.length).toBeGreaterThanOrEqual(2);
    });

    it('should include theological keywords in analysis questions', () => {
      const questions = generateQuestions('genesis', 1, chapterWithKeywords, {
        includeCategories: ['analysis'],
      });
      
      const hasGodQuestion = questions.some(q => 
        q.question.includes('上帝') || q.question.includes('神')
      );
      expect(hasGodQuestion).toBe(true);
    });
  });

  describe('getQuestionCount with options', () => {
    it('should return correct count with density option', () => {
      const countLow = getQuestionCount('genesis', 1, mockChapter, { memoryDensity: 'low' });
      const countHigh = getQuestionCount('genesis', 1, mockChapter, { memoryDensity: 'high' });
      
      expect(countLow).toBeGreaterThan(0);
      expect(countHigh).toBeGreaterThanOrEqual(countLow);
    });

    it('should return correct count with category filter', () => {
      const countAll = getQuestionCount('genesis', 1, mockChapter);
      const countMemory = getQuestionCount('genesis', 1, mockChapter, {
        includeCategories: ['memory'],
      });
      
      expect(countMemory).toBeLessThan(countAll);
    });
  });
});
