import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="input-container">
        {label && (
          <label className="input-label">
            {label}
            {props.required && <span className="required">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={`input ${error ? "input-error" : ""} ${className}`}
          {...props}
        />

        {error && <div className="input-error-text">{error}</div>}
        {helperText && !error && (
          <div className="input-helper-text">{helperText}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
