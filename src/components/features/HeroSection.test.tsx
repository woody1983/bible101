import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  const defaultProps = {
    bookName: '诗篇',
    chapter: 23,
    verseText: '耶和华是我的牧者，我必不至缺乏。',
    verseTextEn: 'The Lord is my shepherd; I shall not want.',
  };

  it('should render book name and chapter', () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByText(/诗篇 23章/)).toBeInTheDocument();
  });

  it('should render Chinese verse text', () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByText(/耶和华是我的牧者/)).toBeInTheDocument();
  });

  it('should render English verse text', () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByText(/The Lord is my shepherd/)).toBeInTheDocument();
  });

  it('should have section element', () => {
    const { container } = render(<HeroSection {...defaultProps} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });
});
