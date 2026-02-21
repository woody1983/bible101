/**
 * Exam 答案存储服务 - 使用 IndexedDB
 * 纯前端实现，无后端
 */

const DB_NAME = 'Bible101ExamDB';
const DB_VERSION = 1;
const STORE_NAME = 'examAnswers';

export interface ExamAnswer {
  id: string;           // 格式: bookId-chapter-questionIndex
  bookId: string;
  bookName: string;
  chapter: number;
  question: string;
  answer: string;
  updatedAt: string;    // ISO 8601 格式
}

class ExamStorage {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          store.createIndex('bookId', 'bookId', { unique: false });
          store.createIndex('chapter', 'chapter', { unique: false });
        }
      };
    });
  }

  async saveAnswer(answer: ExamAnswer): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      
      const request = store.put({
        ...answer,
        updatedAt: new Date().toISOString(),
      });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getAnswer(id: string): Promise<ExamAnswer | null> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getAnswersByChapter(bookId: string, chapter: number): Promise<ExamAnswer[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('bookId');
      const request = index.getAll(bookId);

      request.onsuccess = () => {
        const results = request.result.filter((a: ExamAnswer) => a.chapter === chapter);
        resolve(results);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async getAllAnswers(): Promise<ExamAnswer[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteAnswer(id: string): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async exportToCSV(): Promise<string> {
    const answers = await this.getAllAnswers();
    
    // CSV 头部
    const headers = ['书卷', '章节', '问题', '答案', '更新时间'];
    
    // 数据行
    const rows = answers.map(a => [
      a.bookName,
      a.chapter,
      a.question,
      a.answer,
      new Date(a.updatedAt).toLocaleString('zh-CN'),
    ]);
    
    // 转义 CSV 特殊字符
    const escapeCSV = (str: string) => {
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    };
    
    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(escapeCSV).join(',')),
    ].join('\n');
    
    return csv;
  }

  downloadCSV(csv: string, filename: string = 'exam_answers.csv'): void {
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

export const examStorage = new ExamStorage();
