const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const EPUB_DIR = '/tmp/kjv_epub';
const OUTPUT_DIR = '/Users/jiangxu/bible101/src/data';

// Book name mapping (Chinese to English ID)
// Includes variations found in the EPUB (e.g., 记 vs 纪)
const bookNameMapping = {
  '创世记': 'genesis', '出埃及记': 'exodus', '利未记': 'leviticus', '民数记': 'numbers',
  '申命记': 'deuteronomy', '约书亚记': 'joshua', '士师记': 'judges', '路得记': 'ruth',
  '撒母耳记上': '1samuel', '撒母耳记下': '2samuel', 
  '列王纪上': '1kings', '列王纪下': '2kings',
  '列王记上': '1kings', '列王记下': '2kings',  // Alternative spelling
  '历代志上': '1chronicles', '历代志下': '2chronicles',
  '历代记上': '1chronicles', '历代记下': '2chronicles',  // Alternative spelling
  '以斯拉记': 'ezra', '尼希米记': 'nehemiah',
  '以斯帖记': 'esther', '约伯记': 'job', '诗篇': 'psalms', '箴言': 'proverbs',
  '传道书': 'ecclesiastes', '雅歌': 'songofsolomon', '以赛亚书': 'isaiah', '耶利米书': 'jeremiah',
  '耶利米哀歌': 'lamentations', '以西结书': 'ezekiel', '但以理书': 'daniel', '何西阿书': 'hosea',
  '约珥书': 'joel', '阿摩司书': 'amos', '俄巴底亚书': 'obadiah', '约拿书': 'jonah',
  '弥迦书': 'micah', '那鸿书': 'nahum', '哈巴谷书': 'habakkuk', '西番雅书': 'zephaniah',
  '哈该书': 'haggai', '撒迦利亚书': 'zechariah', '玛拉基书': 'malachi',
  '马太福音': 'matthew', '马可福音': 'mark', '路加福音': 'luke', '约翰福音': 'john',
  '使徒行传': 'acts', '罗马书': 'romans', '哥林多前书': '1corinthians', '哥林多后书': '2corinthians',
  '加拉太书': 'galatians', '以弗所书': 'ephesians', '腓立比书': 'philippians', '歌罗西书': 'colossians',
  '帖撒罗尼迦前书': '1thessalonians', '帖撒罗尼迦后书': '2thessalonians', '提摩太前书': '1timothy',
  '提摩太后书': '2timothy', '提多书': 'titus', '腓利门书': 'philemon', '希伯来书': 'hebrews',
  '雅各书': 'james', '彼得前书': '1peter', '彼得后书': '2peter', 
  '约翰一书': '1john', '约翰二书': '2john', '约翰三书': '3john',
  '约翰壹书': '1john', '约翰贰书': '2john', '约翰叁书': '3john',  // Alternative spellings
  '犹大书': 'jude', '启示录': 'revelation'
};

const englishBookNames = {
  'genesis': 'Genesis', 'exodus': 'Exodus', 'leviticus': 'Leviticus', 'numbers': 'Numbers',
  'deuteronomy': 'Deuteronomy', 'joshua': 'Joshua', 'judges': 'Judges', 'ruth': 'Ruth',
  '1samuel': '1 Samuel', '2samuel': '2 Samuel', '1kings': '1 Kings', '2kings': '2 Kings',
  '1chronicles': '1 Chronicles', '2chronicles': '2 Chronicles', 'ezra': 'Ezra', 'nehemiah': 'Nehemiah',
  'esther': 'Esther', 'job': 'Job', 'psalms': 'Psalms', 'proverbs': 'Proverbs',
  'ecclesiastes': 'Ecclesiastes', 'songofsolomon': 'Song of Solomon', 'isaiah': 'Isaiah', 'jeremiah': 'Jeremiah',
  'lamentations': 'Lamentations', 'ezekiel': 'Ezekiel', 'daniel': 'Daniel', 'hosea': 'Hosea',
  'joel': 'Joel', 'amos': 'Amos', 'obadiah': 'Obadiah', 'jonah': 'Jonah',
  'micah': 'Micah', 'nahum': 'Nahum', 'habakkuk': 'Habakkuk', 'zephaniah': 'Zephaniah',
  'haggai': 'Haggai', 'zechariah': 'Zechariah', 'malachi': 'Malachi',
  'matthew': 'Matthew', 'mark': 'Mark', 'luke': 'Luke', 'john': 'John',
  'acts': 'Acts', 'romans': 'Romans', '1corinthians': '1 Corinthians', '2corinthians': '2 Corinthians',
  'galatians': 'Galatians', 'ephesians': 'Ephesians', 'philippians': 'Philippians', 'colossians': 'Colossians',
  '1thessalonians': '1 Thessalonians', '2thessalonians': '2 Thessalonians', '1timothy': '1 Timothy',
  '2timothy': '2 Timothy', 'titus': 'Titus', 'philemon': 'Philemon', 'hebrews': 'Hebrews',
  'james': 'James', '1peter': '1 Peter', '2peter': '2 Peter', '1john': '1 John',
  '2john': '2 John', '3john': '3 John', 'jude': 'Jude', 'revelation': 'Revelation'
};

function parseChapterHeader(text) {
  const match = text.match(/(?:旧约|新约)[\s-]*([^\(]+)\(([^)]+)\)[\s-]*第\s*(\d+)\s*章/);
  if (match) {
    return {
      chineseName: match[1].trim(),
      englishName: match[2].trim(),
      chapter: parseInt(match[3], 10)
    };
  }
  return null;
}

