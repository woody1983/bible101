import React from 'react';
import { colors } from '../../styles/colors';

interface HeroSectionProps {
  bookName: string;
  chapter: number;
  verseText: string;
  verseTextEn: string;
}

export function HeroSection({ bookName, chapter, verseText, verseTextEn }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[400px] flex items-center justify-center px-4 py-20 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.secondary.DEFAULT}20 0%, ${colors.primary.light}40 50%, ${colors.accent.pink}30 100%)`,
      }}
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-30"
        style={{ backgroundColor: colors.primary.DEFAULT }}
      />
      <div 
        className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-20"
        style={{ backgroundColor: colors.secondary.DEFAULT }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full opacity-25"
        style={{ backgroundColor: colors.accent.purple }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div 
          className="inline-block px-4 py-2 rounded-full mb-6 text-sm font-medium"
          style={{ 
            backgroundColor: colors.glass.white,
            color: colors.text.secondary,
          }}
        >
          今日经文 · {bookName} {chapter}章
        </div>
        
        <blockquote 
          className="text-2xl md:text-4xl lg:text-5xl font-serif leading-relaxed mb-6"
          style={{ color: colors.text.primary }}
        >
          "{verseText}"
        </blockquote>
        
        <p 
          className="text-lg md:text-xl italic"
          style={{ color: colors.text.muted }}
        >
          {verseTextEn}
        </p>
      </div>
    </section>
  );
}
