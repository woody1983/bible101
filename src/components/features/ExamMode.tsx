import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle, Download, Edit2 } from 'lucide-react';
import { colors } from '../../styles/colors';
import { examStorage, type ExamAnswer } from '../../lib/examStorage';
import type { ExamQuestionV2 } from '../../lib/examGeneratorV2';

interface ExamModeProps {
  bookName: string;
  bookId: string;
  chapter: number;
  questions: ExamQuestionV2[];
  onComplete?: () => void;
}

export function ExamMode({ bookName, bookId, chapter, questions, onComplete }: ExamModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [savedAnswers, setSavedAnswers] = useState<Record<string, ExamAnswer>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(Date.now());
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // 加载已保存的答案
  useEffect(() => {
    const loadSavedAnswers = async () => {
      try {
        await examStorage.init();
        const saved = await examStorage.getAnswersByChapter(bookId, chapter);
        const savedMap: Record<string, ExamAnswer> = {};
        saved.forEach((answer) => {
          savedMap[answer.id] = answer;
        });
        setSavedAnswers(savedMap);
        
        const initialAnswers: Record<string, string> = {};
        saved.forEach((answer) => {
          initialAnswers[answer.id] = answer.answer;
        });
        setAnswers(initialAnswers);
      } catch (error) {
        console.error('Failed to load saved answers:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedAnswers();
  }, [bookId, chapter]);

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const saveCurrentAnswer = async () => {
    const answerText = answers[currentQuestion.id];
    if (!answerText) return;

    try {
      const answer: ExamAnswer = {
        id: currentQuestion.id,
        bookId,
        bookName,
        chapter,
        question: currentQuestion.question,
        answer: answerText,
        updatedAt: new Date().toISOString(),
      };
      
      await examStorage.saveAnswer(answer);
      setSavedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answer,
      }));
    } catch (error) {
      console.error('Failed to save answer:', error);
    }
  };

  const handleNext = async () => {
    await saveCurrentAnswer();
    
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsEditing(false);
    } else {
      setIsCompleted(true);
      onComplete?.();
    }
  };

  const handlePrevious = async () => {
    await saveCurrentAnswer();
    
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsEditing(false);
    }
  };

  const handleExport = async () => {
    try {
      const csv = await examStorage.exportToCSV();
      examStorage.downloadCSV(csv, `${bookName}_${chapter}_answers.csv`);
    } catch (error) {
      console.error('Failed to export:', error);
    }
  };

  const handleDoubleClick = () => {
    if (savedAnswers[currentQuestion.id]) {
      setIsEditing(true);
    }
  };

  const getCategoryLabel = (category: ExamQuestionV2['category']) => {
    const labels = {
      reflection: '反思',
      application: '应用',
      understanding: '理解',
    };
    return labels[category];
  };

  const getCategoryColor = (category: ExamQuestionV2['category']) => {
    const colors_map = {
      reflection: colors.secondary.DEFAULT,
      application: colors.primary.DEFAULT,
      understanding: colors.accent.purple,
    };
    return colors_map[category];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: colors.primary.DEFAULT }}
        />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl"
        style={{ backgroundColor: colors.background.soft }}
      >
        <BookOpen size={48} style={{ color: colors.text.muted }} className="mx-auto mb-4" />
        <p style={{ color: colors.text.secondary }}>暂无问题</p>
      </div>
    );
  }

  if (isCompleted) {
    const answeredCount = Object.keys(savedAnswers).length;
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return (
      <div className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: colors.background.soft }}
      >
        <CheckCircle size={64} style={{ color: colors.primary.DEFAULT }} className="mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text.primary }}>
          答题完成！
        </h2>
        
        <div className="space-y-2 mb-6">
          <p style={{ color: colors.text.secondary }}>
            共 {totalQuestions} 题，已回答 {answeredCount} 题
          </p>
          <p style={{ color: colors.text.secondary }}>
            用时：{minutes} 分 {seconds} 秒
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium mx-auto mb-4 transition-all hover:scale-105"
          style={{ 
            backgroundColor: colors.secondary.DEFAULT,
            color: colors.text.inverse,
          }}
        >
          <Download size={20} />
          导出答案 (CSV)
        </button>
        
        <button
          onClick={() => {
            setCurrentIndex(0);
            setIsCompleted(false);
          }}
          className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
          style={{ 
            backgroundColor: colors.glass.white,
            color: colors.text.secondary,
          }}
        >
          重新查看
        </button>
      </div>
    );
  }

  const hasSavedAnswer = savedAnswers[currentQuestion.id];
  const isEditMode = isEditing || !hasSavedAnswer;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-xl"
        style={{ backgroundColor: colors.glass.white }}
      >
        <div className="flex items-center gap-2">
          <BookOpen size={20} style={{ color: colors.primary.DEFAULT }} />
          <span style={{ color: colors.text.secondary }}>
            {bookName} 第 {chapter} 章
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock size={16} style={{ color: colors.text.muted }} />
          <span style={{ color: colors.text.muted }}>
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: colors.primary.light }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ 
            width: `${progress}%`,
            backgroundColor: colors.primary.DEFAULT,
          }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-2xl p-6 md:p-8"
        style={{ 
          backgroundColor: colors.background.DEFAULT,
          border: `1px solid ${colors.primary.light}`,
        }}
      >
        {/* Question Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: getCategoryColor(currentQuestion.category) + '20',
              color: getCategoryColor(currentQuestion.category),
            }}
          >
            {getCategoryLabel(currentQuestion.category)}
          </span>
          
          {hasSavedAnswer && (
            <span
              className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
              style={{ 
                backgroundColor: colors.primary.light,
                color: colors.primary.dark,
              }}
            >
              <Edit2 size={12} />
              已保存（双击编辑）
            </span>
          )}
        </div>

        {/* Question Text */}
        <h3 className="text-xl md:text-2xl font-medium mb-4 leading-relaxed"
          style={{ color: colors.text.primary }}
        >
          {currentQuestion.question}
        </h3>

        {currentQuestion.verseReference && (
          <p className="text-sm mb-6 italic"
            style={{ color: colors.text.muted }}
          >
            参考经文：{currentQuestion.verseReference}
          </p>
        )}

        {/* Answer Input */}
        <div onDoubleClick={handleDoubleClick}>
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="请写下你的思考和感悟..."
            className="w-full p-4 rounded-xl resize-none focus:outline-none focus:ring-2 transition-all"
            style={{ 
              backgroundColor: isEditMode ? colors.background.soft : colors.glass.light,
              color: colors.text.primary,
              minHeight: '150px',
            }}
            rows={5}
            readOnly={!isEditMode}
          />
          
          {!isEditMode && hasSavedAnswer && (
            <p className="text-sm mt-2" style={{ color: colors.text.muted }}>
              双击文本框可以编辑答案
            </p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: currentIndex === 0 ? colors.glass.light : colors.glass.white,
            color: colors.text.secondary,
          }}
        >
          <ChevronLeft size={20} />
          上一题
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all hover:scale-105"
          style={{ 
            backgroundColor: colors.primary.DEFAULT,
            color: colors.text.inverse,
          }}
        >
          {currentIndex === totalQuestions - 1 ? '完成' : '下一题'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
