 // src/hooks/DynamicCSSLoader.js
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// Custom hook to dynamically load CSS files based on theme
export const useDynamicCSS = (cssKey) => {
  const { theme, themeConfig } = useTheme();

  useEffect(() => {
    // Remove existing CSS link for this component
    const existingLink = document.querySelector(`link[data-css-key="${cssKey}"]`);
    if (existingLink) {
      existingLink.remove();
    }

    // Create new CSS link element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = themeConfig[theme][cssKey];
    link.setAttribute('data-css-key', cssKey);
    link.setAttribute('data-theme', theme);

    // Add to document head
    document.head.appendChild(link);

    // Cleanup function
    return () => {
      const linkToRemove = document.querySelector(`link[data-css-key="${cssKey}"]`);
      if (linkToRemove) {
        linkToRemove.remove();
      }
    };
  }, [theme, cssKey, themeConfig]);
};

// Alternative: Component wrapper that loads CSS
export const WithThemeCSS = ({ cssKey, children }) => {
  useDynamicCSS(cssKey);
  return children;
};

export default useDynamicCSS;