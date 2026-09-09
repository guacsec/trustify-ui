import React from "react";

export const THEME_MODES = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark",
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

export const isThemeModeValid = (value: string): value is ThemeMode => {
  return ["system", "light", "dark"].includes(value);
};

export const getSystemTheme = (): Exclude<ThemeMode, "system"> => {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

export const ThemeContext = React.createContext<ThemeState>({
  mode: "system",
  setMode: () => {},
  isDark: false,
});
