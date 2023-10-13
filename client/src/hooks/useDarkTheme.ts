import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Theme = "light" | "dark";
type ThemeState = [Theme, Dispatch<SetStateAction<Theme>>];

export default function useDarkTheme(): ThemeState {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("data-theme") as Theme) || "light"
  );
  const colorTheme: Theme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
