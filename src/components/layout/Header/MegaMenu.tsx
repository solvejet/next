// src/components/layout/Header/MegaMenu.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/navigation.types";

const curtainVariants = {
  initial: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  animate: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const contentVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

interface MegaMenuProps {
  item: MenuItem;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  children: React.ReactNode;
}

export function MegaMenu({
  item,
  isActive,
  onMouseEnter,
  onMouseLeave,
  children,
}: MegaMenuProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="navigation"
      aria-label={`${item.title} menu`}
    >
      <button
        className={cn(
          "relative px-1 py-2 text-base font-medium transition-colors duration-200",
          "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
          "after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
          "hover:text-foreground hover:after:scale-x-100",
          isActive ? "text-foreground after:scale-x-100" : "text-foreground/70"
        )}
        aria-expanded={isActive}
        aria-controls={`${item.title}-menu`}
      >
        {item.title}
      </button>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            id={`${item.title}-menu`}
            className="fixed left-0 right-0 top-20 z-50"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              variants={curtainVariants}
              className="absolute inset-0 bg-background/55 backdrop-blur-md shadow-[0_4px_12px_-6px_rgba(0,0,0,0.2)] dark:shadow-[0_4px_12px_-6px_rgba(0,0,0,0.5)]"
            />
            <motion.div
              variants={contentVariants}
              className="relative container mx-auto py-6"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
