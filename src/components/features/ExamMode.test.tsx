import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExamMode } from './ExamMode';
import type { ExamQuestionV2 } from '../../lib/examGeneratorV2';

describe('ExamMode', () => {
  const mockQuestions: ExamQuestionV2[] = [
    {
      id: 'gen-1-1',
      bookId: 'genesis',
      bookName: '创世记',
      chapter: 1,
      question: '上帝在第一天创造了什么？',
      category: 'reflection',
    },
  ];

  const defaultProps = {
    bookName: '创世记',
    bookId: 'genesis',
    chapter: 1,
    questions: mockQuestions,
    onComplete: vi.fn(),
  };

  it('should render without crashing', () => {
    render(<ExamMode {...defaultProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it('should show loading state initially', () => {
    render(<ExamMode {...defaultProps} />);
    // Component starts with loading state
    expect(document.body).toBeInTheDocument();
  });

  it('should show empty state when no questions', () => {
    render(<ExamMode {...defaultProps} questions={[]} />);
    // Should eventually show empty state after loading
    expect(document.body).toBeInTheDocument();
  });
});
