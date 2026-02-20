import type { BibleCategory, BibleChapter } from '../types';

// 旧约书卷数据
export const oldTestamentCategories: BibleCategory[] = [
  {
    id: 'pentateuch',
    name: '摩西五经',
    nameEn: 'Pentateuch',
    testament: 'old',
    order: 1,
    books: [
      { id: 'genesis', name: '创世记', nameEn: 'Genesis', nameShort: '创', abbreviation: 'Gen', chapters: 50, categoryId: 'pentateuch', order: 1 },
      { id: 'exodus', name: '出埃及记', nameEn: 'Exodus', nameShort: '出', abbreviation: 'Exo', chapters: 40, categoryId: 'pentateuch', order: 2 },
      { id: 'leviticus', name: '利未记', nameEn: 'Leviticus', nameShort: '利', abbreviation: 'Lev', chapters: 27, categoryId: 'pentateuch', order: 3 },
      { id: 'numbers', name: '民数记', nameEn: 'Numbers', nameShort: '民', abbreviation: 'Num', chapters: 36, categoryId: 'pentateuch', order: 4 },
      { id: 'deuteronomy', name: '申命记', nameEn: 'Deuteronomy', nameShort: '申', abbreviation: 'Deu', chapters: 34, categoryId: 'pentateuch', order: 5 },
    ]
  },
  {
    id: 'historical',
    name: '历史书',
    nameEn: 'Historical Books',
    testament: 'old',
    order: 2,
    books: [
      { id: 'joshua', name: '约书亚记', nameEn: 'Joshua', nameShort: '书', abbreviation: 'Jos', chapters: 24, categoryId: 'historical', order: 6 },
      { id: 'judges', name: '士师记', nameEn: 'Judges', nameShort: '士', abbreviation: 'Jdg', chapters: 21, categoryId: 'historical', order: 7 },
      { id: 'ruth', name: '路得记', nameEn: 'Ruth', nameShort: '得', abbreviation: 'Rut', chapters: 4, categoryId: 'historical', order: 8 },
      { id: '1samuel', name: '撒母耳记上', nameEn: '1 Samuel', nameShort: '撒上', abbreviation: '1Sa', chapters: 31, categoryId: 'historical', order: 9 },
      { id: '2samuel', name: '撒母耳记下', nameEn: '2 Samuel', nameShort: '撒下', abbreviation: '2Sa', chapters: 24, categoryId: 'historical', order: 10 },
      { id: '1kings', name: '列王纪上', nameEn: '1 Kings', nameShort: '王上', abbreviation: '1Ki', chapters: 22, categoryId: 'historical', order: 11 },
      { id: '2kings', name: '列王纪下', nameEn: '2 Kings', nameShort: '王下', abbreviation: '2Ki', chapters: 25, categoryId: 'historical', order: 12 },
      { id: '1chronicles', name: '历代志上', nameEn: '1 Chronicles', nameShort: '代上', abbreviation: '1Ch', chapters: 29, categoryId: 'historical', order: 13 },
      { id: '2chronicles', name: '历代志下', nameEn: '2 Chronicles', nameShort: '代下', abbreviation: '2Ch', chapters: 36, categoryId: 'historical', order: 14 },
      { id: 'ezra', name: '以斯拉记', nameEn: 'Ezra', nameShort: '拉', abbreviation: 'Ezr', chapters: 10, categoryId: 'historical', order: 15 },
      { id: 'nehemiah', name: '尼希米记', nameEn: 'Nehemiah', nameShort: '尼', abbreviation: 'Neh', chapters: 13, categoryId: 'historical', order: 16 },
      { id: 'esther', name: '以斯帖记', nameEn: 'Esther', nameShort: '斯', abbreviation: 'Est', chapters: 10, categoryId: 'historical', order: 17 },
    ]
  },
  {
    id: 'wisdom',
    name: '诗歌智慧书',
    nameEn: 'Wisdom Books',
    testament: 'old',
    order: 3,
    books: [
      { id: 'job', name: '约伯记', nameEn: 'Job', nameShort: '伯', abbreviation: 'Job', chapters: 42, categoryId: 'wisdom', order: 18 },
      { id: 'psalms', name: '诗篇', nameEn: 'Psalms', nameShort: '诗', abbreviation: 'Psa', chapters: 150, categoryId: 'wisdom', order: 19 },
      { id: 'proverbs', name: '箴言', nameEn: 'Proverbs', nameShort: '箴', abbreviation: 'Pro', chapters: 31, categoryId: 'wisdom', order: 20 },
      { id: 'ecclesiastes', name: '传道书', nameEn: 'Ecclesiastes', nameShort: '传', abbreviation: 'Ecc', chapters: 12, categoryId: 'wisdom', order: 21 },
      { id: 'songofsolomon', name: '雅歌', nameEn: 'Song of Solomon', nameShort: '歌', abbreviation: 'Son', chapters: 8, categoryId: 'wisdom', order: 22 },
    ]
  },
  {
    id: 'major-prophets',
    name: '大先知书',
    nameEn: 'Major Prophets',
    testament: 'old',
    order: 4,
    books: [
      { id: 'isaiah', name: '以赛亚书', nameEn: 'Isaiah', nameShort: '赛', abbreviation: 'Isa', chapters: 66, categoryId: 'major-prophets', order: 23 },
      { id: 'jeremiah', name: '耶利米书', nameEn: 'Jeremiah', nameShort: '耶', abbreviation: 'Jer', chapters: 52, categoryId: 'major-prophets', order: 24 },
      { id: 'lamentations', name: '耶利米哀歌', nameEn: 'Lamentations', nameShort: '哀', abbreviation: 'Lam', chapters: 5, categoryId: 'major-prophets', order: 25 },
      { id: 'ezekiel', name: '以西结书', nameEn: 'Ezekiel', nameShort: '结', abbreviation: 'Eze', chapters: 48, categoryId: 'major-prophets', order: 26 },
      { id: 'daniel', name: '但以理书', nameEn: 'Daniel', nameShort: '但', abbreviation: 'Dan', chapters: 12, categoryId: 'major-prophets', order: 27 },
    ]
  },
  {
    id: 'minor-prophets',
    name: '小先知书',
    nameEn: 'Minor Prophets',
    testament: 'old',
    order: 5,
    books: [
      { id: 'hosea', name: '何西阿书', nameEn: 'Hosea', nameShort: '何', abbreviation: 'Hos', chapters: 14, categoryId: 'minor-prophets', order: 28 },
      { id: 'joel', name: '约珥书', nameEn: 'Joel', nameShort: '珥', abbreviation: 'Joe', chapters: 3, categoryId: 'minor-prophets', order: 29 },
      { id: 'amos', name: '阿摩司书', nameEn: 'Amos', nameShort: '摩', abbreviation: 'Amo', chapters: 9, categoryId: 'minor-prophets', order: 30 },
      { id: 'obadiah', name: '俄巴底亚书', nameEn: 'Obadiah', nameShort: '俄', abbreviation: 'Oba', chapters: 1, categoryId: 'minor-prophets', order: 31 },
      { id: 'jonah', name: '约拿书', nameEn: 'Jonah', nameShort: '拿', abbreviation: 'Jon', chapters: 4, categoryId: 'minor-prophets', order: 32 },
      { id: 'micah', name: '弥迦书', nameEn: 'Micah', nameShort: '弥', abbreviation: 'Mic', chapters: 7, categoryId: 'minor-prophets', order: 33 },
      { id: 'nahum', name: '那鸿书', nameEn: 'Nahum', nameShort: '鸿', abbreviation: 'Nah', chapters: 3, categoryId: 'minor-prophets', order: 34 },
      { id: 'habakkuk', name: '哈巴谷书', nameEn: 'Habakkuk', nameShort: '哈', abbreviation: 'Hab', chapters: 3, categoryId: 'minor-prophets', order: 35 },
      { id: 'zephaniah', name: '西番雅书', nameEn: 'Zephaniah', nameShort: '番', abbreviation: 'Zep', chapters: 3, categoryId: 'minor-prophets', order: 36 },
      { id: 'haggai', name: '哈该书', nameEn: 'Haggai', nameShort: '该', abbreviation: 'Hag', chapters: 2, categoryId: 'minor-prophets', order: 37 },
      { id: 'zechariah', name: '撒迦利亚书', nameEn: 'Zechariah', nameShort: '亚', abbreviation: 'Zec', chapters: 14, categoryId: 'minor-prophets', order: 38 },
      { id: 'malachi', name: '玛拉基书', nameEn: 'Malachi', nameShort: '玛', abbreviation: 'Mal', chapters: 4, categoryId: 'minor-prophets', order: 39 },
    ]
  },
];

