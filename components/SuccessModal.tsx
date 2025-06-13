"use client";

import { Button } from "./ui/Button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  email,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-container">
        {/* Celebration Icon */}
        <div className="success-icon">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <g>
              {/* Party hat/cone shape */}
              <path d="M25 45L35 20L45 45Z" fill="#FF6B35" />
              <path d="M25 45L35 20L45 45Z" fill="url(#gradient1)" />

              {/* Confetti pieces */}
              <circle cx="50" cy="25" r="2" fill="#3B5CDE" />
              <circle cx="20" cy="30" r="1.5" fill="#FFB800" />
              <circle cx="55" cy="40" r="1" fill="#4CAF50" />
              <circle cx="15" cy="45" r="1.5" fill="#FF6B35" />

              {/* Streamers */}
              <path d="M40 15L45 10L50 15L45 20Z" fill="#3B5CDE" />
              <path d="M50 30L55 25L60 30L55 35Z" fill="#FFB800" />
              <path d="M25 35L30 30L35 35L30 40Z" fill="#4CAF50" />

              {/* Stars */}
              <path
                d="M52 18L53 20L55 19L54 21L56 22L54 23L55 25L53 24L52 26L51 24L49 25L50 23L48 22L50 21L49 19L51 20Z"
                fill="#FFB800"
              />
              <path
                d="M18 38L19 40L21 39L20 41L22 42L20 43L21 45L19 44L18 46L17 44L15 45L16 43L14 42L16 41L15 39L17 40Z"
                fill="#3B5CDE"
              />
            </g>
            <defs>
              <linearGradient
                id="gradient1"
                x1="25"
                y1="20"
                x2="45"
                y2="45"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#FFB800" />
                <stop offset="50%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF6B35" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Success Content */}
        <div className="success-content">
          <h2 className="success-title">
            Congratulations!
            <br />
            You have finished setting up your ad!
          </h2>

          <p className="success-description">
            Every time you get a new lead, we will send a notification email to{" "}
            {email}
          </p>

          <div className="success-divider"></div>

          <div className="account-details">
            <p className="account-instructions">
              Click the button below to check your ad performance by logging
              into your account with
            </p>
            <p className="account-info">
              <span className="account-label">Account: </span>
              <span className="account-email">{email}</span>
            </p>
            <p className="account-info">
              <span className="account-label">Password: </span>
              <span className="account-password">123456</span>
            </p>
          </div>

          <p className="support-text">
            If you have any questions, feel free to contact
            loftyblast@support.com
          </p>

          <p className="web-notice">
            <span className="asterisk">*</span> Please view it on the web
          </p>
        </div>

        {/* Got it Button */}
        <div className="success-footer">
          <Button
            variant="primary"
            onClick={onClose}
            className="success-button"
          >
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
