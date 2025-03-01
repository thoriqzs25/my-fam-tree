"use client";

import { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="relative cursor-pointer">
      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-500 text-white rounded cursor-pointer z-10"
      >
        {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default Theme;
