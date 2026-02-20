import { useParams, Link } from 'react-router-dom';
import { getBookById, sampleChapter } from '../data/bibleData';
import { ChevronLeft, ChevronRight, BookOpen, Clock, Heart, Share2 } from 'lucide-react';
import { useAppStore } from '../stores/appStore';

export function ChapterPage() {
  const { bookId, chapterNumber } = useParams<{ bookId: string; chapterNumber: string }>();
  const { addBookmark, bookmarks } = useAppStore();
  
  const book = bookId ? getBookById(bookId) : null;
  const chapterNum = parseInt(chapterNumber || '1', 10);
  
  // 使用示例数据（诗篇 23 篇）或显示基础框架
  const chapter = bookId === 'psalms' && chapterNum === 23 
    ? sampleChapter 
    : null;
  
  if (!book) {
    return (
      <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24 flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={48} className="mx-auto text-[#9A8B7A] mb-4" />
          <h1 className="text-2xl font-bold text-[#3D3229] mb-2">未找到书卷</h1>
          <Link to="/books" className="text-[#8B7355] hover:underline">
            返回书卷列表
          </Link>
        </div>
      </div>
    );
  }
  
  const isBookmarked = bookmarks.some(b => b.chapterId === `${bookId}-${chapterNum}`);
  
  const handleBookmark = () => {
    if (!isBookmarked) {
      addBookmark({
        chapterId: `${bookId}-${chapterNum}`,
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* 面包屑导航 */}
        <nav className="flex items-center gap-2 text-sm text-[#9A8B7A] mb-6">
          <Link to="/" className="hover:text-[#8B7355]">首页</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <Link to="/books" className="hover:text-[#8B7355]">圣经书卷</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <Link to={`/book/${book.id}`} className="hover:text-[#8B7355]">{book.name}</Link>
          <ChevronLeft size={14} className="rotate-180" />
          <span className="text-[#3D3229]">第 {chapterNum} 章</span>
        </nav>
        
        {/* 章节标题 */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#8B7355] font-medium">{book.name}</span>
            <span className="text-[#D4C4A8]">/</span>
            <span className="text-[#9A8B7A]">第 {chapterNum} 章</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-[#3D3229] mb-3">
            {chapter?.title || `${book.name} 第 ${chapterNum} 章`}
          </h1>
          
          <div className="flex items-center gap-4 text-[#9A8B7A]">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>约 2 分钟阅读</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked 
                    ? 'text-red-500 bg-red-50' 
                    : 'text-[#9A8B7A] hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              
              <button className="p-2 rounded-full text-[#9A8B7A] hover:text-[#8B7355] hover:bg-[#F5EFE6] transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </header>
        
        {chapter ? (
          <div className="space-y-8">
            {/* 核心句子 */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#D4C4A8]/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#C9A227] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">经</span>
                </div>
                <h2 className="text-xl font-bold text-[#3D3229]">核心句子</h2>
              </div>
              
              <div className="space-y-6">
                {chapter.keyVerses.map((verse) => (
                  <div key={verse.id} className="border-l-4 border-[#C9A227] pl-4">
                    <div className="text-sm text-[#8B7355] font-medium mb-2">
                      第 {verse.verseNumber} 节
                    </div>
                    <blockquote className="text-lg md:text-xl text-[#3D3229] font-serif leading-relaxed mb-3">
                      {verse.text}
                    </blockquote>
                    
                    <div className="text-[#9A8B7A] italic mb-2">
                      {verse.textEn}
                    </div>
                    
                    <div className="bg-[#F5EFE6] rounded-lg p-3 text-sm text-[#6B5D4D]">
                      <span className="text-[#C9A227]">💡</span> {verse.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 关键观点 */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#D4C4A8]/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#8B7355] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">观</span>
                </div>
                <h2 className="text-xl font-bold text-[#3D3229]">关键观点</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {chapter.keyPoints.map((point) => (
                  <div key={point.id} className="bg-[#FDF8F0] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {point.icon === 'shepherd' && '🐑'}
                        {point.icon === 'compass' && '🧭'}
                        {point.icon === 'heart' && '❤️'}
                      </span>
                      <h3 className="font-bold text-[#3D3229]">{point.title}</h3>
                    </div>
                    <p className="text-[#6B5D4D] text-sm leading-relaxed">
                      {point.content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 考点解析 */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#D4C4A8]/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#6B8FA8] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">解</span>
                </div>
                <h2 className="text-xl font-bold text-[#3D3229]">考点解析</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#3D3229] mb-2 flex items-center gap-2">
                    <span>📖</span> 历史背景
                  </h3>
                  <p className="text-[#6B5D4D] leading-relaxed">{chapter.studyNotes.historicalContext}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#3D3229] mb-2 flex items-center gap-2">
                    <span>🌍</span> 文化语境
                  </h3>
                  <p className="text-[#6B5D4D] leading-relaxed">{chapter.studyNotes.culturalContext}</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#3D3229] mb-2 flex items-center gap-2">
                    <span>⭐</span> 神学主题
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {chapter.studyNotes.theologicalThemes.map((theme, idx) => (
                      <span 
                        key={idx}
                        className="bg-[#C9A227]/10 text-[#8B7355] px-3 py-1 rounded-full text-sm"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#3D3229] mb-2 flex items-center gap-2">
                    <span>📖</span> 交叉引用
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {chapter.studyNotes.crossReferences.map((ref, idx) => (
                      <span 
                        key={idx}
                        className="text-[#8B7355] hover:underline cursor-pointer"
                      >
                        {ref.book} {ref.chapter}:{ref.verses}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            {/* 应用思考 */}
            <section className="bg-white rounded-2xl p-6 md:p-8 border border-[#D4C4A8]/50">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#6B8E6B] rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">用</span>
                </div>
                <h2 className="text-xl font-bold text-[#3D3229]">应用思考</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#3D3229] mb-3 flex items-center gap-2">
                    <span>🤔</span> 个人反思
                  </h3>
                  <ul className="space-y-2">
                    {chapter.application.personalQuestions.map((q) => (
                      <li key={q.id} className="text-[#6B5D4D] flex items-start gap-2">
                        <span className="text-[#8B7355]">•</span>
                        {q.question}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-bold text-[#3D3229] mb-3 flex items-center gap-2">
                    <span>👥</span> 小组讨论
                  </h3>
                  <ul className="space-y-2">
                    {chapter.application.groupQuestions.map((q) => (
                      <li key={q.id} className="text-[#6B5D4D] flex items-start gap-2">
                        <span className="text-[#8B7355]">•</span>
                        {q.question}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-[#6B8E6B]/10 rounded-xl p-4">
                  <h3 className="font-bold text-[#3D3229] mb-3">实践建议</h3>
                  <ul className="space-y-2">
                    {chapter.application.practicalSteps.map((step, idx) => (
                      <li key={idx} className="text-[#6B5D4D] flex items-start gap-2">
                        <span className="text-[#6B8E6B]">✓</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* 基础章节框架（无详细内容时） */
          <div className="bg-white rounded-2xl p-8 border border-[#D4C4A8]/50 text-center">
            <BookOpen size={48} className="mx-auto text-[#D4C4A8] mb-4" />
            <h2 className="text-xl font-bold text-[#3D3229] mb-2">{book.name} 第 {chapterNum} 章</h2>
            <p className="text-[#9A8B7A] mb-4">
              此章节内容正在准备中，敬请期待...
            </p>            
            <div className="text-sm text-[#6B5D4D]">
              <p>您可以先阅读：</p>
              <Link 
                to="/book/psalms/chapter/23" 
                className="text-[#8B7355] hover:underline inline-block mt-2"
              >
                诗篇 23 篇（示例章节）
              </Link>
            </div>
          </div>
        )}
        
        {/* 章节导航 */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-[#D4C4A8]">
          <Link
            to={`/book/${book.id}/chapter/${Math.max(1, chapterNum - 1)}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              chapterNum <= 1 
                ? 'text-[#D4C4A8] cursor-not-allowed' 
                : 'text-[#6B5D4D] hover:bg-[#F5EFE6]'
            }`}
            onClick={(e) => chapterNum <= 1 && e.preventDefault()}
          >
            <ChevronLeft size={20} />
            <span>上一章</span>
          </Link>
          
          <Link
            to={`/book/${book.id}`}
            className="text-[#8B7355] hover:underline"
          >
            章节列表
          </Link>
          
          <Link
            to={`/book/${book.id}/chapter/${Math.min(book.chapters, chapterNum + 1)}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              chapterNum >= book.chapters 
                ? 'text-[#D4C4A8] cursor-not-allowed' 
                : 'text-[#6B5D4D] hover:bg-[#F5EFE6]'
            }`}
            onClick={(e) => chapterNum >= book.chapters && e.preventDefault()}
          >
            <span>下一章</span>
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
