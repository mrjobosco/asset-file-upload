import React, { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...props }, ref) => (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        {...props}
        className={`px-3 py-2 border rounded w-full box-border focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"
          } ${className}`}
      />
      {error && (
        <span className={`text-red-500 text-xs mt-1 block `}>{error}</span>
      )}
    </div>
  )
);

Input.displayName = "Input";

