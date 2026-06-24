"use client";

import { ReactNode, useId } from "react";

type FormFieldProps = {
  /** The visible label text */
  label: string;
  /** Whether the field is required (shows asterisk) */
  required?: boolean;
  /** Optional helper text shown below the input */
  helperText?: string;
  /** Validation error message shown below the input */
  error?: string;
  /** Icon name from Material Symbols Outlined */
  icon?: string;
  /** The input element (Input, DateInput, Select, etc.) */
  children: (id: string) => ReactNode;
};

/**
 * FormField
 * Wraps any form control with a visible label, optional icon,
 * helper text, and an accessible inline error message.
 *
 * Usage:
 * <FormField label="Nama Lengkap" required icon="person" error={errors.name}>
 *   {(id) => <Input id={id} {...register("name")} hasError={!!errors.name} />}
 * </FormField>
 */
export default function FormField({
  label,
  required = false,
  helperText,
  error,
  icon,
  children,
}: FormFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {icon && (
          <span
            className="material-symbols-outlined text-[18px] text-[#1E3A5F] dark:text-[#B48F5A]"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {label}
        {required && (
          <span className="text-red-500 leading-none" aria-label="wajib diisi">
            *
          </span>
        )}
      </label>

      {/* Control slot */}
      <div
        className="relative"
        aria-describedby={
          [helperText ? helperId : "", error ? errorId : ""]
            .filter(Boolean)
            .join(" ") || undefined
        }
      >
        {children(id)}
      </div>

      {/* Helper text */}
      {helperText && !error && (
        <p
          id={helperId}
          className="text-xs text-slate-500 dark:text-slate-400 pl-0.5"
        >
          {helperText}
        </p>
      )}

      {/* Inline error — aria-live so screen readers announce it */}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="flex items-center gap-1 text-xs text-red-500 font-medium pl-0.5"
        >
          <span
            className="material-symbols-outlined text-[14px]"
            aria-hidden="true"
          >
            error
          </span>
          {error}
        </p>
      )}
    </div>
  );
}
