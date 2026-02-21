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

export interface StorageError {
  type: 'INIT_ERROR' | 'SAVE_ERROR' | 'GET_ERROR' | 'DELETE_ERROR' | 'EXPORT_ERROR';
  message: string;
  originalError?: Error;
}

class ExamStorage {
  private db: IDBDatabase | null = null;
  private errorHandlers: ((error: StorageError) => void)[] = [];

  // 注册错误处理器
  onError(handler: (error: StorageError) => void): void {
    this.errorHandlers.push(handler);
  }

  // 触发错误
  private emitError(error: StorageError): void {
    console.error('[ExamStorage Error]', error);
    this.errorHandlers.forEach((handler) => handler(error));
  }

  async init(): Promise<boolean> {
    try {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
          const error: StorageError = {
            type: 'INIT_ERROR',
            message: 'Failed to open IndexedDB',
            originalError: request.error || undefined,
          };
          this.emitError(error);
          reject(error);
        };

        request.onsuccess = () => {
          this.db = request.result;
          resolve(true);
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
    } catch (error) {
      const storageError: StorageError = {
        type: 'INIT_ERROR',
        message: 'Unexpected error during initialization',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
      return false;
    }
  }

  async saveAnswer(answer: ExamAnswer): Promise<boolean> {
    if (!this.db) {
      const initialized = await this.init();
      if (!initialized) return false;
    }
    
    try {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const request = store.put({
          ...answer,
          updatedAt: new Date().toISOString(),
        });

        request.onsuccess = () => resolve(true);
        request.onerror = () => {
          const error: StorageError = {
            type: 'SAVE_ERROR',
            message: `Failed to save answer for ${answer.id}`,
            originalError: request.error || undefined,
          };
          this.emitError(error);
          reject(error);
        };
      });
    } catch (error) {
      const storageError: StorageError = {
        type: 'SAVE_ERROR',
        message: 'Unexpected error while saving answer',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
      return false;
    }
  }

  async getAnswer(id: string): Promise<ExamAnswer | null> {
    if (!this.db) {
      const initialized = await this.init();
      if (!initialized) return null;
    }
    
    try {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => {
          const error: StorageError = {
            type: 'GET_ERROR',
            message: `Failed to get answer for ${id}`,
            originalError: request.error || undefined,
          };
          this.emitError(error);
          reject(error);
        };
      });
    } catch (error) {
      const storageError: StorageError = {
        type: 'GET_ERROR',
        message: 'Unexpected error while getting answer',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
      return null;
    }
  }

  async getAnswersByChapter(bookId: string, chapter: number): Promise<ExamAnswer[]> {
    if (!this.db) {
      const initialized = await this.init();
      if (!initialized) return [];
    }
    
    try {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('bookId');
        const request = index.getAll(bookId);

        request.onsuccess = () => {
          const results = request.result.filter((a: ExamAnswer) => a.chapter === chapter);
          resolve(results);
        };
        request.onerror = () => {
          const error: StorageError = {
            type: 'GET_ERROR',
            message: `Failed to get answers for ${bookId} chapter ${chapter}`,
            originalError: request.error || undefined,
          };
          this.emitError(error);
          reject(error);
        };
      });
    } catch (error) {
      const storageError: StorageError = {
        type: 'GET_ERROR',
        message: 'Unexpected error while getting answers by chapter',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
      return [];
    }
  }

  async getAllAnswers(): Promise<ExamAnswer[]> {
    if (!this.db) {
      const initialized = await this.init();
      if (!initialized) return [];
    }
    
    try {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => {
          const error: StorageError = {
            type: 'GET_ERROR',
            message: 'Failed to get all answers',
            originalError: request.error || undefined,
          };
          this.emitError(error);
          reject(error);
        };
      });
    } catch (error) {
      const storageError: StorageError = {
        type: 'GET_ERROR',
        message: 'Unexpected error while getting all answers',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
      return [];
    }
  }

  async deleteAnswer(id: string): Promise<boolean> {
    if (!this.db) {
      const initialized = await this.init();
      if (!initialized) return false;
    }
    
    try {
      return new Promise((resolve, reject) => {
        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => {
          const error: StorageError = {
            type: 'DELETE_ERROR',
            message: `Failed to delete answer ${id}`,
            originalError: request.error || undefined,
          };
          this.emitError(error);
          reject(error);
        };
      });
    } catch (error) {
      const storageError: StorageError = {
        type: 'DELETE_ERROR',
        message: 'Unexpected error while deleting answer',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
      return false;
    }
  }

  async exportToCSV(): Promise<string> {
    try {
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
    } catch (error) {
      const storageError: StorageError = {
        type: 'EXPORT_ERROR',
        message: 'Failed to export answers to CSV',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
      return '';
    }
  }

  downloadCSV(csv: string, filename: string = 'exam_answers.csv'): void {
    try {
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      const storageError: StorageError = {
        type: 'EXPORT_ERROR',
        message: 'Failed to download CSV file',
        originalError: error instanceof Error ? error : undefined,
      };
      this.emitError(storageError);
    }
  }
}

export const examStorage = new ExamStorage();
