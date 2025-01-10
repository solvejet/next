import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type InputType = "text" | "email" | "password" | "number" | "tel" | "url";

interface InputProps extends Omit<HTMLMotionProps<"input">, "children"> {
  label: string;
  error?: string;
  type?: InputType;
  helperText?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
  validation?: {
    pattern?: RegExp;
    message?: string;
  };
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      type = "text",
      helperText,
      required = false,
      pattern,
      maxLength,
      minLength,
      validation,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const [validationError, setValidationError] = React.useState<string>();
    const id = React.useId();

    const validateInput = (value: string) => {
      if (validation?.pattern && !validation.pattern.test(value)) {
        setValidationError(validation.message || "Invalid input");
        return false;
      }
      setValidationError(undefined);
      return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (validation) {
        validateInput(e.target.value);
      }
      props.onChange?.(e);
    };

    React.useEffect(() => {
      setHasValue(Boolean(props.value));
    }, [props.value]);

    const displayError = error || validationError;

    return (
      <div className="relative">
        <motion.input
          ref={ref}
          id={id}
          type={type}
          required={required}
          pattern={pattern}
          maxLength={maxLength}
          minLength={minLength}
          aria-describedby={`${id}-helper ${id}-error`}
          aria-invalid={!!displayError}
          className={cn(
            "peer w-full h-12 px-4 pt-2 bg-transparent border-2 rounded-lg",
            "transition-all duration-200",
            "focus:outline-none focus:border-secondary",
            "placeholder:text-transparent",
            displayError
              ? "border-red-500 focus:border-red-500"
              : "border-muted-foreground",
            className
          )}
          placeholder={label}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(Boolean(e.target.value));
            if (validation) {
              validateInput(e.target.value);
            }
          }}
          onChange={handleChange}
          initial={{ scale: 1 }}
          whileFocus={{ scale: 1.002 }}
          {...props}
        />
        <motion.label
          htmlFor={id}
          className={cn(
            "absolute left-4 pointer-events-none transition-all duration-200",
            "peer-focus:text-xs peer-focus:top-1 peer-focus:text-secondary",
            hasValue ? "text-xs top-1" : "text-base top-3",
            displayError ? "text-red-500" : "text-muted-foreground"
          )}
          initial={{ y: 0 }}
          animate={{
            y: hasValue || isFocused ? -8 : 0,
            scale: hasValue || isFocused ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
        {helperText && (
          <p id={`${id}-helper`} className="mt-1 text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
        {displayError && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
