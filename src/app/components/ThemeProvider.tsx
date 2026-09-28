'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeName = 'forest' | 'ocean' | 'sunset' | 'midnight' | 'amber' | 'rose';

interface ThemeColors {
  name: ThemeName;
  label: string;
  background: string;
  backgroundLight: string;
  backgroundLighter: string;
  primary: string;
  primaryDim: string;
  primaryFaint: string;
  text: string;
  textDim: string;
  textFaint: string;
  accent: string;
  gradient: string;
}

const themes: Record<ThemeName, ThemeColors> = {
  forest: {
    name: 'forest',
    label: 'Forest',
    background: '#081711',
    backgroundLight: '#0D231A',
    backgroundLighter: '#143026',
    primary: '#FFFFFF',
    primaryDim: '#B8C5BD',
    primaryFaint: '#6B7A73',
    text: '#FFFFFF',
    textDim: '#B8C5BD',
    textFaint: '#6B7A73',
    accent: '#00D47E',
    gradient: 'from-emerald to-emerald-dim',
  },
  ocean: {
    name: 'ocean',
    label: 'Ocean',
    background: '#06142E',
    backgroundLight: '#0A1F44',
    backgroundLighter: '#0F2A5A',
    primary: '#FFFFFF',
    primaryDim: '#B0C4E8',
    primaryFaint: '#6B8CB8',
    text: '#FFFFFF',
    textDim: '#B0C4E8',
    textFaint: '#6B8CB8',
    accent: '#00B4D8',
    gradient: 'from-cyan-400 to-blue-500',
  },
  sunset: {
    name: 'sunset',
    label: 'Sunset',
    background: '#1A0A0A',
    backgroundLight: '#2D1414',
    backgroundLighter: '#3D1E1E',
    primary: '#FFF5F0',
    primaryDim: '#E8C8B8',
    primaryFaint: '#B88C78',
    text: '#FFF5F0',
    textDim: '#E8C8B8',
    textFaint: '#B88C78',
    accent: '#FF6B35',
    gradient: 'from-orange-400 to-red-500',
  },
  midnight: {
    name: 'midnight',
    label: 'Midnight',
    background: '#050515',
    backgroundLight: '#0A0A2A',
    backgroundLighter: '#121240',
    primary: '#F0F0FF',
    primaryDim: '#C8C8E8',
    primaryFaint: '#8C8CB8',
    text: '#F0F0FF',
    textDim: '#C8C8E8',
    textFaint: '#8C8CB8',
    accent: '#7C5CFF',
    gradient: 'from-violet-400 to-purple-600',
  },
  amber: {
    name: 'amber',
    label: 'Amber',
    background: '#1A1200',
    backgroundLight: '#2D2200',
    backgroundLighter: '#3D3000',
    primary: '#FFF8E8',
    primaryDim: '#E8D0A8',
    primaryFaint: '#B8A068',
    text: '#FFF8E8',
    textDim: '#E8D0A8',
    textFaint: '#B8A068',
    accent: '#FFB800',
    gradient: 'from-yellow-400 to-amber-500',
  },
  rose: {
    name: 'rose',
    label: 'Rose',
    background: '#1A0812',
    backgroundLight: '#2D0F20',
    backgroundLighter: '#3D1528',
    primary: '#FFF0F8',
    primaryDim: '#E8C0D8',
    primaryFaint: '#B880A0',
    text: '#FFF0F8',
    textDim: '#E8C0D8',
    textFaint: '#B880A0',
    accent: '#E84D8A',
    gradient: 'from-pink-400 to-rose-500',
  },
};

interface ThemeContextType {
  theme: ThemeName;
  colors: ThemeColors;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeColors[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('forest');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('origins-theme') as ThemeName | null;
    if (saved && themes[saved]) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('origins-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, mounted]);

  const colors = themes[theme];
  const availableThemes = Object.values(themes);

  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
