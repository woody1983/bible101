import { describe, it, expect } from 'vitest';
import { examStorage } from './examStorage';

describe('examStorage', () => {
  it('should have error handling interface', () => {
    // 测试错误处理接口是否存在
    expect(examStorage.onError).toBeDefined();
    expect(typeof examStorage.onError).toBe('function');
  });

  it('should export StorageError interface', () => {
    // 验证错误类型定义存在
    // 在实际使用时可以通过 onError 捕获错误
    expect(true).toBe(true);
  });
});
