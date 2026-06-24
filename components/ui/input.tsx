"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[
          // Base
          "w-full h-12 px-4 rounded-xl text-sm font-medium outline-none",
          // Border
          "border transition-all duration-200",
          hasError
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/40"
            : "border-slate-200 dark:border-slate-700 focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/15 dark:focus:border-[#B48F5A] dark:focus:ring-[#B48F5A]/15",
          // Background & text
          "bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
          // Placeholder
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          // Touch target
          "touch-action-manipulation",
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