// 新约书卷数据
export const newTestamentCategories: BibleCategory[] = [
  {
    id: 'gospels',
    name: '四福音',
    nameEn: 'Gospels',
    testament: 'new',
    order: 1,
    books: [
      { id: 'matthew', name: '马太福音', nameEn: 'Matthew', nameShort: '太', abbreviation: 'Mat', chapters: 28, categoryId: 'gospels', order: 40 },
      { id: 'mark', name: '马可福音', nameEn: 'Mark', nameShort: '可', abbreviation: 'Mar', chapters: 16, categoryId: 'gospels', order: 41 },
      { id: 'luke', name: '路加福音', nameEn: 'Luke', nameShort: '路', abbreviation: 'Luk', chapters: 24, categoryId: 'gospels', order: 42 },
      { id: 'john', name: '约翰福音', nameEn: 'John', nameShort: '约', abbreviation: 'Joh', chapters: 21, categoryId: 'gospels', order: 43 },
    ]
  },
  {
    id: 'acts',
    name: '教会历史',
    nameEn: 'Acts',
    testament: 'new',
    order: 2,
    books: [
      { id: 'acts', name: '使徒行传', nameEn: 'Acts', nameShort: '徒', abbreviation: 'Act', chapters: 28, categoryId: 'acts', order: 44 },
    ]
  },
  {
    id: 'pauline',
    name: '保罗书信',
    nameEn: 'Pauline Epistles',
    testament: 'new',
    order: 3,
    books: [
      { id: 'romans', name: '罗马书', nameEn: 'Romans', nameShort: '罗', abbreviation: 'Rom', chapters: 16, categoryId: 'pauline', order: 45 },
      { id: '1corinthians', name: '哥林多前书', nameEn: '1 Corinthians', nameShort: '林前', abbreviation: '1Co', chapters: 16, categoryId: 'pauline', order: 46 },
      { id: '2corinthians', name: '哥林多后书', nameEn: '2 Corinthians', nameShort: '林后', abbreviation: '2Co', chapters: 13, categoryId: 'pauline', order: 47 },
      { id: 'galatians', name: '加拉太书', nameEn: 'Galatians', nameShort: '加', abbreviation: 'Gal', chapters: 6, categoryId: 'pauline', order: 48 },
      { id: 'ephesians', name: '以弗所书', nameEn: 'Ephesians', nameShort: '弗', abbreviation: 'Eph', chapters: 6, categoryId: 'pauline', order: 49 },
      { id: 'philippians', name: '腓立比书', nameEn: 'Philippians', nameShort: '腓', abbreviation: 'Phl', chapters: 4, categoryId: 'pauline', order: 50 },
      { id: 'colossians', name: '歌罗西书', nameEn: 'Colossians', nameShort: '西', abbreviation: 'Col', chapters: 4, categoryId: 'pauline', order: 51 },
      { id: '1thessalonians', name: '帖撒罗尼迦前书', nameEn: '1 Thessalonians', nameShort: '帖前', abbreviation: '1Th', chapters: 5, categoryId: 'pauline', order: 52 },
      { id: '2thessalonians', name: '帖撒罗尼迦后书', nameEn: '2 Thessalonians', nameShort: '帖后', abbreviation: '2Th', chapters: 3, categoryId: 'pauline', order: 53 },
      { id: '1timothy', name: '提摩太前书', nameEn: '1 Timothy', nameShort: '提前', abbreviation: '1Ti', chapters: 6, categoryId: 'pauline', order: 54 },
      { id: '2timothy', name: '提摩太后书', nameEn: '2 Timothy', nameShort: '提后', abbreviation: '2Ti', chapters: 4, categoryId: 'pauline', order: 55 },
      { id: 'titus', name: '提多书', nameEn: 'Titus', nameShort: '多', abbreviation: 'Tit', chapters: 3, categoryId: 'pauline', order: 56 },
      { id: 'philemon', name: '腓利门书', nameEn: 'Philemon', nameShort: '门', abbreviation: 'Phm', chapters: 1, categoryId: 'pauline', order: 57 },
    ]
  },
  {
    id: 'general-epistles',
    name: '普通书信',
    nameEn: 'General Epistles',
    testament: 'new',
    order: 4,
    books: [
      { id: 'hebrews', name: '希伯来书', nameEn: 'Hebrews', nameShort: '来', abbreviation: 'Heb', chapters: 13, categoryId: 'general-epistles', order: 58 },
      { id: 'james', name: '雅各书', nameEn: 'James', nameShort: '雅', abbreviation: 'Jam', chapters: 5, categoryId: 'general-epistles', order: 59 },
      { id: '1peter', name: '彼得前书', nameEn: '1 Peter', nameShort: '彼前', abbreviation: '1Pe', chapters: 5, categoryId: 'general-epistles', order: 60 },
      { id: '2peter', name: '彼得后书', nameEn: '2 Peter', nameShort: '彼后', abbreviation: '2Pe', chapters: 3, categoryId: 'general-epistles', order: 61 },
      { id: '1john', name: '约翰一书', nameEn: '1 John', nameShort: '约一', abbreviation: '1Jo', chapters: 5, categoryId: 'general-epistles', order: 62 },
      { id: '2john', name: '约翰二书', nameEn: '2 John', nameShort: '约二', abbreviation: '2Jo', chapters: 1, categoryId: 'general-epistles', order: 63 },
      { id: '3john', name: '约翰三书', nameEn: '3 John', nameShort: '约三', abbreviation: '3Jo', chapters: 1, categoryId: 'general-epistles', order: 64 },
      { id: 'jude', name: '犹大书', nameEn: 'Jude', nameShort: '犹', abbreviation: 'Jud', chapters: 1, categoryId: 'general-epistles', order: 65 },
    ]
  },
  {
    id: 'revelation',
    name: '启示录',
    nameEn: 'Revelation',
    testament: 'new',
    order: 5,
    books: [
      { id: 'revelation', name: '启示录', nameEn: 'Revelation', nameShort: '启', abbreviation: 'Rev', chapters: 22, categoryId: 'revelation', order: 66 },
    ]
  },
];

