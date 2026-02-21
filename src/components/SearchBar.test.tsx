import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import type { SearchSuggestion } from '../types';

describe('SearchBar', () => {
  const mockSuggestions: SearchSuggestion[] = [
    { type: 'verse', reference: '诗篇 23:1', text: '耶和华是我的牧者', bookId: 'psalms', chapter: 23, verse: 1 },
    { type: 'verse', reference: '诗篇 23:2', text: '他使我躺卧在青草地上', bookId: 'psalms', chapter: 23, verse: 2 },
    { type: 'book', reference: '创世记', text: '创世记', bookId: 'genesis' },
  ];

  const mockOnSearch = vi.fn();
  const mockOnSuggestionSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search input', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    expect(screen.getByLabelText('搜索圣经经文')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('搜索圣经经文...')).toBeInTheDocument();
  });

  it('should call onSearch when input changes', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByLabelText('搜索圣经经文');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('耶和华');
  });

  it('should show suggestions when input has 2+ characters', async () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        suggestions={mockSuggestions}
      />
    );
    
    const input = screen.getByLabelText('搜索圣经经文');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('should display suggestion text and reference', async () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        suggestions={mockSuggestions}
      />
    );
    
    const input = screen.getByLabelText('搜索圣经经文');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    await waitFor(() => {
      expect(screen.getByText('耶和华是我的牧者')).toBeInTheDocument();
      expect(screen.getByText('诗篇 23:1')).toBeInTheDocument();
    });
  });

  it('should call onSuggestionSelect when clicking a suggestion', async () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch}
        onSuggestionSelect={mockOnSuggestionSelect}
        suggestions={mockSuggestions}
      />
    );
    
    const input = screen.getByLabelText('搜索圣经经文');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    await waitFor(() => {
      const suggestion = screen.getByText('耶和华是我的牧者');
      fireEvent.click(suggestion);
    });
    
    expect(mockOnSuggestionSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });

  it('should handle keyboard navigation', async () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch}
        onSuggestionSelect={mockOnSuggestionSelect}
        suggestions={mockSuggestions}
      />
    );
    
    const input = screen.getByLabelText('搜索圣经经文');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    // Press arrow down
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    
    // Press enter to select
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnSuggestionSelect).toHaveBeenCalled();
  });

  it('should close suggestions on Escape key', async () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch}
        suggestions={mockSuggestions}
      />
    );
    
    const input = screen.getByLabelText('搜索圣经经文');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
    
    fireEvent.keyDown(input, { key: 'Escape' });
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('should show loading indicator when loading prop is true', () => {
    render(<SearchBar onSearch={mockOnSearch} loading={true} />);
    
    // Loading spinner should be visible
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('should not show suggestions for single character input', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch}
        suggestions={mockSuggestions}
      />
    );
    
    const input = screen.getByLabelText('搜索圣经经文');
    fireEvent.change(input, { target: { value: '耶和华' } });
    
    // Should show for 2+ characters
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
    
    fireEvent.change(input, { target: { value: 'Y' } });
    
    // Should not show for single character
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
