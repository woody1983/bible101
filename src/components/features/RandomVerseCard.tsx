import React from 'react';
import { RefreshCw, Quote } from 'lucide-react';
import { colors } from '../../styles/colors';
import type { RandomVerse } from '../../lib/randomVerse';

interface RandomVerseCardProps {
  verse: RandomVerse | null;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function RandomVerseCard({ verse, onRefresh, isLoading = false }: RandomVerseCardProps) {
  if (!verse) {
    return (
      <div 
        className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: colors.background.soft }}
      >
        <p style={{ color: colors.text.muted }}>暂无经文</p>
      </div>
    );
  }

  return (
    <div 
      className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${colors.secondary.DEFAULT}15 0%, ${colors.primary.light}30 50%, ${colors.accent.pink}20 100%)`,
      }}
    >
      {/* 装饰引号 */}
      <div 
        className="absolute top-4 left-4 opacity-10"
        style={{ color: colors.primary.DEFAULT }}
      >
        <Quote size={80} />
      </div>

      <div className="relative z-10 text-center">
        {/* 标签 */}
        <div 
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          style={{ 
            backgroundColor: colors.glass.white,
            color: colors.text.secondary,
          }}
        >
          每日经文 · {verse.bookName} {verse.chapter}:{verse.verse}
        </div>

        {/* 经文内容 */}
        <blockquote 
          className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed mb-6"
          style={{ color: colors.text.primary }}
        >
          {verse.text}
        </blockquote>

        {/* 英文对照 */}
        <p 
          className="text-base md:text-lg italic mb-6"
          style={{ color: colors.text.muted }}
        >
          {verse.textEn}
        </p>

        {/* 引用信息 */}
        <div 
          className="text-sm font-medium mb-6"
          style={{ color: colors.text.secondary }}
        >
          —— {verse.bookNameEn} {verse.chapter}:{verse.verse}
        </div>

        {/* 刷新按钮 */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all hover:scale-105 disabled:opacity-50"
          style={{ 
            backgroundColor: colors.glass.white,
            color: colors.primary.DEFAULT,
          }}
        >
          <RefreshCw 
            size={18} 
            className={isLoading ? 'animate-spin' : ''} 
          />
          {isLoading ? '加载中...' : '换一段'}
        </button>
      </div>
    </div>
  );
}
