'use client';

import { MoonIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';

export default function ToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="flex items-center gap-2 focus-visible:outline-1 outline-offset-4"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
      <span>
        <MoonIcon className="stroke-2 dark:stroke-white dark:fill-white w-4" />
      </span>
      <span className="font-light text-grey-950 dark:text-white">
        Dark Mode
      </span>
    </button>
  )
}