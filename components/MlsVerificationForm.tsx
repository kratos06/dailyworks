"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { Select } from "./ui/Select";
import { Input } from "./ui/Input";

export default function MlsVerificationForm() {
  const [selectedMls, setSelectedMls] = useState("");
  const [agentId, setAgentId] = useState("");
  const [verificationType, setVerificationType] = useState<"phone" | "email">(
    "phone",
  );
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const mlsOptions = [
    { value: "crmls", label: "California Regional MLS (CRMLS)" },
    { value: "bmls", label: "Bright MLS (BMLS)" },
    { value: "canopy", label: "Canopy MLS" },
    { value: "rein", label: "Real Estate Information Network (REIN)" },
    { value: "armls", label: "Arizona Regional MLS (ARMLS)" },
    {
      value: "ntreis",
      label:
        "North Texas Real Estate Info Systems (NTREIS) -MetroTex and Collin County (CCAR)",
    },
  ];

  const agentOptions = [
    {
      value: "email-verification",
      label: "Email verification",
      sublabel: "Send verification code to m***a@g***.***",
    },
    {
      value: "chris-trapani",
      label: "Chris Trapani (50846**) - ch***@seren....",
      sublabel: "Send verification code to m***a@g***.***",
    },
    {
      value: "brian-evans-1",
      label: "Brian Evans",
      sublabel: "Send verification code to m***a@g***.***",
    },
    {
      value: "brian-evans-2",
      label: "Brian Evans",
      sublabel: "Send verification code to m***a@g***.***",
    },
    {
      value: "albert-flores",
      label: "Albert Flores",
      sublabel: "Send verification code to m***a@g***.***",
    },
  ];

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 4) {
        const nextInput = document.querySelector(
          `input[data-index="${index + 1}"]`,
        ) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleSendVerification = () => {
    setShowVerificationCode(true);
  };

  const handleNext = () => {
    if (isFormValid) {
      window.location.href = "/ads-preview";
    }
  };

  const isFormValid =
    selectedMls &&
    agentId &&
    (showVerificationCode ? verificationCode.every((code) => code) : true);

  return (
    <div className="mls-verification-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-time">8:29</div>
        <div className="status-icons">
          <div className="signal-bars"></div>
          <div className="wifi-icon"></div>
          <div className="battery-icon"></div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <button className="back-button" aria-label="Go back">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path
              d="M9 1L1 9.09909L9 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="header-title">Start Your Lofty Blast</h1>
      </header>

      {/* Progress Indicator */}
      <div className="progress-indicator">
        <div className="progress-bar"></div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <h2 className="page-title">Step 1: Verify your MLS</h2>

          {/* Note Section */}
          <div className="note-section">
            <div className="note-header">Note:</div>
            <p className="note-text">
              To proceed with purchasing a Zip Code Blast or Listing Blast, we
              require verification of your MLS credentials. Submitting your
              active listing details allows us to launch your ads and confirm
              your identity as the authorized Listing Agent. This step ensures
              compliance with advertising guidelines and protects the integrity
              of your listings.
            </p>
          </div>

          {/* Form Fields */}
          <div className="form-section">
            {/* MLS Selection */}
            <div className="field-group">
              <label className="field-label">
                Select your MLS <span className="required">*</span>
              </label>
              <Select
                value={selectedMls}
                onChange={setSelectedMls}
                placeholder="Select your MLS"
                options={mlsOptions}
              />
            </div>

            {/* Agent ID Selection */}
            {selectedMls && (
              <div className="field-group">
                <label className="field-label">
                  Enter Your Agent ID for{" "}
                  {mlsOptions
                    .find((opt) => opt.value === selectedMls)
                    ?.label.split("(")[1]
                    ?.replace(")", "") || "CRMLS"}{" "}
                  <span className="required">*</span>
                </label>
                <p className="field-description">
                  Add your MLS Agent ID to proceed the verification and produce
                  matching listing data for your IDX website and CRM.
                </p>
                <Select
                  value={agentId}
                  onChange={setAgentId}
                  placeholder="Enter MLS Subscriber Name, Email or Ag..."
                  options={agentOptions}
                  isSearchable
                />
              </div>
            )}

            {/* Verification Code Section */}
            {agentId && (
              <div className="verification-section">
                <div className="field-group">
                  <label className="field-label">Verification Code</label>
                  <p className="field-description">
                    Click send verification to send a verification code to your
                    phone.
                  </p>

                  {/* Phone/Email Tabs */}
                  <div className="verification-tabs">
                    <button
                      className={`tab ${verificationType === "phone" ? "tab-active" : ""}`}
                      onClick={() => setVerificationType("phone")}
                    >
                      Phone
                    </button>
                    <button
                      className={`tab ${verificationType === "email" ? "tab-active" : ""}`}
                      onClick={() => setVerificationType("email")}
                    >
                      Email
                    </button>
                  </div>

                  {/* Verification Code Inputs */}
                  {showVerificationCode && (
                    <div className="code-inputs">
                      {verificationCode.map((code, index) => (
                        <input
                          key={index}
                          data-index={index}
                          type="text"
                          maxLength={1}
                          value={code}
                          onChange={(e) =>
                            handleCodeChange(index, e.target.value)
                          }
                          className="code-input"
                          aria-label={`Verification code digit ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Send Verification Button */}
                  <button
                    className="send-verification-btn"
                    onClick={handleSendVerification}
                  >
                    Send Verification Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="bottom-section">
        <Button
          disabled={!isFormValid}
          className="next-button"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
