// src/app/error.tsx
"use client";

import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          An unexpected error has occurred. Please try again later.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={reset}
            variant="default"
            icon={<RefreshCcw className="w-4 h-4" />}
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
