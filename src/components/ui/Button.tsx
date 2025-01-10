// src/components/ui/Button.tsx
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "destructive"
    | "success";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: React.ReactNode;
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
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    // Base styles that apply to all buttons
    const baseStyles = cn(
      "relative inline-flex items-center justify-center rounded-lg font-medium",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      "transition-all duration-300 ease-in-out",
      fullWidth && "w-full"
    );

    // Variant styles with improved hover effects
    const variants = {
      default: cn(
        "bg-secondary text-secondary-foreground",
        "dark:bg-white dark:text-black",
        "hover:bg-secondary-700 dark:hover:bg-white/90",
        "focus-visible:ring-secondary dark:focus-visible:ring-white",
        "relative overflow-hidden z-0",
        "before:absolute before:inset-0 before:z-[-1]",
        "before:bg-secondary-700 dark:before:bg-white/90",
        "before:translate-y-full hover:before:translate-y-0",
        "before:transition-transform before:duration-300"
      ),
      secondary: cn(
        "bg-secondary text-secondary-foreground",
        "dark:bg-primary dark:text-white",
        "hover:bg-secondary-700 dark:hover:bg-primary-600",
        "focus-visible:ring-secondary dark:focus-visible:ring-primary",
        "relative overflow-hidden z-0",
        "before:absolute before:inset-0 before:z-[-1]",
        "before:bg-secondary-700 dark:before:bg-primary-600",
        "before:translate-y-full hover:before:translate-y-0",
        "before:transition-transform before:duration-300"
      ),
      outline: cn(
        "border-2 border-secondary bg-transparent text-secondary",
        "dark:border-white dark:text-white",
        "hover:bg-secondary hover:text-secondary-foreground",
        "dark:hover:bg-white dark:hover:text-black",
        "focus-visible:ring-secondary dark:focus-visible:ring-white",
        "relative overflow-hidden z-0",
        "before:absolute before:inset-0 before:z-[-1]",
        "before:bg-secondary dark:before:bg-white",
        "before:scale-x-0 hover:before:scale-x-100",
        "before:origin-left",
        "before:transition-transform before:duration-300",
        "transition-colors duration-300"
      ),
      ghost: cn(
        "bg-transparent text-secondary",
        "dark:text-white",
        "hover:bg-secondary/10",
        "dark:hover:bg-white/10",
        "focus-visible:ring-secondary",
        "dark:focus-visible:ring-white",
        "transition-colors"
      ),
      destructive: cn(
        "bg-destructive text-destructive-foreground",
        "hover:bg-destructive/90",
        "focus-visible:ring-destructive",
        "relative overflow-hidden z-0",
        "before:absolute before:inset-0 before:z-[-1]",
        "before:bg-destructive-600",
        "before:translate-y-full hover:before:translate-y-0",
        "before:transition-transform before:duration-300"
      ),
      success: cn(
        "bg-success-500 text-white",
        "hover:bg-success-600",
        "focus-visible:ring-success-500",
        "relative overflow-hidden z-0",
        "before:absolute before:inset-0 before:z-[-1]",
        "before:bg-success-600",
        "before:translate-y-full hover:before:translate-y-0",
        "before:transition-transform before:duration-300"
      ),
    };

    // Size styles
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    // Loading state styles
    const loadingStyles = cn(
      "relative cursor-wait",
      "before:absolute before:inset-0",
      "before:bg-inherit before:rounded-lg",
      "before:animate-pulse"
    );

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && loadingStyles,
          className
        )}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        initial={false}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {/* Content Container */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {children && <span>Loading...</span>}
            </>
          ) : (
            <>
              {icon && iconPosition === "left" && (
                <span className="inline-flex shrink-0">{icon}</span>
              )}
              {children}
              {icon && iconPosition === "right" && (
                <span className="inline-flex shrink-0">{icon}</span>
              )}
            </>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
