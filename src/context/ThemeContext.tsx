import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
type PrimaryColor = "blue" | "purple" | "green" | "orange";

interface ThemeContextType {
  theme: Theme;
  primaryColor: PrimaryColor;
  setTheme: (theme: Theme) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>("blue");

  useEffect(() => {
    const root = document.documentElement;

    // Apply theme (light/dark/system)
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;

    // Apply primary color
    root.style.setProperty("--primary", `var(--${primaryColor})`);
    root.style.setProperty(
      "--primary-foreground",
      `var(--${primaryColor}-foreground)`
    );
  }, [primaryColor]);

  return (
    <ThemeContext.Provider
      value={{ theme, primaryColor, setTheme, setPrimaryColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
