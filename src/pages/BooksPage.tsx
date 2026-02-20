import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { allCategories } from '../data/bibleData';
import { BookOpen, ChevronRight } from 'lucide-react';

export function BooksPage() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('testament') || 'all';
  const [activeTab, setActiveTab] = useState<'old' | 'new' | 'all'>(defaultTab as 'old' | 'new' | 'all');
  
  const filteredCategories = allCategories.filter((cat) => {
    if (activeTab === 'all') return true;
    return cat.testament === activeTab;
  });
  
  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* 页面标题 */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#3D3229] mb-2">圣经书卷</h1>
          <p className="text-[#6B5D4D]">共 66 卷书，1189 章，探索上帝的话语</p>
        </div>
        
        {/* 标签切换 */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'all', label: '全部' },
            { key: 'old', label: '旧约' },
            { key: 'new', label: '新约' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'old' | 'new' | 'all')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-white text-[#6B5D4D] hover:bg-[#F5EFE6] border border-[#D4C4A8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* 书卷分类 */}
        <div className="space-y-8">
          {filteredCategories.map((category) => (
            <section key={category.id}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="text-[#8B7355]" size={20} />
                <h2 className="text-lg font-bold text-[#3D3229]">{category.name}</h2>
                <span className="text-sm text-[#9A8B7A]">({category.books.length} 卷)</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {category.books.map((book) => (
                  <Link
                    key={book.id}
                    to={`/book/${book.id}`}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-[#D4C4A8]/50 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#9A8B7A] bg-[#F5EFE6] px-2 py-0.5 rounded">
                        {book.nameShort}
                      </span>
                      <ChevronRight 
                        size={16} 
                        className="text-[#D4C4A8] group-hover:text-[#8B7355] transition-colors" 
                      />
                    </div>
                    <div className="font-bold text-[#3D3229] mb-1">{book.name}</div>
                    <div className="text-sm text-[#9A8B7A]">{book.chapters} 章</div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
