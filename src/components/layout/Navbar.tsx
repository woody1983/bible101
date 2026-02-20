import { BookOpen, Home, Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/books', label: '书卷', icon: BookOpen },
    { path: '/search', label: '搜索', icon: Search },
    { path: '/settings', label: '设置', icon: Settings },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#D4C4A8] z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#8B7355] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-xl font-bold text-[#3D3229]">Bible101</span>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#8B7355] text-white'
                    : 'text-[#6B5D4D] hover:bg-[#F5EFE6]'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
        
        {/* Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#D4C4A8] px-4 py-2 flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#8B7355]'
                    : 'text-[#9A8B7A]'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
