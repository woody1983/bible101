import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PrayerModule } from './PrayerModule';

// Mock navigator.language
Object.defineProperty(window, 'navigator', {
  value: {
    language: 'zh-CN',
  },
  writable: true,
});

describe('PrayerModule', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render prayer input form', () => {
    render(<PrayerModule />);
    
    expect(screen.getByPlaceholderText(/请输入/)).toBeInTheDocument();
    expect(screen.getByText(/生成祷告/)).toBeInTheDocument();
  });

  it('should generate prayer when submitting form', async () => {
    render(<PrayerModule />);
    
    const input = screen.getByPlaceholderText(/请输入/);
    fireEvent.change(input, { target: { value: '感谢神的恩典' } });
    
    const button = screen.getByText(/生成祷告/);
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByTestId('prayer-modal')).toBeInTheDocument();
    });
  });

  it('should detect system language', async () => {
    render(<PrayerModule />);
    
    // Open modal first
    const input = screen.getByPlaceholderText(/请输入/);
    fireEvent.change(input, { target: { value: '测试' } });
    fireEvent.click(screen.getByText(/生成祷告/));
    
    await waitFor(() => {
      // Should show Chinese tab as active by default for zh-CN
      const zhTab = screen.getByText('中文');
      expect(zhTab.className).toContain('active');
    });
  });

  it('should switch language tabs', async () => {
    render(<PrayerModule />);
    
    // Open modal first
    const input = screen.getByPlaceholderText(/请输入/);
    fireEvent.change(input, { target: { value: '测试' } });
    fireEvent.click(screen.getByText(/生成祷告/));
    
    await waitFor(() => {
      const enTab = screen.getByText('English');
      fireEvent.click(enTab);
      expect(enTab.className).toContain('active');
    });
  });

  it('should close modal when clicking overlay', async () => {
    render(<PrayerModule />);
    
    // Open modal
    const input = screen.getByPlaceholderText(/请输入/);
    fireEvent.change(input, { target: { value: '测试' } });
    fireEvent.click(screen.getByText(/生成祷告/));
    
    await waitFor(() => {
      expect(screen.getByTestId('prayer-modal')).toBeInTheDocument();
    });
    
    // Close modal
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    
    await waitFor(() => {
      expect(screen.queryByTestId('prayer-modal')).not.toBeInTheDocument();
    });
  });
});
