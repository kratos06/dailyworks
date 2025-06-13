"use client";

import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  onSave: (personalInfo: PersonalInfo) => void;
}

export default function PersonalInfoModal({
  isOpen,
  onClose,
  personalInfo,
  onSave,
}: PersonalInfoModalProps) {
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="personal-info-modal-overlay">
      <div className="personal-info-modal-container">
        {/* Header */}
        <div className="personal-info-modal-header">
          <button className="modal-back-button" onClick={onClose}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path
                d="M6.8909 12C6.84155 12.0003 6.79262 11.9908 6.74693 11.9722C6.70124 11.9535 6.65969 11.926 6.62465 11.8912L0.733398 6.00015L6.62465 0.109044C6.69491 0.0392022 6.78995 0 6.88902 0C6.98809 0 7.08314 0.0392022 7.1534 0.109044C7.18855 0.143905 7.21644 0.185379 7.23548 0.231075C7.25452 0.276771 7.26432 0.325785 7.26432 0.375288C7.26432 0.424791 7.25452 0.473804 7.23548 0.5195C7.21644 0.565196 7.18855 0.606671 7.1534 0.641531L1.79465 6.00015L7.1534 11.3588C7.20606 11.411 7.24205 11.4777 7.25682 11.5503C7.27158 11.623 7.26447 11.6984 7.23637 11.7671C7.20828 11.8357 7.16046 11.8945 7.09896 11.9359C7.03747 11.9774 6.96506 11.9997 6.8909 12V12Z"
                fill="black"
              />
            </svg>
          </button>
          <h2 className="modal-title">Personal Info</h2>
        </div>

        {/* Form Content */}
        <div className="personal-info-modal-content">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="personal-info-input"
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Name</label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="personal-info-input"
              placeholder="Enter your last name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="personal-info-input"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="personal-info-modal-footer">
          <Button
            variant="primary"
            onClick={handleSave}
            className="personal-info-save-button"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
