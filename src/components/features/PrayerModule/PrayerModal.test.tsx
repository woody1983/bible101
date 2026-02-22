import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PrayerModal } from './PrayerModal';

describe('PrayerModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render modal when isOpen is true', () => {
    render(
      <PrayerModal isOpen={true} onClose={mockOnClose}>
        <div>Prayer Content</div>
      </PrayerModal>
    );
    
    expect(screen.getByText('Prayer Content')).toBeInTheDocument();
  });

  it('should not render when isOpen is false', () => {
    render(
      <PrayerModal isOpen={false} onClose={mockOnClose}>
        <div>Prayer Content</div>
      </PrayerModal>
    );
    
    expect(screen.queryByText('Prayer Content')).not.toBeInTheDocument();
  });

  it('should call onClose when clicking overlay', () => {
    render(
      <PrayerModal isOpen={true} onClose={mockOnClose}>
        <div>Prayer Content</div>
      </PrayerModal>
    );
    
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should not close when clicking modal content', () => {
    render(
      <PrayerModal isOpen={true} onClose={mockOnClose}>
        <div data-testid="modal-content">Prayer Content</div>
      </PrayerModal>
    );
    
    const content = screen.getByTestId('modal-content');
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should render close button', () => {
    render(
      <PrayerModal isOpen={true} onClose={mockOnClose}>
        <div>Prayer Content</div>
      </PrayerModal>
    );
    
    const closeButton = screen.getByLabelText('关闭');
    expect(closeButton).toBeInTheDocument();
  });

  it('should call onClose when clicking close button', () => {
    render(
      <PrayerModal isOpen={true} onClose={mockOnClose}>
        <div>Prayer Content</div>
      </PrayerModal>
    );
    
    const closeButton = screen.getByLabelText('关闭');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
