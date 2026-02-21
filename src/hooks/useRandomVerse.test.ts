import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRandomVerse } from './useRandomVerse';
import type { Book } from '../lib/bibleParser';

describe('useRandomVerse', () => {
  const mockBooks: Book[] = [
    {
      id: 'psalms',
      name: '诗篇',
      nameEn: 'Psalms',
      chapters: [
        {
          chapter: 23,
          verses: [
            { verse: 1, text: '耶和华是我的牧者', textEn: 'The Lord is my shepherd' },
          ],
        },
      ],
    },
  ];

  it('should return initial state', () => {
    const { result } = renderHook(() =>
      useRandomVerse({ books: [] })
    );
    expect(result.current.verse).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should load verse when books provided', () => {
    const { result } = renderHook(() =>
      useRandomVerse({ books: mockBooks })
    );

    // 初始加载后应该有经文
    expect(result.current.isLoading).toBe(false);
    expect(result.current.verse).not.toBeNull();
  });

  it('should have refresh function', () => {
    const { result } = renderHook(() =>
      useRandomVerse({ books: mockBooks })
    );

    expect(typeof result.current.refresh).toBe('function');
    expect(typeof result.current.refreshAll).toBe('function');
  });

  it('should handle empty books array', () => {
    const { result } = renderHook(() =>
      useRandomVerse({ books: [] })
    );

    expect(result.current.verse).toBeNull();
    expect(result.current.verses).toEqual([]);
  });
});
