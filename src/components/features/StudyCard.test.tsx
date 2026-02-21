import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StudyCard } from './StudyCard';

describe('StudyCard', () => {
  const defaultProps = {
    title: '创世记',
    subtitle: '摩西五经',
    verseCount: 50,
    bgColor: 'green' as const,
    onClick: vi.fn(),
  };

  it('should render title and subtitle', () => {
    render(<StudyCard {...defaultProps} />);
    expect(screen.getByText('创世记')).toBeInTheDocument();
    expect(screen.getByText('摩西五经')).toBeInTheDocument();
  });

  it('should render verse count', () => {
    render(<StudyCard {...defaultProps} />);
    expect(screen.getByText('50 章')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<StudyCard {...defaultProps} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have rounded corners', () => {
    const { container } = render(<StudyCard {...defaultProps} />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('rounded-2xl');
  });
});
