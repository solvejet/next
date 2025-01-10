// src/components/NotFoundTemplate.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundTemplate() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.07]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
        {/* Glitch Effect 404 */}
        <div className="mb-8">
          <div className="relative inline-block">
            <motion.h1
              className="text-8xl md:text-9xl font-bold text-primary relative z-10"
              animate={{
                textShadow: [
                  "2px 2px 0px var(--secondary-color)",
                  "-2px -2px 0px var(--secondary-color)",
                  "2px 2px 0px var(--secondary-color)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              404
            </motion.h1>
            <motion.div
              className="absolute inset-0 text-secondary opacity-60"
              animate={{
                x: [-2, 2, -2],
                y: [1, -1, 1],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <span className="text-8xl md:text-9xl font-bold">404</span>
            </motion.div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            Page Not Found
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            The page you re looking for doesnt exist or has been moved. Let s
            get you back on track.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="min-w-[180px] group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            variant="default"
            size="lg"
            className="min-w-[180px] group"
          >
            <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            Homepage
          </Button>
        </motion.div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
