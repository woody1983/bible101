import { describe, it, expect } from 'vitest';
import { colors } from './colors';

describe('Color Scheme', () => {
  describe('Primary Colors (Life/Growth)', () => {
    it('should have Botanist as primary color', () => {
      expect(colors.primary.DEFAULT).toBe('#89D385');
    });
    
    it('should have Matcha Latte as light primary', () => {
      expect(colors.primary.light).toBe('#D1EFBD');
    });
    
    it('should have darker variant for hover states', () => {
      expect(colors.primary.dark).toBeDefined();
    });
  });
  
  describe('Secondary Colors (Peace/Water)', () => {
    it('should have Aquamarine as secondary color', () => {
      expect(colors.secondary.DEFAULT).toBe('#6CD1F0');
    });
  });
  
  describe('Accent Colors (Spirit/Joy)', () => {
    it('should have Grape Soda as purple accent', () => {
      expect(colors.accent.purple).toBe('#A1A1F7');
    });
    
    it('should have Pink Diamond as pink accent', () => {
      expect(colors.accent.pink).toBe('#EFCCEA');
    });
  });
  
  describe('Background Colors', () => {
    it('should have white as default background', () => {
      expect(colors.background.DEFAULT).toBe('#FFFFFF');
    });
    
    it('should have Matcha Latte as soft background', () => {
      expect(colors.background.soft).toBe('#D1EFBD');
    });
  });
  
  describe('Text Colors', () => {
    it('should have dark primary text for readability', () => {
      expect(colors.text.primary).toBe('#2D3748');
    });
    
    it('should have inverse text color for dark backgrounds', () => {
      expect(colors.text.inverse).toBe('#FFFFFF');
    });
  });
  
  describe('Glass Effect', () => {
    it('should have white glass effect', () => {
      expect(colors.glass.white).toContain('rgba');
    });
  });
});
