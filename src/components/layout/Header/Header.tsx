// src/components/layout/Header/Header.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { menuItems } from "@/config/navigation";
import { MegaMenu } from "./MegaMenu";
import {
  WhatWeDoMenu,
  TechnologiesMenu,
  IndustriesMenu,
  CompanyMenu,
} from "./MegaMenus";

const mobileMenuVariants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2, delay: 0.1 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2 },
    },
  },
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(
    null
  );

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeAll = useCallback(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
    setActiveMobileSection(null);
  }, []);

  const renderMenuContent = (menuItem: (typeof menuItems)[0]) => {
    switch (menuItem.title) {
      case "What We Do":
        return <WhatWeDoMenu item={menuItem} closeAll={closeAll} />;
      case "Technologies":
        return <TechnologiesMenu item={menuItem} closeAll={closeAll} />;
      case "Industries":
        return <IndustriesMenu item={menuItem} closeAll={closeAll} />;
      case "Company":
        return <CompanyMenu item={menuItem} closeAll={closeAll} />;
      default:
        return null;
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-background"
      )}
    >
      <nav className="container mx-auto">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex-shrink-0 transition-opacity hover:opacity-90"
            onClick={closeAll}
          >
            <Logo className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <MegaMenu
                key={item.title}
                item={item}
                isActive={activeMenu === item.title}
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                {renderMenuContent(item)}
              </MegaMenu>
            ))}

            <Button
              variant="outline"
              className="ml-4"
              onClick={() => (window.location.href = "/contact")}
            >
              Get in touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = "/contact")}
            >
              Contact
            </Button>
            <button
              className="p-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="lg:hidden border-t border-border/50 overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {menuItems.map((item) => (
                  <div key={item.title} className="space-y-3">
                    <button
                      className="flex w-full items-center justify-between text-foreground p-2 hover:bg-muted/50 rounded-lg transition-colors"
                      onClick={() =>
                        setActiveMobileSection(
                          activeMobileSection === item.title ? null : item.title
                        )
                      }
                    >
                      <span className="font-medium">{item.title}</span>
                      <motion.div
                        animate={{
                          rotate: activeMobileSection === item.title ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeMobileSection === item.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-4 pl-4"
                        >
                          {renderMenuContent(item)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
