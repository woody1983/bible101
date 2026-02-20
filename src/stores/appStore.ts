import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  language: 'zh' | 'en' | 'bilingual';
  fontSize: 'small' | 'medium' | 'large';
  theme: 'light' | 'dark' | 'sepia';
}

interface BookProgress {
  bookId: string;
  chaptersRead: number[];
  percentage: number;
}

interface LearningProgress {
  totalChaptersRead: number;
  streakDays: number;
  lastReadDate: string;
  bookProgress: BookProgress[];
}

interface Bookmark {
  id: string;
  chapterId: string;
  verseNumber?: number;
  createdAt: string;
  note?: string;
}

interface AppState {
  // 用户偏好
  preferences: UserPreferences;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  
  // 学习进度
  progress: LearningProgress;
  markChapterAsRead: (bookId: string, chapterNumber: number) => void;
  
  // 书签
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;
  
  // 当前阅读
  currentBookId: string | null;
  currentChapterNumber: number | null;
  setCurrentReading: (bookId: string, chapterNumber: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 默认偏好
      preferences: {
        language: 'zh',
        fontSize: 'medium',
        theme: 'light',
      },
      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
      
      // 学习进度
      progress: {
        totalChaptersRead: 0,
        streakDays: 0,
        lastReadDate: '',
        bookProgress: [],
      },
      markChapterAsRead: (bookId, chapterNumber) => {
        const state = get();
        const bookProgress = [...state.progress.bookProgress];
        const bookIndex = bookProgress.findIndex((bp) => bp.bookId === bookId);
        
        if (bookIndex === -1) {
          bookProgress.push({
            bookId,
            chaptersRead: [chapterNumber],
            percentage: 0,
          });
        } else {
          const chapters = bookProgress[bookIndex].chaptersRead;
          if (!chapters.includes(chapterNumber)) {
            chapters.push(chapterNumber);
          }
        }
        
        // 计算百分比
        bookProgress.forEach((bp) => {
          const book = getBookById(bp.bookId);
          if (book) {
            bp.percentage = Math.round((bp.chaptersRead.length / book.chapters) * 100);
          }
        });
        
        set((state) => ({
          progress: {
            ...state.progress,
            totalChaptersRead: state.progress.totalChaptersRead + 1,
            lastReadDate: new Date().toISOString(),
            bookProgress,
          },
        }));
      },
      
      // 书签
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [
            ...state.bookmarks,
            {
              ...bookmark,
              id: `${bookmark.chapterId}-${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      
      // 当前阅读
      currentBookId: null,
      currentChapterNumber: null,
      setCurrentReading: (bookId, chapterNumber) =>
        set({
          currentBookId: bookId,
          currentChapterNumber: chapterNumber,
        }),
    }),
    {
      name: 'bible101-storage',
    }
  )
);

// 辅助函数
import { allBooks } from '../data/bibleData';

function getBookById(bookId: string) {
  return allBooks.find((book) => book.id === bookId);
}