function parseVerse(text) {
  const match = text.match(/^(\d+):(\d+)\s*(.+)$/);
  if (match) {
    return {
      chapter: parseInt(match[1], 10),
      verse: parseInt(match[2], 10),
      text: match[3].trim()
    };
  }
  return null;
}

function isEnglishText(text) {
  const asciiCount = (text.match(/[\x00-\x7F]/g) || []).length;
  return asciiCount / text.length > 0.8;
}

function parseHtmlFile(filePath, currentBookInfo) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const $ = cheerio.load(html);
  
  const paragraphs = $('p');
  let chapterInfo = currentBookInfo ? { ...currentBookInfo } : null;
  let verses = [];
  let pendingChineseVerse = null;
  
  paragraphs.each((i, elem) => {
    const text = $(elem).text().trim();
    if (!text) return;
    
    // Check if it's a chapter header
    const headerInfo = parseChapterHeader(text);
    if (headerInfo) {
      chapterInfo = headerInfo;
      pendingChineseVerse = null; // Reset pending verse on new chapter
      return;
    }
    
    // Check if it's a verse
    const verseInfo = parseVerse(text);
    
    if (verseInfo && chapterInfo) {
      // This is a Chinese verse (has chapter:verse format)
      pendingChineseVerse = {
        bookName: chapterInfo.chineseName,
        bookNameEn: chapterInfo.englishName,
        chapter: verseInfo.chapter,
        verse: verseInfo.verse,
        text: verseInfo.text
      };
    } else if (pendingChineseVerse && isEnglishText(text)) {
      // This is the English translation of the previous Chinese verse
      verses.push({
        ...pendingChineseVerse,
        textEn: text
      });
      pendingChineseVerse = null;
    }
  });
  
  return { header: chapterInfo, verses };
}

function processAllFiles() {
  const files = fs.readdirSync(EPUB_DIR)
    .filter(f => f.startsWith('index_split_') && f.endsWith('.html'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/index_split_(\d+)\.html/)[1], 10);
      const numB = parseInt(b.match(/index_split_(\d+)\.html/)[1], 10);
      return numA - numB;
    });
  
  console.log(`Found ${files.length} HTML files to process`);
  
  const books = {};
  let totalVerses = 0;
  let currentBookInfo = null;
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(EPUB_DIR, file);
    
    try {
      const result = parseHtmlFile(filePath, currentBookInfo);
      
      if (result.header) {
        currentBookInfo = result.header;
      }
      
      if (result.verses.length > 0) {
        for (const verse of result.verses) {
          const bookId = bookNameMapping[verse.bookName];
          if (!bookId) {
            console.warn(`Unknown book: ${verse.bookName}`);
            continue;
          }
          
          if (!books[bookId]) {
            books[bookId] = {
              id: bookId,
              name: verse.bookName,
              nameEn: englishBookNames[bookId],
              chapters: {}
            };
          }
          
          const chapterNum = verse.chapter;
          if (!books[bookId].chapters[chapterNum]) {
            books[bookId].chapters[chapterNum] = {
              chapter: chapterNum,
              verses: []
            };
          }
          
          books[bookId].chapters[chapterNum].verses.push({
            verse: verse.verse,
            text: verse.text,
            textEn: verse.textEn
          });
          
          totalVerses++;
        }
      }
      
      if ((i + 1) % 100 === 0) {
        console.log(`Processed ${i + 1}/${files.length} files...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
  
  // Convert chapters object to array and sort
  const booksArray = Object.values(books).map(book => {
    const chaptersArray = Object.values(book.chapters).sort((a, b) => a.chapter - b.chapter);
    chaptersArray.forEach(ch => {
      ch.verses.sort((a, b) => a.verse - b.verse);
    });
    return {
      id: book.id,
      name: book.name,
      nameEn: book.nameEn,
      chapters: chaptersArray
    };
  });
  
  console.log(`\nProcessed ${totalVerses} verses from ${booksArray.length} books`);
  
  return { books: booksArray };
}

function createSearchIndex(bibleData) {
  const searchIndex = [];
  
  for (const book of bibleData.books) {
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        const chineseWords = verse.text
          .replace(/[，。、；：？！""''（）【】]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length >= 2);
        
        const englishWords = verse.textEn
          .toLowerCase()
          .replace(/[^\w\s]/g, ' ')
          .split(/\s+/)
          .filter(w => w.length >= 3);
        
        searchIndex.push({
          ref: `${book.id}:${chapter.chapter}:${verse.verse}`,
          bookId: book.id,
          bookName: book.name,
          bookNameEn: book.nameEn,
          chapter: chapter.chapter,
          verse: verse.verse,
          text: verse.text,
          textEn: verse.textEn,
          keywords: [...new Set([...chineseWords, ...englishWords])]
        });
      }
    }
  }
  
  return searchIndex;
}

// Main execution
console.log('Starting Bible parsing...\n');

const bibleData = processAllFiles();

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'kjvBible.json'),
  JSON.stringify(bibleData, null, 2)
);
console.log(`\nSaved bible data to ${path.join(OUTPUT_DIR, 'kjvBible.json')}`);

const searchIndex = createSearchIndex(bibleData);
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'bibleSearchIndex.json'),
  JSON.stringify(searchIndex, null, 2)
);
console.log(`Saved search index to ${path.join(OUTPUT_DIR, 'bibleSearchIndex.json')}`);

console.log('\n=== Summary ===');
console.log(`Books: ${bibleData.books.length}`);
console.log(`Total chapters: ${bibleData.books.reduce((sum, b) => sum + b.chapters.length, 0)}`);
console.log(`Total verses: ${bibleData.books.reduce((sum, b) => sum + b.chapters.reduce((cSum, c) => cSum + c.verses.length, 0), 0)}`);
console.log(`Search index entries: ${searchIndex.length}`);
