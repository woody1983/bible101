import { describe, it, expect } from 'vitest';
import { prayerTemplates, type PrayerTheme, type PrayerTemplate } from './prayerTemplates';

describe('Prayer Templates', () => {
  it('should have all 6 themes', () => {
    const themes: PrayerTheme[] = ['thanksgiving', 'petition', 'confession', 'intercession', 'protection', 'guidance'];
    themes.forEach(theme => {
      expect(prayerTemplates[theme]).toBeDefined();
    });
  });

  it('should have both Chinese and English versions for each theme', () => {
    Object.values(prayerTemplates).forEach((template: PrayerTemplate) => {
      expect(template.zh).toBeDefined();
      expect(template.zh.title).toBeDefined();
      expect(template.zh.content).toBeDefined();
      expect(template.zh.scripture).toBeDefined();
      
      expect(template.en).toBeDefined();
      expect(template.en.title).toBeDefined();
      expect(template.en.content).toBeDefined();
      expect(template.en.scripture).toBeDefined();
    });
  });

  it('should contain placeholder for user input', () => {
    Object.values(prayerTemplates).forEach((template: PrayerTemplate) => {
      expect(template.zh.content).toContain('{content}');
      expect(template.en.content).toContain('{content}');
    });
  });

  it('should have KJV-style English (traditional pronouns)', () => {
    Object.values(prayerTemplates).forEach((template: PrayerTemplate) => {
      const enContent = template.en.content + ' ' + template.en.scripture.text;
      // Check for KJV-style pronouns and verb forms
      const hasKjvStyle = 
        enContent.includes('Thou') || 
        enContent.includes('Thee') || 
        enContent.includes('Thy') ||
        enContent.includes('Thine') ||
        enContent.includes('art') ||
        enContent.includes('hast') ||
        enContent.includes('saith') ||
        enContent.includes('thee') || // lowercase also counts
        enContent.includes('thy');     // lowercase also counts
      
      expect(hasKjvStyle).toBe(true);
    });
  });

  it('should have valid scripture references', () => {
    Object.values(prayerTemplates).forEach((template: PrayerTemplate) => {
      expect(template.zh.scripture.reference).toMatch(/[\u4e00-\u9fa5]+\s+\d+:\d+/); // Chinese format: 诗篇 50:23
      expect(template.en.scripture.reference).toMatch(/[A-Za-z]+\s+\d+:\d+/); // English format: Psalm 50:23
      expect(template.zh.scripture.text).toBeDefined();
      expect(template.en.scripture.text).toBeDefined();
    });
  });

  it('should have keywords for theme detection', () => {
    Object.values(prayerTemplates).forEach((template: PrayerTemplate) => {
      expect(template.keywords.zh.length).toBeGreaterThan(0);
      expect(template.keywords.en.length).toBeGreaterThan(0);
    });
  });
});
