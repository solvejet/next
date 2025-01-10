// src/components/UnderConstruction.tsx
"use client";

import { motion } from "framer-motion";
import { Construction, Timer, Mail } from "lucide-react";
import { Button } from "./ui/Button";

export function UnderConstruction() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Construction size={64} className="mx-auto text-primary" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-foreground">
            Under Construction
          </h1>

          <p className="text-lg text-muted-foreground">
            We&apos;re currently working on something awesome. Our website will
            be ready soon!
          </p>

          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <Timer className="w-5 h-5" />
            <span>Coming Soon</span>
          </div>

          <div className="pt-8">
            <Button
              onClick={() =>
                (window.location.href = "mailto:hello@solvejet.net")
              }
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
