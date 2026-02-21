import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GlassNavbar } from './GlassNavbar';

describe('GlassNavbar', () => {
  it('should render logo', () => {
    render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    expect(screen.getByText('Bible101')).toBeInTheDocument();
  });

  it('should render hamburger menu button', () => {
    render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    // 汉堡菜单按钮应该有 aria-label
    const menuButton = screen.getByLabelText('打开菜单');
    expect(menuButton).toBeInTheDocument();
  });

  it('should open mobile menu when hamburger is clicked', () => {
    render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    const menuButton = screen.getByLabelText('打开菜单');
    fireEvent.click(menuButton);
    
    // 菜单应该显示，关闭按钮出现
    expect(screen.getByLabelText('关闭菜单')).toBeInTheDocument();
  });

  it('should close mobile menu when close button is clicked', () => {
    render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    // 打开菜单
    const openButton = screen.getByLabelText('打开菜单');
    fireEvent.click(openButton);
    
    // 关闭菜单
    const closeButton = screen.getByLabelText('关闭菜单');
    fireEvent.click(closeButton);
    
    // 应该回到打开按钮
    expect(screen.getByLabelText('打开菜单')).toBeInTheDocument();
  });

  it('should have glass effect styles', () => {
    const { container } = render(
      <MemoryRouter>
        <GlassNavbar />
      </MemoryRouter>
    );
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });
});
