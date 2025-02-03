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
  // Get the saved theme and primary color from localStorage, or use defaults
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || "light";
  });

  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>(() => {
    const savedPrimaryColor = localStorage.getItem(
      "primaryColor"
    ) as PrimaryColor | null;
    return savedPrimaryColor || "blue";
  });

  // Save the theme and primary color to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("primaryColor", primaryColor);
  }, [primaryColor]);

  // Apply the selected theme to the :root element
  useEffect(() => {
    const root = document.documentElement;

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
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const root = document.documentElement;
        const systemTheme = e.matches ? "dark" : "light";
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  // Apply the selected primary color to the :root element
  useEffect(() => {
    const root = document.documentElement;
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
