"use client";

interface RadioOption {
  value: string;
  label: string;
  sublabel?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
}

export default function RadioGroup({
  name,
  value,
  onChange,
  options,
  className = "",
}: RadioGroupProps) {
  return (
    <div className={`radio-group ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`radio-option ${option.disabled ? "disabled" : ""} ${value === option.value ? "selected" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={option.disabled}
            className="radio-input"
          />
          <div className="radio-circle">
            <div className="radio-inner"></div>
          </div>
          <div className="radio-content">
            <div className="radio-label">{option.label}</div>
            {option.sublabel && (
              <div className="radio-sublabel">{option.sublabel}</div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
