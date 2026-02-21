import { useState, useCallback, useEffect } from 'react';
import { getRandomVerse, getMultipleRandomVerses } from '../lib/randomVerse';
import type { RandomVerse } from '../lib/randomVerse';
import type { Book } from '../lib/bibleParser';

interface UseRandomVerseOptions {
  books: Book[];
  count?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // milliseconds
}

interface UseRandomVerseReturn {
  verse: RandomVerse | null;
  verses: RandomVerse[];
  isLoading: boolean;
  error: Error | null;
  refresh: () => void;
  refreshAll: () => void;
}

export function useRandomVerse({
  books,
  count = 1,
  autoRefresh = false,
  refreshInterval = 60000, // 默认 1 分钟
}: UseRandomVerseOptions): UseRandomVerseReturn {
  const [verse, setVerse] = useState<RandomVerse | null>(null);
  const [verses, setVerses] = useState<RandomVerse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newVerse = getRandomVerse(books);
      setVerse(newVerse);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get random verse'));
    } finally {
      setIsLoading(false);
    }
  }, [books]);

  const refreshAll = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newVerses = getMultipleRandomVerses(books, count);
      setVerses(newVerses);
      if (newVerses.length > 0) {
        setVerse(newVerses[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get random verses'));
    } finally {
      setIsLoading(false);
    }
  }, [books, count]);

  // 初始加载
  useEffect(() => {
    if (books.length > 0) {
      refresh();
    }
  }, [books, refresh]);

  // 自动刷新
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  return {
    verse,
    verses,
    isLoading,
    error,
    refresh,
    refreshAll,
  };
}
