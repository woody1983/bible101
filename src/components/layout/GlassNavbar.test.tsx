import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GlassNavbar } from './GlassNavbar';
import { colors } from '../../styles/colors';

describe('GlassNavbar', () => {
  it('should render logo with correct text', () => {
    render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Bible101')).toBeInTheDocument();
  });

  it('should render all navigation items', () => {
    render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('书卷')).toBeInTheDocument();
    expect(screen.getByText('搜索')).toBeInTheDocument();
    expect(screen.getByText('设置')).toBeInTheDocument();
  });

  it('should have glass effect styles', () => {
    const { container } = render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    const nav = container.querySelector('nav');
    expect(nav).toHaveStyle({
      backgroundColor: colors.glass.white,
      backdropFilter: 'blur(12px)',
    });
  });
});
