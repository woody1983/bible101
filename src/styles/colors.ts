// 新配色方案 - Sacred Modernism
// 基于 Issue #2 的配色要求

export const colors = {
  // Primary - Life/Growth
  primary: {
    DEFAULT: '#89D385', // Botanist
    light: '#D1EFBD', // Matcha Latte
    dark: '#6BB866',
  },
  
  // Secondary - Peace/Water
  secondary: {
    DEFAULT: '#6CD1F0', // Aquamarine
    light: '#A8E6F5',
    dark: '#4AB8D9',
  },
  
  // Accent - Spirit/Joy
  accent: {
    purple: '#A1A1F7', // Grape Soda
    pink: '#EFCCEA', // Pink Diamond
  },
  
  // Background
  background: {
    DEFAULT: '#FFFFFF',
    soft: '#D1EFBD', // Matcha Latte gradient base
    card: '#FFFFFF',
  },
  
  // Text
  text: {
    primary: '#2D3748',
    secondary: '#4A5568',
    muted: '#718096',
    inverse: '#FFFFFF',
  },
  
  // Glass effect
  glass: {
    white: 'rgba(255, 255, 255, 0.8)',
    light: 'rgba(255, 255, 255, 0.6)',
  },
} as const;

export type ColorScheme = typeof colors;
