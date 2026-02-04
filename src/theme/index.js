import * as colors from './colors';
import * as typography from './typography';
import * as animations from './animations';
import * as glassmorphism from './glassmorphism';

// Consolidate all theme parts into a single object
// This is useful for Context API or passing theme to components
export const theme = {
  colors: colors.default || colors,
  typography: typography.default || typography,
  animations: animations.default || animations,
  glassmorphism: glassmorphism.default || glassmorphism,
};

// Re-export individual parts for direct imports
export * from './colors';
export * from './typography';
export * from './animations';
export * from './glassmorphism';

export default theme;
