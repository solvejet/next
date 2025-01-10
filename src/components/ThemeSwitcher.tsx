// src/components/ThemeSwitcher.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const ANIMATION_DURATION = 1000;

interface ThemeSwitcherProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: {
    button: "p-2",
    icon: "h-4 w-4",
  },
  md: {
    button: "p-3",
    icon: "h-5 w-5",
  },
  lg: {
    button: "p-4",
    icon: "h-6 w-6",
  },
};

export function ThemeSwitcher({ className, size = "md" }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const style = document.createElement("style");
    style.setAttribute("id", "theme-switcher-styles");
    
    const updateStyles = () => {
      const isDark = resolvedTheme === "dark";
      style.textContent = `
        .theme-transitioning * {
          transition: none !important;
        }

        .theme-transitioning::before {
          content: '';
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background: ${isDark ? "hsl(var(--background))" : "hsl(var(--background))"};
          clip-path: circle(0% at ${mousePosition.x}% ${mousePosition.y}%);
          animation: wave-expand ${ANIMATION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes wave-expand {
          from {
            clip-path: circle(0% at ${mousePosition.x}% ${mousePosition.y}%);
          }
          to {
            clip-path: circle(150% at ${mousePosition.x}% ${mousePosition.y}%);
          }
        }

        .theme-transitioning [data-theme-toggle] {
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .theme-transitioning::before {
            display: none;
          }
          .theme-transitioning * {
            transition: none !important;
          }
        }
      `;
    };

    document.head.appendChild(style);
    updateStyles();

    return () => {
      style.remove();
    };
  }, [mounted, resolvedTheme, mousePosition]);

  if (!mounted) {
    return (
      <div
        className={cn(
          "fixed bottom-6 right-6 rounded-full bg-background",
          sizes[size].button,
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent) => {
    if (isAnimating) return;

    const rect = document.documentElement.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });

    setIsAnimating(true);
    const newTheme = isDark ? "light" : "dark";

    // Start the wave animation
    document.documentElement.classList.add("theme-transitioning");

    // Change the theme halfway through the animation
    setTimeout(() => {
      setTheme(newTheme);
    }, ANIMATION_DURATION / 2);

    // Cleanup after animation
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  };

  return (
    <motion.button
      className={cn(
        "fixed bottom-6 right-6 rounded-full shadow-lg z-[100]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        "focus:ring-offset-2 transition-shadow hover:shadow-xl",
        "bg-background border border-border",
        sizes[size].button,
        className
      )}
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      disabled={isAnimating}
      data-theme-toggle
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="text-foreground"
        >
          {isDark ? (
            <Sun className={sizes[size].icon} />
          ) : (
            <Moon className={sizes[size].icon} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

export default ThemeSwitcher;