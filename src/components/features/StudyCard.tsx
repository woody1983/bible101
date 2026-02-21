import React from 'react';
import { colors } from '../../styles/colors';

interface StudyCardProps {
  title: string;
  subtitle: string;
  verseCount: number;
  bgColor: 'green' | 'purple';
  onClick?: () => void;
}

export function StudyCard({ title, subtitle, verseCount, bgColor, onClick }: StudyCardProps) {
  const bgColors = {
    green: colors.primary.light,
    purple: colors.accent.pink,
  };

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      style={{
        backgroundColor: bgColors[bgColor],
        border: `1px solid ${colors.glass.light}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 
            className="text-lg font-bold mb-1"
            style={{ color: colors.text.primary }}
          >
            {title}
          </h3>
          <p 
            className="text-sm mb-3"
            style={{ color: colors.text.secondary }}
          >
            {subtitle}
          </p>
        </div>
        <span 
          className="text-xs px-2 py-1 rounded-full"
          style={{ 
            backgroundColor: colors.glass.white,
            color: colors.text.muted,
          }}
        >
          {verseCount} 章
        </span>
      </div>
    </button>
  );
}
