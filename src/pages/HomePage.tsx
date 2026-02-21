import { useAppStore } from '../stores/appStore';
import { allCategories, getBookById } from '../data/bibleData';
import type { BibleCategory, BibleBook } from '../types';
import { RandomVerseCard } from '../components/features/RandomVerseCard';
import { useRandomVerse } from '../hooks/useRandomVerse';
import { getAllBooks } from '../lib/bibleParser';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  const { progress, currentBookId, currentChapterNumber } = useAppStore();
  
  // 获取当前阅读的书卷信息
  const currentBook = currentBookId ? getBookById(currentBookId) : null;
  
  // 获取所有书卷用于随机经文
  const allBooks = getAllBooks();
  const { verse, isLoading, refresh } = useRandomVerse({ books: allBooks });
  
  // 获取推荐章节（示例）
  const recommendations = [
    { id: 'psalms-23', bookName: '诗篇', chapter: 23, title: '耶和华是我的牧者' },
    { id: 'john-3', bookName: '约翰福音', chapter: 3, title: '重生与永生' },
    { id: 'romans-8', bookName: '罗马书', chapter: 8, title: '在圣灵里的生命' },
  ];
  
  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* 随机经文区域 */}
        <section className="pt-4">
          <RandomVerseCard 
            verse={verse} 
            onRefresh={refresh}
            isLoading={isLoading}
          />
        </section>
        
        {/* 欢迎区域 */}
        <section className="bg-gradient-to-r from-[#8B7355] to-[#A68B6A] rounded-2xl p-6 md:p-8 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            欢迎回来，继续你的学习之旅
          </h1>
          <p className="text-white/80 mb-6">
            今天是学习的第 {progress.streakDays || 1} 天，继续加油！
          </p>
          
          {currentBook && currentChapterNumber && (
            <Link
              to={`/book/${currentBook.id}/chapter/${currentChapterNumber}`}
              className="inline-flex items-center gap-2 bg-white text-[#8B7355] px-6 py-3 rounded-xl font-medium hover:bg-[#F5EFE6] transition-colors"
            >
              <BookOpen size={20} />
              继续学习：{currentBook.name} 第 {currentChapterNumber} 章
              <ChevronRight size={20} />
            </Link>
          )}
        </section>
        
        {/* 今日推荐 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#3D3229]">今日推荐</h2>
            <button className="text-[#8B7355] text-sm hover:underline">
              查看更多
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <Link
                key={rec.id}
                to={`/book/${rec.id.split('-')[0]}/chapter/${rec.id.split('-')[1]}`}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-[#D4C4A8]/50"
              >
                <div className="text-sm text-[#8B7355] font-medium mb-1">
                  {rec.bookName} {rec.chapter} 章
                </div>
                <h3 className="font-bold text-[#3D3229] mb-2">{rec.title}</h3>
                <div className="flex items-center text-[#9A8B7A] text-sm">
                  <BookOpen size={14} className="mr-1" />
                  约 3 分钟阅读
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* 旧约圣经 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#3D3229]">旧约圣经</h2>
            <Link to="/books?testament=old" className="text-[#8B7355] text-sm hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allCategories
              .filter((cat: BibleCategory) => cat.testament === 'old')
              .flatMap((cat: BibleCategory) => cat.books)
              .slice(0, 6)
              .map((book: BibleBook) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-[#D4C4A8]/50"
                >
                  <div className="font-bold text-[#3D3229] mb-1">{book.name}</div>
                  <div className="text-sm text-[#9A8B7A]">{book.chapters} 章</div>
                </Link>
              ))}
          </div>
        </section>
        
        {/* 新约圣经 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#3D3229]">新约圣经</h2>
            <Link to="/books?testament=new" className="text-[#8B7355] text-sm hover:underline">
              查看全部
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allCategories
              .filter((cat: BibleCategory) => cat.testament === 'new')
              .flatMap((cat: BibleCategory) => cat.books)
              .slice(0, 6)
              .map((book: BibleBook) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-[#D4C4A8]/50"
                >
                  <div className="font-bold text-[#3D3229] mb-1">{book.name}</div>
                  <div className="text-sm text-[#9A8B7A]">{book.chapters} 章</div>
                </Link>
              ))}
          </div>
        </section>
        
        {/* 学习统计 */}
        <section className="bg-white rounded-2xl p-6 border border-[#D4C4A8]/50">
          <h2 className="text-xl font-bold text-[#3D3229] mb-4">学习统计</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B7355]">{progress.totalChaptersRead}</div>
              <div className="text-sm text-[#9A8B7A]">已读章节</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B7355]">{progress.streakDays || 1}</div>
              <div className="text-sm text-[#9A8B7A]">连续天数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B7355]">{progress.bookProgress.length}</div>
              <div className="text-sm text-[#9A8B7A]">已读书卷</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
