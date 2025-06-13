"use client";

import { useState, useRef, useEffect } from "react";

interface SelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options: SelectOption[];
  isSearchable?: boolean;
  disabled?: boolean;
}

export function Select({
  value,
  onChange,
  placeholder = "Select an option",
  options,
  isSearchable = false,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="select-container" ref={selectRef}>
      <div
        className={`select-trigger ${disabled ? "select-disabled" : ""} ${isOpen ? "select-open" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="select-value">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`select-arrow ${isOpen ? "select-arrow-up" : ""}`}
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
        >
          <path
            d="M6 6.25492L0.858559 1.14367C0.788715 1.07341 0.749512 0.978363 0.749512 0.879294C0.749512 0.780224 0.788715 0.68518 0.858559 0.614919C0.89342 0.57977 0.934896 0.551872 0.980593 0.532834C1.02629 0.513796 1.0753 0.503994 1.12481 0.503994C1.17431 0.503994 1.22333 0.513796 1.26903 0.532834C1.31472 0.551872 1.3562 0.57977 1.39106 0.614919L6 5.19742L10.6086 0.611169C10.6434 0.57602 10.6849 0.548123 10.7306 0.529084C10.7763 0.510046 10.8253 0.500244 10.8748 0.500244C10.9243 0.500244 10.9733 0.510046 11.019 0.529084C11.0647 0.548123 11.1062 0.57602 11.1411 0.611169C11.2109 0.681429 11.2501 0.776474 11.2501 0.875543C11.2501 0.974613 11.2109 1.06966 11.1411 1.13992L6 6.25492Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {isSearchable && (
            <div className="select-search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="select-search-input"
                autoFocus
              />
            </div>
          )}

          <div className="select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`select-option ${value === option.value ? "select-option-selected" : ""}`}
                  onClick={() => handleSelect(option.value)}
                >
                  <div className="select-option-content">
                    <div className="select-option-label">{option.label}</div>
                    {option.sublabel && (
                      <div className="select-option-sublabel">
                        {option.sublabel}
                      </div>
                    )}
                  </div>
                  {value === option.value && (
                    <div className="select-radio">
                      <div className="select-radio-checked"></div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="select-no-options">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
