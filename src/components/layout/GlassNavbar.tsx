import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Search, Settings } from 'lucide-react';
import { colors } from '../../styles/colors';

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

export function GlassNavbar() {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { path: '/', label: '首页', icon: Home },
    { path: '/books', label: '书卷', icon: BookOpen },
    { path: '/search', label: '搜索', icon: Search },
    { path: '/settings', label: '设置', icon: Settings },
  ];
  
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: colors.glass.white,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${colors.primary.light}40`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-105"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary.DEFAULT}, ${colors.secondary.DEFAULT})`,
            }}
          >
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span 
            className="text-xl font-bold hidden sm:block"
            style={{ color: colors.text.primary }}
          >
            Bible101
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: isActive ? colors.primary.DEFAULT : 'transparent',
                  color: isActive ? colors.text.inverse : colors.text.secondary,
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
