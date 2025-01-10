// src/components/pages/Home/HeroSection/index.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

// Dynamically import Scene with no SSR
const Scene = dynamic(() => import("./WaveScene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background/30" />,
});

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-96px)]">
      {/* Background Wave Animation */}
      <Scene />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center mt-[-96px]"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            ISO Certified
            <span className="mx-2">•</span>
            Software Development Company
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="text-gradient">Explore together</span>
            <br />
            <span className="text-foreground">build together</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          We are a software development company creating sustainable business
          value through digital innovation
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className="min-w-[200px] text-base group"
            onClick={() => (window.location.href = "/contact")}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[200px] text-base"
            onClick={() => (window.location.href = "/portfolio")}
          >
            View Portfolio
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
