import React from 'react';
import type { SearchResult } from '../types';
import { getBookNameCN } from '../lib/bibleParser';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  onResultClick?: (result: SearchResult) => void;
  emptyMessage?: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  onResultClick,
  emptyMessage = '没有找到匹配的经文',
}) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg
          className="mx-auto h-12 w-12 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="text-lg">{emptyMessage}</p>
        {query && (
          <p className="text-sm text-gray-400 mt-2">
            没有找到与 "{query}" 相关的经文
          </p>
        )}
      </div>
    );
  }

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={index}
          className="bg-yellow-200 text-yellow-900 px-0.5 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-4">
        找到 {results.length} 条结果
      </div>
      
      {results.map((result, index) => {
        const { verse, score, snippet } = result;
        const bookCN = getBookNameCN(verse.book);
        
        return (
          <div
            key={`${verse.book}-${verse.chapter}-${verse.verse}-${index}`}
            onClick={() => onResultClick?.(result)}
            className={`bg-white rounded-lg border border-gray-200 p-4 transition-all ${
              onResultClick ? 'cursor-pointer hover:shadow-md hover:border-primary-300' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-primary-700 bg-primary-50 px-2 py-1 rounded">
                  {bookCN}
                </span>
                <span className="text-sm text-gray-600">
                  {verse.chapter}:{verse.verse}
                </span>
              </div>
              
              {score < 0.3 && (
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  最佳匹配
                </span>
              )}
            </div>
            
            <p className="text-gray-800 leading-relaxed">
              {highlightText(snippet, query)}
            </p>
            
            <div className="mt-2 text-xs text-gray-400">
              匹配度: {((1 - score) * 100).toFixed(1)}%
            </div>
          </div>
        );
      })}
    </div>
  );
};