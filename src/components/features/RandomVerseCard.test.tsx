import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RandomVerseCard } from './RandomVerseCard';
import type { RandomVerse } from '../../lib/randomVerse';

describe('RandomVerseCard', () => {
  const mockVerse: RandomVerse = {
    bookId: 'psalms',
    bookName: '诗篇',
    bookNameEn: 'Psalms',
    chapter: 23,
    verse: 1,
    text: '耶和华是我的牧者，我必不至缺乏。',
    textEn: 'The Lord is my shepherd; I shall not want.',
  };

  it('should render verse text', () => {
    render(<RandomVerseCard verse={mockVerse} onRefresh={vi.fn()} />);
    expect(screen.getByText(/耶和华是我的牧者/)).toBeInTheDocument();
  });

  it('should render English text', () => {
    render(<RandomVerseCard verse={mockVerse} onRefresh={vi.fn()} />);
    expect(screen.getByText(/The Lord is my shepherd/)).toBeInTheDocument();
  });

  it('should render reference', () => {
    render(<RandomVerseCard verse={mockVerse} onRefresh={vi.fn()} />);
    expect(screen.getByText(/诗篇 23:1/)).toBeInTheDocument();
  });

  it('should render English reference', () => {
    render(<RandomVerseCard verse={mockVerse} onRefresh={vi.fn()} />);
    expect(screen.getByText(/Psalms 23:1/)).toBeInTheDocument();
  });

  it('should render refresh button', () => {
    render(<RandomVerseCard verse={mockVerse} onRefresh={vi.fn()} />);
    expect(screen.getByText(/换一段/)).toBeInTheDocument();
  });

  it('should call onRefresh when button clicked', () => {
    const onRefresh = vi.fn();
    render(<RandomVerseCard verse={mockVerse} onRefresh={onRefresh} />);
    fireEvent.click(screen.getByText(/换一段/));
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it('should show loading state', () => {
    render(<RandomVerseCard verse={mockVerse} onRefresh={vi.fn()} isLoading={true} />);
    expect(screen.getByText(/加载中/)).toBeInTheDocument();
  });

  it('should show empty state when no verse', () => {
    render(<RandomVerseCard verse={null} onRefresh={vi.fn()} />);
    expect(screen.getByText(/暂无经文/)).toBeInTheDocument();
  });
});
