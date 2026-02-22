import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageTabs } from './LanguageTabs';

describe('LanguageTabs', () => {
  const mockOnChange = vi.fn();

  it('should render both language tabs', () => {
    render(
      <LanguageTabs activeTab="zh" onChange={mockOnChange}>
        <div>Content</div>
      </LanguageTabs>
    );
    
    expect(screen.getByText('中文')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('should highlight active tab', () => {
    render(
      <LanguageTabs activeTab="zh" onChange={mockOnChange}>
        <div>Content</div>
      </LanguageTabs>
    );
    
    const zhTab = screen.getByText('中文');
    expect(zhTab.className).toContain('active');
  });

  it('should call onChange when clicking tab', () => {
    render(
      <LanguageTabs activeTab="zh" onChange={mockOnChange}>
        <div>Content</div>
      </LanguageTabs>
    );
    
    fireEvent.click(screen.getByText('English'));
    expect(mockOnChange).toHaveBeenCalledWith('en');
  });

  it('should render children content', () => {
    render(
      <LanguageTabs activeTab="zh" onChange={mockOnChange}>
        <div data-testid="content">Prayer Content</div>
      </LanguageTabs>
    );
    
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
