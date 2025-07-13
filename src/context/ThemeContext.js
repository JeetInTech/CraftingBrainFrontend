// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  // Toggle between themes
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Save theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    // Optional: Add theme class to body for global styling
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Theme configuration object
  const themeConfig = {
    dark: {
      // CSS file mappings for dark theme
      header: "/css/Header.css",
      hero: "/css/Hero.css",
      about: "/css/About.css",
      cards: "/css/cards.css",
      contact: "/css/Contact.css",
      course: "/css/Course.css",
      popup: "/css/popup.css",
      footer: "/css/Footer.css",
      courseOverview:"/css/CourseOverview.css",
      workshop:"/css/workshop.css",
    },
    light: {
      // CSS file mappings for light theme
      header: "/css/Header-light.css", 
      hero: "/css/Hero-light.css", 
      about: "/css/About-light.css", 
      cards: "/css/cards-light.css", 
      contact: "/css/Contact-light.css", 
      course: "/css/Course-light.css", 
      popup: "/css/popup-light.css", 
      footer: "/css/Footer-light.css", 
      courseOverview:"/css/CourseOverview-light.css",
      workshop:"/css/workshop-light.css",
    },
  };

  const value = {
    theme,
    toggleTheme,
    themeConfig,
    isDark: theme === "dark",
    isLight: theme === "light",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
