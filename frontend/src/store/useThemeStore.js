// src/store/useThemeStore.js
import { create } from "zustand";

// Define default values as constants for easy reset
const DEFAULT_THEME = "system";
const DEFAULT_WALLPAPER_COLOR = "#384050"; // Your default color
const DEFAULT_TEXT_SIZE_CLASS = "text-base";
const DEFAULT_FONT_FAMILY_CLASS = "font-open-sans"; // Your default font

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || DEFAULT_THEME,
  chatWallpaperColor: localStorage.getItem("chatWallpaperColor") || DEFAULT_WALLPAPER_COLOR,
  textSize: localStorage.getItem("textSize") || DEFAULT_TEXT_SIZE_CLASS,
  fontFamily: localStorage.getItem("fontFamily") || DEFAULT_FONT_FAMILY_CLASS,

  setTheme: (newTheme) => {
    localStorage.setItem("chat-theme", newTheme);
    set({ theme: newTheme });

    const actualTheme = newTheme === "system"
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme;
    document.documentElement.setAttribute("data-theme", actualTheme);
    if (actualTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
  setChatWallpaperColor: (color) => {
    localStorage.setItem("chatWallpaperColor", color);
    set({ chatWallpaperColor: color });
  },
  setTextSize: (sizeClass) => {
    localStorage.setItem("textSize", sizeClass);
    set({ textSize: sizeClass });
  },
  setFontFamily: (fontClass) => {
    localStorage.setItem("fontFamily", fontClass);
    set({ fontFamily: fontClass });
  },

  // NEW ACTION: Resets all theme settings to default and clears localStorage
  resetTheme: () => {
    localStorage.removeItem("chat-theme");
    localStorage.removeItem("chatWallpaperColor");
    localStorage.removeItem("textSize");
    localStorage.removeItem("fontFamily");

    // Also reset the HTML data-theme attribute
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute("data-theme", systemPrefersDark ? 'dark' : 'light');
    if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    set({
      theme: DEFAULT_THEME,
      chatWallpaperColor: DEFAULT_WALLPAPER_COLOR,
      textSize: DEFAULT_TEXT_SIZE_CLASS,
      fontFamily: DEFAULT_FONT_FAMILY_CLASS,
    });
  },
}));

// IIFE to apply initial theme on app load
(function () {
  const storedTheme = localStorage.getItem('chat-theme');
  let initialTheme = storedTheme || DEFAULT_THEME;
  let actualInitialTheme = initialTheme;

  if (initialTheme === 'system') {
    actualInitialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else {
    actualInitialTheme = initialTheme;
  }

  document.documentElement.setAttribute('data-theme', actualInitialTheme);
  if (actualInitialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Set the theme in Zustand store initially
  useThemeStore.setState({ theme: initialTheme });
})();