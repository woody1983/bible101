import { useState, useMemo, useCallback } from 'react';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { getAllBooks } from '../lib/bibleParser';
import { createSearchIndex, searchIndex } from '../lib/searchIndex';
import type { SearchResult } from '../types';
import { useNavigate } from 'react-router-dom';

export function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // 创建搜索索引
  const index = useMemo(() => {
    const books = getAllBooks();
    return createSearchIndex(books);
  }, []);

  // 处理搜索输入
  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    
    if (value.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    
    // 执行搜索
    const results = searchIndex(index, value, 10);
    
    // 转换为 SearchResult 格式
    const formattedResults: SearchResult[] = results.map(result => ({
      verse: {
        book: result.document.bookId,
        chapter: result.document.chapter,
        verse: result.document.verse,
        text: result.document.text,
      },
      score: result.score,
      snippet: result.matches[0] || result.document.text,
    }));
    
    setSearchResults(formattedResults);
    setLoading(false);
  }, [index]);

  // 处理结果点击
  const handleResultClick = useCallback((result: SearchResult) => {
    navigate(`/book/${result.verse.book}/chapter/${result.verse.chapter}`);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FDF8F0] pt-20 pb-24">
      <div className="max-w-3xl mx-auto px-4">
        {/* 搜索标题 */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#3D3229] mb-6">
          搜索圣经
        </h1>
        
        {/* 搜索框 - 不显示联想下拉 */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="搜索经文关键词，如：耶和华、爱、盼望..."
            loading={loading}
          />
        </div>
        
        {/* 搜索结果 */}
        <SearchResults
          results={searchResults}
          query={query}
          onResultClick={handleResultClick}
          emptyMessage={query.length < 2 ? '输入至少2个字符开始搜索' : '没有找到匹配的经文'}
        />
      </div>
    </div>
  );
}
