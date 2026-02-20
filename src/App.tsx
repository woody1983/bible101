import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { BookPage } from './pages/BookPage';
import { ChapterPage } from './pages/ChapterPage';
import { SearchPage } from './pages/SearchPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FDF8F0]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/book/:bookId" element={<BookPage />} />
          <Route path="/book/:bookId/chapter/:chapterNumber" element={<ChapterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
