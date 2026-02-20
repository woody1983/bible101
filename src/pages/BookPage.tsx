import { useParams, Link } from 'react-router-dom';
import { getBookById } from '../data/bibleData';
import { ChevronLeft, BookOpen } from 'lucide-react';

export function BookPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const book = bookId ? getBookById(bookId) : null;
  
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
  
  // 生成章节列表
  const chapters = Array.from({ length: book.chapters }, (_, i) => i + 1);
  
  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* 返回按钮 */}
        <Link 
          to="/books"
          className="inline-flex items-center gap-1 text-[#8B7355] mb-6 hover:underline"
        >
          <ChevronLeft size={18} />
          返回书卷列表
        </Link>
        
        {/* 书卷信息 */}
        <header className="bg-white rounded-2xl p-6 md:p-8 border border-[#D4C4A8]/50 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#8B7355] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-2xl font-bold">{book.nameShort}</span>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#3D3229] mb-1">
                {book.name}
              </h1>
              <p className="text-[#9A8B7A] mb-3">{book.nameEn}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="bg-[#F5EFE6] text-[#8B7355] px-3 py-1 rounded-full">
                  共 {book.chapters} 章
                </span>
                <span className="text-[#9A8B7A]">
                  缩写：{book.abbreviation}
                </span>
              </div>
            </div>
          </div>
        </header>
        
        {/* 章节网格 */}
        <section>
          <h2 className="text-xl font-bold text-[#3D3229] mb-4">章节列表</h2>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {chapters.map((chapter) => (
              <Link
                key={chapter}
                to={`/book/${book.id}/chapter/${chapter}`}
                className="bg-white aspect-square rounded-xl flex items-center justify-center font-medium text-[#3D3229] shadow-sm hover:shadow-md hover:bg-[#8B7355] hover:text-white transition-all border border-[#D4C4A8]/50"
              >
                {chapter}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
