"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Select } from "./ui/Select";
import { Input } from "./ui/Input";
import { mlsApi } from "@/lib/api";
import { useApi, useAsyncAction } from "@/hooks/useApi";

export default function MlsVerificationFormWithAPI() {
  const [selectedMls, setSelectedMls] = useState("");
  const [agentId, setAgentId] = useState("");
  const [verificationType, setVerificationType] = useState<"phone" | "email">("phone");
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", ""]);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [verifiedAgent, setVerifiedAgent] = useState<any>(null);

  // Fetch MLS providers from API
  const { data: mlsProviders, loading: mlsLoading, error: mlsError } = useApi(
    mlsApi.getProviders
  );

  // API actions
  const { execute: verifyAgent, loading: verifyingAgent, error: verifyError } = 
    useAsyncAction(mlsApi.verifyAgent);
  
  const { execute: sendCode, loading: sendingCode, error: sendError } = 
    useAsyncAction(mlsApi.sendVerificationCode);
  
  const { execute: verifyCode, loading: verifyingCode, error: codeError } = 
    useAsyncAction(mlsApi.verifyCode);

  // Convert API data to select options
  const mlsOptions = mlsProviders?.map(provider => ({
    value: provider.id,
    label: provider.name
  })) || [];

  // Mock agent options - in real app, this would come from API search
  const agentOptions = [
    {
      value: "email-verification",
      label: "Email verification",
      sublabel: "Send verification code to m***a@g***.***",
    },
    {
      value: "agent_001",
      label: "Chris Trapani (50846**) - ch***@seren....",
      sublabel: "Send verification code to m***a@g***.***",
    },
    {
      value: "agent_002",
      label: "Brian Evans",
      sublabel: "Send verification code to m***a@g***.***",
    },
    {
      value: "agent_003",
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

  const handleSendVerification = async () => {
    if (!agentId) return;
    
    const result = await sendCode(agentId, verificationType);
    if (result?.success) {
      setShowVerificationCode(true);
      // In development, show the code in console
      if (result.code) {
        console.log("Verification code:", result.code);
      }
    }
  };

  const handleVerifyCode = async () => {
    const code = verificationCode.join("");
    if (code.length !== 5) return;

    const result = await verifyCode(agentId, code);
    if (result?.success) {
      // Code verified successfully
      console.log("Code verified successfully");
    }
  };

  const handleNext = async () => {
    if (isFormValid) {
      // If agent verification is required and not done yet
      if (selectedMls && agentId && !verifiedAgent) {
        const result = await verifyAgent(selectedMls, agentId);
        if (result?.success) {
          setVerifiedAgent(result.agent);
        }
      }
      
      // Navigate to next step
      window.location.href = "/ads-preview";
    }
  };

  // Auto-verify code when all digits are entered
  useEffect(() => {
    const code = verificationCode.join("");
    if (code.length === 5 && showVerificationCode) {
      handleVerifyCode();
    }
  }, [verificationCode]);

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

          {/* Error Messages */}
          {(mlsError || verifyError || sendError || codeError) && (
            <div className="error-banner">
              {mlsError || verifyError || sendError || codeError}
            </div>
          )}

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
              {mlsLoading ? (
                <div className="loading-spinner">Loading MLS providers...</div>
              ) : (
                <Select
                  value={selectedMls}
                  onChange={setSelectedMls}
                  placeholder="Select your MLS"
                  options={mlsOptions}
                />
              )}
            </div>

            {/* Agent ID Selection */}
            {selectedMls && (
              <div className="field-group">
                <label className="field-label">
                  Enter Your Agent ID for{" "}
                  {mlsProviders
                    ?.find((opt) => opt.id === selectedMls)
                    ?.code || "MLS"}{" "}
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
                {verifyingAgent && (
                  <div className="loading-text">Verifying agent...</div>
                )}
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
                    disabled={sendingCode}
                  >
                    {sendingCode ? "Sending..." : "Send Verification Code"}
                  </button>
                  
                  {verifyingCode && (
                    <div className="loading-text">Verifying code...</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="bottom-section">
        <Button
          disabled={!isFormValid || verifyingAgent}
          className="next-button"
          onClick={handleNext}
        >
          {verifyingAgent ? "Verifying..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
