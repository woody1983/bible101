import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchPage } from './SearchPage';

// Mock the components and hooks
vi.mock('../components/SearchBar', () => ({
  SearchBar: ({ onSearch, loading }: any) => (
    <div data-testid="search-bar">
      <input
        data-testid="search-input"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="搜索经文关键词..."
      />
      {loading && <span data-testid="loading">加载中...</span>}
    </div>
  ),
}));

vi.mock('../components/SearchResults', () => ({
  SearchResults: ({ results, query, emptyMessage }: any) => (
    <div data-testid="search-results">
      <span data-testid="results-count">{results.length} 条结果</span>
      <span data-testid="query">{query}</span>
      <span data-testid="empty-message">{emptyMessage}</span>
    </div>
  ),
}));

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search page title', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('搜索圣经')).toBeInTheDocument();
  });

  it('should render SearchBar component', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('搜索经文关键词...')).toBeInTheDocument();
  });

  it('should render SearchResults component', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('search-results')).toBeInTheDocument();
  });

  it('should show empty message for short query', () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    
    const emptyMessage = screen.getByTestId('empty-message');
    expect(emptyMessage.textContent).toContain('2个字符');
  });

  it('should handle search input', async () => {
    render(
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    );
    
    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    await waitFor(() => {
      expect(screen.getByTestId('query').textContent).toBe('耶和华');
    });
  });
});
