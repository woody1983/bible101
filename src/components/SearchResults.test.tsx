import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import type { SearchResult } from '../types';

describe('SearchResults', () => {
  const mockResults: SearchResult[] = [
    {
      verse: {
        book: 'psalms',
        chapter: 23,
        verse: 1,
        text: '耶和华是我的牧者，我必不至缺乏。',
      },
      score: 0.1,
      snippet: '...耶和华是我的牧者，我必不至缺乏...',
    },
    {
      verse: {
        book: 'genesis',
        chapter: 1,
        verse: 1,
        text: '起初，上帝创造天地。',
      },
      score: 0.3,
      snippet: '起初，上帝创造天地...',
    },
  ];

  const mockOnResultClick = vi.fn();

  it('should render empty message when no results', () => {
    render(<SearchResults results={[]} query="" />);
    
    expect(screen.getByText('没有找到匹配的经文')).toBeInTheDocument();
  });

  it('should render search query in empty message', () => {
    render(<SearchResults results={[]} query="展翅高飞" />);
    
    expect(screen.getByText('没有找到与 "展翅高飞" 相关的经文')).toBeInTheDocument();
  });

  it('should render results count', () => {
    render(<SearchResults results={mockResults} query="耶和华" />);
    
    expect(screen.getByText('找到 2 条结果')).toBeInTheDocument();
  });

  it('should render book name and reference', () => {
    render(<SearchResults results={mockResults} query="耶和华" />);
    
    expect(screen.getByText('23:1')).toBeInTheDocument();
    expect(screen.getByText('1:1')).toBeInTheDocument();
  });

  it('should render snippet text', () => {
    render(<SearchResults results={mockResults} query="耶和华" />);
    
    // Use getAllByText since text might be split by highlight mark
    const yehovahElements = screen.getAllByText(/耶和华/);
    expect(yehovahElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/起初，上帝创造天地/)).toBeInTheDocument();
  });

  it('should highlight matching query text', () => {
    render(<SearchResults results={mockResults} query="耶和华" />);
    
    const highlightedText = screen.getByText('耶和华');
    expect(highlightedText.tagName).toBe('MARK');
  });

  it('should call onResultClick when clicking a result', () => {
    render(
      <SearchResults 
        results={mockResults} 
        query="耶和华"
        onResultClick={mockOnResultClick}
      />
    );
    
    const resultCards = screen.getAllByText(/匹配度/);
    fireEvent.click(resultCards[0].parentElement!);
    
    expect(mockOnResultClick).toHaveBeenCalledWith(mockResults[0]);
  });

  it('should show match score', () => {
    render(<SearchResults results={mockResults} query="耶和华" />);
    
    // Use getAllByText since there are multiple match scores
    const matchScores = screen.getAllByText(/匹配度/);
    expect(matchScores.length).toBeGreaterThan(0);
  });

  it('should show best match badge for high score results', () => {
    render(<SearchResults results={mockResults} query="耶和华" />);
    
    expect(screen.getByText('最佳匹配')).toBeInTheDocument();
  });

  it('should render custom empty message', () => {
    render(
      <SearchResults 
        results={[]} 
        query=""
        emptyMessage="自定义空消息"
      />
    );
    
    expect(screen.getByText('自定义空消息')).toBeInTheDocument();
  });
});
