import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';
import { BrowserRouter } from 'react-router-dom';

// Mock the hooks and stores
vi.mock('../stores/appStore', () => ({
  useAppStore: vi.fn(),
}));

vi.mock('../hooks/useRandomVerse', () => ({
  useRandomVerse: vi.fn(),
}));

vi.mock('../lib/bibleParser', () => ({
  getAllBooks: vi.fn(() => [
    { id: 'genesis', name: '创世记', chapters: 50 },
    { id: 'exodus', name: '出埃及记', chapters: 40 },
  ]),
}));

vi.mock('../data/bibleData', () => ({
  allCategories: [
    {
      testament: 'old',
      books: [
        { id: 'genesis', name: '创世记', chapters: 50 },
        { id: 'exodus', name: '出埃及记', chapters: 40 },
      ],
    },
    {
      testament: 'new',
      books: [
        { id: 'matthew', name: '马太福音', chapters: 28 },
        { id: 'mark', name: '马可福音', chapters: 16 },
      ],
    },
  ],
  getBookById: vi.fn((id: string) => {
    const books: Record<string, { id: string; name: string; chapters: number }> = {
      genesis: { id: 'genesis', name: '创世记', chapters: 50 },
      exodus: { id: 'exodus', name: '出埃及记', chapters: 40 },
      matthew: { id: 'matthew', name: '马太福音', chapters: 28 },
      mark: { id: 'mark', name: '马可福音', chapters: 16 },
    };
    return books[id] || null;
  }),
}));

import { useAppStore } from '../stores/appStore';
import { useRandomVerse } from '../hooks/useRandomVerse';

const mockedUseAppStore = vi.mocked(useAppStore);
const mockedUseRandomVerse = vi.mocked(useRandomVerse);

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render welcome message', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/欢迎回来/)).toBeInTheDocument();
  });

  it('should display streak days in stats section', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 7,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Find the streak days in the stats section by looking for "连续天数" label
    const streakLabel = screen.getByText(/连续天数/);
    expect(streakLabel).toBeInTheDocument();
    
    // The parent should contain the number
    const streakContainer = streakLabel.parentElement;
    expect(streakContainer?.textContent).toContain('7');
  });

  it('should display total chapters read', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 25,
        streakDays: 3,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Find the chapters read in the stats section
    const chaptersLabel = screen.getByText(/已读章节/);
    expect(chaptersLabel).toBeInTheDocument();
    
    const chaptersContainer = chaptersLabel.parentElement;
    expect(chaptersContainer?.textContent).toContain('25');
  });

  it('should display current book continuation button when available', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: 'genesis',
      currentChapterNumber: 3,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Look for the specific "继续学习" button text
    const continueButton = screen.getByText(/继续学习/);
    expect(continueButton).toBeInTheDocument();
    
    // Check that it's in a link with the correct href
    expect(continueButton.closest('a')).toHaveAttribute('href', '/book/genesis/chapter/3');
  });

  it('should render recommendations section', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/今日推荐/)).toBeInTheDocument();
    expect(screen.getByText(/诗篇/)).toBeInTheDocument();
    expect(screen.getByText(/约翰福音/)).toBeInTheDocument();
    expect(screen.getByText(/罗马书/)).toBeInTheDocument();
  });

  it('should render old testament section', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/旧约圣经/)).toBeInTheDocument();
    expect(screen.getByText(/创世记/)).toBeInTheDocument();
  });

  it('should render new testament section', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/新约圣经/)).toBeInTheDocument();
    expect(screen.getByText(/马太福音/)).toBeInTheDocument();
  });

  it('should display book chapters count', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/50 章/)).toBeInTheDocument();
  });

  it('should display number of books in progress', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [
          { bookId: 'genesis', chaptersRead: [1, 2, 3] },
          { bookId: 'matthew', chaptersRead: [1, 2] },
        ],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Find the books count in the stats section
    const booksLabel = screen.getByText(/已读书卷/);
    expect(booksLabel).toBeInTheDocument();
    
    const booksContainer = booksLabel.parentElement;
    expect(booksContainer?.textContent).toContain('2');
  });

  it('should render random verse card', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: {
        bookId: 'john',
        bookName: '约翰福音',
        chapter: 3,
        verse: 16,
        text: '上帝爱世人，甚至将他的独生子赐给他们。',
      },
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Use getAllByText since "约翰福音" appears in both random verse and recommendations
    const johnElements = screen.getAllByText(/约翰福音/);
    expect(johnElements.length).toBeGreaterThanOrEqual(1);
    
    // Check for the verse reference format "3:16" (appears twice - in header and footer)
    const verseRefs = screen.getAllByText(/3:16/);
    expect(verseRefs.length).toBeGreaterThanOrEqual(1);
  });

  it('should handle loading state for random verse', () => {
    mockedUseAppStore.mockReturnValue({
      progress: {
        totalChaptersRead: 10,
        streakDays: 5,
        bookProgress: [],
      },
      currentBookId: null,
      currentChapterNumber: null,
    } as any);

    mockedUseRandomVerse.mockReturnValue({
      verse: null,
      isLoading: true,
      refresh: vi.fn(),
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Should still render without crashing during loading
    expect(screen.getByText(/欢迎回来/)).toBeInTheDocument();
  });
});
