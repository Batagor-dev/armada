"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  hasError?: boolean;
};

/**
 * DateInput
 * A styled date picker input consistent with the project design tokens.
 * Always renders type="date" and handles the native calendar icon styling.
 */
const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ hasError = false, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="date"
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
          // Native calendar icon colour match (webkit)
          "[color-scheme:light] dark:[color-scheme:dark]",
          // Touch target
          "touch-action-manipulation",
          // Cursor
          "cursor-pointer",
          className,
        ].join(" ")}
        {...props}
      />
    );
  }
);

DateInput.displayName = "DateInput";
export default DateInput;