// 所有书卷分类
export const allCategories: BibleCategory[] = [...oldTestamentCategories, ...newTestamentCategories];

// 所有书卷
export const allBooks = allCategories.flatMap(cat => cat.books);

// 获取书卷
export function getBookById(bookId: string) {
  return allBooks.find(book => book.id === bookId);
}

// 获取分类
export function getCategoryById(categoryId: string) {
  return allCategories.find(cat => cat.id === categoryId);
}

// 示例章节数据（诗篇 23 篇）
export const sampleChapter: BibleChapter = {
  id: 'psalms-23',
  bookId: 'psalms',
  chapterNumber: 23,
  title: '耶和华是我的牧者',
  verseCount: 6,
  keyVerses: [
    {
      id: 'psalms-23-1',
      verseNumber: 1,
      text: '耶和华是我的牧者，我必不至缺乏。',
      textEn: 'The Lord is my shepherd; I shall not want.',
      highlight: '耶和华是我的牧者',
      explanation: '这是诗篇中最著名的宣告之一，表达了诗人对上帝完全的信靠和依赖。'
    },
    {
      id: 'psalms-23-4',
      verseNumber: 4,
      text: '我虽然行过死荫的幽谷，也不怕遭害，因为你与我同在；你的杖，你的竿，都安慰我。',
      textEn: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
      highlight: '死荫的幽谷',
      explanation: '象征人生中最黑暗、最危险的时期，但上帝的同在是最深的安慰。'
    }
  ],
  keyPoints: [
    {
      id: 'psalms-23-point-1',
      title: '上帝的供应',
      content: '作为牧者，上帝供应我们一切的需要：青草地、可安歇的水边、灵魂的苏醒。',
      order: 1,
      icon: 'shepherd'
    },
    {
      id: 'psalms-23-point-2',
      title: '上帝的引导',
      content: '上帝引导我们走义路，即使在黑暗中，祂的杖和竿也给我们安慰和保护。',
      order: 2,
      icon: 'compass'
    },
    {
      id: 'psalms-23-point-3',
      title: '上帝的同在',
      content: '无论环境如何，上帝始终与我们同在，这是最大的安慰和保障。',
      order: 3,
      icon: 'heart'
    }
  ],
  studyNotes: {
    historicalContext: '诗篇 23 篇是大卫的诗，大卫年轻时曾做过牧羊人，对牧者和羊的关系有深刻的体会。这首诗反映了他对上帝作为个人牧者的认识和信靠。',
    culturalContext: '在古代近东，牧羊人是常见的职业，牧者与羊的关系是亲密和负责任的。牧者不仅要带领羊群找到食物和水源，还要保护它们免受野兽和盗贼的伤害。',
    theologicalThemes: ['上帝的供应', '上帝的引导', '上帝的保护', '上帝的同在'],
    keyTerms: [
      {
        term: '牧者',
        definition: '在古代文化中，牧者负责羊群的喂养、引导和保护。在圣经中，上帝常被比喻为牧者，祂的子民则是祂的羊群。',
        references: ['约翰福音 10:11', '以西结书 34:11-16']
      },
      {
        term: '死荫的幽谷',
        definition: '象征人生中最黑暗、最危险的时期，可能是死亡、疾病、患难或其他极端困难的环境。',
        references: ['诗篇 44:19', '耶利米书 2:6']
      }
    ],
    crossReferences: [
      { book: '约翰福音', chapter: 10, verses: '1-18', text: '我是好牧人' },
      { book: '以赛亚书', chapter: 40, verses: '11', text: '祂必像牧人牧养自己的羊群' },
      { book: '启示录', chapter: 7, verses: '17', text: '因为宝座中的羔羊必牧养他们' }
    ]
  },
  application: {
    personalQuestions: [
      { id: 'q1', question: '你是否真正相信上帝是你的牧者？在日常生活中如何体现这种信靠？', order: 1 },
      { id: 'q2', question: '在你生命的"死荫幽谷"中，你如何经历上帝的同在和安慰？', order: 2 }
    ],
    groupQuestions: [
      { id: 'gq1', question: '分享一次你深刻经历上帝供应的经历。', order: 1 },
      { id: 'gq2', question: '牧者的形象如何帮助你理解上帝与你的关系？', order: 2 }
    ],
    practicalSteps: [
      '每天默想一节经文，思想上帝如何是你的牧者。',
      '在困难时，提醒自己上帝与你同在，祂的杖和竿会保护你。',
      '学习像大卫一样，在各种环境中都信靠上帝的供应。'
    ]
  },
  relatedChapters: ['psalms-22', 'psalms-24', 'john-10']
};
