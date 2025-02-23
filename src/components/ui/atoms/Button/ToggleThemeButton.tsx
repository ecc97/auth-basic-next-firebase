"use client";

import { useTheme } from "@/context/ThemeContext";
import Button from "./Button";
import { Sun, Moon } from "lucide-react";
import '@/assets/sass/toggleTheme.scss'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button type="button" onClick={toggleTheme} className="toggleBtn" aria-label="Toggle theme">
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </Button>
  );
}
