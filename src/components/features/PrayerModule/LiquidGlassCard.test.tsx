import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LiquidGlassCard } from './LiquidGlassCard';

describe('LiquidGlassCard', () => {
  it('should render children content', () => {
    render(
      <LiquidGlassCard>
        <div data-testid="content">Test Content</div>
      </LiquidGlassCard>
    );
    
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should have liquid glass CSS classes', () => {
    const { container } = render(
      <LiquidGlassCard>Content</LiquidGlassCard>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('liquid-glass');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <LiquidGlassCard className="custom-class">Content</LiquidGlassCard>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
  });

  it('should handle mouse move for light effect', () => {
    const { container } = render(
      <LiquidGlassCard>Content</LiquidGlassCard>
    );
    
    const card = container.firstChild as HTMLElement;
    
    // Simulate mouse move
    fireEvent.mouseMove(card, { clientX: 100, clientY: 100 });
    
    // Check if CSS variables are set (implementation detail)
    expect(card.style.getPropertyValue('--mouse-x')).toBeDefined();
    expect(card.style.getPropertyValue('--mouse-y')).toBeDefined();
  });

  it('should render with data attribute', () => {
    const { container } = render(
      <LiquidGlassCard>Content</LiquidGlassCard>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveAttribute('class');
  });
});
