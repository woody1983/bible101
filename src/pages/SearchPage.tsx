import { useState } from 'react';
import { allBooks } from '../data/bibleData';
import { Search, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SearchPage() {
  const [query, setQuery] = useState('');
  
  // 搜索逻辑
  const results = query.trim() 
    ? allBooks.filter(book => 
        book.name.includes(query) ||
        book.nameEn.toLowerCase().includes(query.toLowerCase()) ||
        book.nameShort.includes(query) ||
        book.abbreviation.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  
  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* 搜索标题 */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#3D3229] mb-6">
          搜索圣经
        </h1>
        
        {/* 搜索框 */}
        <div className="relative mb-8">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8B7A]">
            <Search size={20} />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索书卷名称、缩写..."
            className="w-full pl-12 pr-12 py-4 bg-white rounded-xl border border-[#D4C4A8] focus:border-[#8B7355] focus:outline-none focus:ring-2 focus:ring-[#8B7355]/20 text-[#3D3229] placeholder-[#9A8B7A]"
          />
          
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8B7A] hover:text-[#3D3229]"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* 搜索结果 */}
        <div className="space-y-4">
          {query.trim() && results.length === 0 && (
            <div className="text-center py-12">
              <Search size={48} className="mx-auto text-[#D4C4A8] mb-4" />
              <p className="text-[#9A8B7A]">未找到匹配的书卷</p>
            </div>
          )}
          
          {results.map((book) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-[#D4C4A8]/50"
            >
              <div className="w-12 h-12 bg-[#8B7355] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{book.nameShort}</span>
              </div>
              
              <div className="flex-1">
                <div className="font-bold text-[#3D3229]">{book.name}</div>
                <div className="text-sm text-[#9A8B7A]">
                  {book.nameEn} · {book.chapters} 章
                </div>
              </div>
              
              <BookOpen className="text-[#D4C4A8]" size={20} />
            </Link>
          ))}
          
          {!query.trim() && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-[#D4C4A8] mb-4" />
              <p className="text-[#9A8B7A] mb-2">输入关键词开始搜索</p>
              <p className="text-sm text-[#9A8B7A]">支持书卷名称、缩写、英文名</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
