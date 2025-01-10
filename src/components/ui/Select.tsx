// src/components/ui/Button.tsx
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
  ariaLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "default",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      children,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default:
        "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      secondary:
        "bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
      outline:
        "border-2 border-muted-foreground text-foreground hover:border-secondary hover:text-secondary",
      ghost: "text-foreground hover:bg-muted hover:text-foreground",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    // Determine if we need to add aria-label
    const needsAriaLabel = icon && !children;
    const buttonAriaLabel =
      ariaLabel || (needsAriaLabel ? "Button action" : undefined);

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        aria-label={buttonAriaLabel}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="mr-2" aria-hidden="true">
                {icon}
              </span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="ml-2" aria-hidden="true">
                {icon}
              </span>
            )}
            {needsAriaLabel && (
              <span className="sr-only">{buttonAriaLabel}</span>
            )}
          </>
        )}
        <span className="absolute inset-0 rounded-lg overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-secondary/40 to-secondary/60 opacity-0 hover:opacity-10 transition-opacity duration-300" />
        </span>
      </motion.button>
    );
  },
);

Button.displayName = "Button";
