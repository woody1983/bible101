import { describe, it, expect } from 'vitest';
import { detectPrayerTheme, type PrayerTheme } from './prayerThemeDetector';

describe('Prayer Theme Detector', () => {
  it('should detect thanksgiving theme from Chinese keywords', () => {
    expect(detectPrayerTheme('感谢神给我的一切')).toBe('thanksgiving');
    expect(detectPrayerTheme('感恩祢的恩典')).toBe('thanksgiving');
    expect(detectPrayerTheme('谢谢主的保守')).toBe('thanksgiving');
  });

  it('should detect petition theme from Chinese keywords', () => {
    expect(detectPrayerTheme('我需要帮助')).toBe('petition');
    expect(detectPrayerTheme('求祢帮助')).toBe('petition');
    expect(detectPrayerTheme('请帮助')).toBe('petition');
  });

  it('should detect confession theme from Chinese keywords', () => {
    expect(detectPrayerTheme('我有罪')).toBe('confession');
    expect(detectPrayerTheme('求主赦免我的过错')).toBe('confession');
    expect(detectPrayerTheme('我要悔改')).toBe('confession');
  });

  it('should detect intercession theme from Chinese keywords', () => {
    expect(detectPrayerTheme('为我的家人祷告')).toBe('intercession');
    expect(detectPrayerTheme('朋友生病了')).toBe('intercession');
    expect(detectPrayerTheme('为病人祈求')).toBe('intercession');
  });

  it('should detect protection theme from Chinese keywords', () => {
    expect(detectPrayerTheme('我很害怕')).toBe('protection');
    expect(detectPrayerTheme('保护我')).toBe('protection');
    expect(detectPrayerTheme('平安')).toBe('protection');
  });

  it('should detect guidance theme from Chinese keywords', () => {
    expect(detectPrayerTheme('我很迷茫')).toBe('guidance');
    expect(detectPrayerTheme('方向')).toBe('guidance');
    expect(detectPrayerTheme('选择')).toBe('guidance');
  });

  it('should detect thanksgiving theme from English keywords', () => {
    expect(detectPrayerTheme('thank you God')).toBe('thanksgiving');
    expect(detectPrayerTheme('I am grateful')).toBe('thanksgiving');
    expect(detectPrayerTheme('blessing')).toBe('thanksgiving');
  });

  it('should detect petition theme from English keywords', () => {
    expect(detectPrayerTheme('I ask for help')).toBe('petition');
    expect(detectPrayerTheme('I need strength')).toBe('petition');
    expect(detectPrayerTheme('please help me')).toBe('petition');
  });

  it('should default to petition when no keywords match', () => {
    expect(detectPrayerTheme('random text')).toBe('petition');
    expect(detectPrayerTheme('')).toBe('petition');
  });

  it('should be case insensitive', () => {
    expect(detectPrayerTheme('THANK YOU')).toBe('thanksgiving');
    expect(detectPrayerTheme('Thank You')).toBe('thanksgiving');
    expect(detectPrayerTheme('thank you')).toBe('thanksgiving');
  });
});
