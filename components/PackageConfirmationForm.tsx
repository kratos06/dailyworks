"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import Modal from "./ui/Modal";
import ListingSelectionModal from "./ListingSelectionModal";

interface Listing {
  id: string;
  price: string;
  address: string;
  beds: string;
  baths: string;
  sqft: string;
  image: string;
  provider: string;
}

interface FormData {
  selectedPackage: "zipcode" | "listing";
  zipCode: string;
  selectedListing: Listing | null;
  campaignDuration: string;
  paymentMode: string;
}

interface FormErrors {
  zipCode?: string;
  selectedListing?: string;
}

const campaignOptions = [
  { value: "4weeks", label: "4 Weeks", views: "1000", progress: 100 },
  { value: "3weeks", label: "3 Weeks", views: "240", progress: 75 },
  { value: "2weeks", label: "2 Weeks", views: "33", progress: 60 },
  { value: "1weeks", label: "1 Week", views: "4", progress: 40 },
];

const paymentOptions = [
  { value: "onetime", label: "One-time Charge" },
  { value: "recurring", label: "Recurring Charge" },
];

export default function PackageConfirmationForm() {
  const router = useRouter();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [tempPaymentMode, setTempPaymentMode] = useState("onetime");

  const [formData, setFormData] = useState<FormData>({
    selectedPackage: "zipcode",
    zipCode: "53202",
    selectedListing: null,
    campaignDuration: "4weeks",
    paymentMode: "One-time Charge",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (formData.selectedPackage === "zipcode" && !formData.zipCode.trim()) {
      newErrors.zipCode = "Please enter the code";
    }

    if (formData.selectedPackage === "listing" && !formData.selectedListing) {
      newErrors.selectedListing = "Please confirm your listing";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      router.push("/checkout");
    }
  };

  const handleBack = () => {
    router.push("/ads-preview");
  };

  const handlePaymentModeClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentConfirm = () => {
    setFormData((prev) => ({
      ...prev,
      paymentMode:
        tempPaymentMode === "onetime" ? "One-time Charge" : "Recurring Charge",
    }));
    setIsPaymentModalOpen(false);
  };

  const selectListingManually = () => {
    setIsListingModalOpen(true);
  };

  const handleListingSelect = (listing: Listing) => {
    setFormData((prev) => ({ ...prev, selectedListing: listing }));
    setIsListingModalOpen(false);
    setErrors((prev) => ({ ...prev, selectedListing: undefined }));
  };

  const isFormValid = () => {
    if (formData.selectedPackage === "zipcode") {
      return formData.zipCode.trim() !== "";
    }
    if (formData.selectedPackage === "listing") {
      return formData.selectedListing !== null;
    }
    return false;
  };

  return (
    <div className="package-confirmation">
      {/* Header */}
      <div className="package-header">
        <div className="status-bar">
          <div className="time">8:29</div>
          <div className="status-icons">
            <div className="signal-icon"></div>
            <div className="wifi-icon"></div>
            <div className="battery-icon"></div>
          </div>
        </div>

        <div className="nav-header">
          <button className="back-button" onClick={handleBack}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path
                d="M9 1L1 9.09909L9 17"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="nav-title">Start Your Lofty Blast</h1>
        </div>

        <div className="progress-bar">
          <div className="progress-fill step-3"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="package-content">
        <h2 className="section-title">Step 3: Confirm Your Package</h2>

        {/* Package Selection */}
        <div className="package-section">
          <h3 className="subsection-title">Select Your Package</h3>

          {/* Zip Code Blast Package */}
          <div
            className={`package-card ${formData.selectedPackage === "zipcode" ? "selected" : ""}`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, selectedPackage: "zipcode" }))
            }
          >
            <div className="package-select-corner">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path
                  d="M30 0H0L34 34V4C34 1.79086 32.2091 0 30 0Z"
                  fill={
                    formData.selectedPackage === "zipcode"
                      ? "#3B5CDE"
                      : "#C6C8D1"
                  }
                />
                {formData.selectedPackage === "zipcode" && (
                  <svg
                    x="19"
                    y="5"
                    width="11"
                    height="8"
                    viewBox="0 0 13 9"
                    fill="none"
                  >
                    <path
                      d="M5.26043 8.46892L1.12287 4.67225C1.0548 4.61458 0.999075 4.54372 0.95905 4.46393C0.919026 4.38414 0.895525 4.29707 0.889961 4.20795C0.884397 4.11883 0.896884 4.02951 0.926673 3.94535C0.956462 3.86118 1.00294 3.78392 1.0633 3.71821C1.12367 3.6525 1.19668 3.59969 1.27795 3.56296C1.35921 3.52623 1.44706 3.50633 1.5362 3.50447C1.62534 3.50261 1.71393 3.51882 1.79665 3.55213C1.87938 3.58544 1.95452 3.63516 2.01757 3.69829L5.20032 6.62017L11.0849 0.510792C11.1452 0.448236 11.2173 0.398202 11.297 0.363546C11.3767 0.32889 11.4624 0.310292 11.5492 0.308812C11.6361 0.307332 11.7224 0.323 11.8032 0.354921C11.884 0.386842 11.9578 0.434392 12.0202 0.494855C12.0827 0.555317 12.1327 0.627509 12.1673 0.707309C12.2019 0.787108 12.2204 0.872952 12.2219 0.959939C12.2234 1.04693 12.2077 1.13335 12.1759 1.21429C12.144 1.29522 12.0965 1.36907 12.0361 1.43163L5.26043 8.46892Z"
                      fill="white"
                    />
                  </svg>
                )}
              </svg>
            </div>

            <div className="package-info">
              <div className="package-icon zipcode-icon">
                {/* Zip Code Icon */}
                <div className="icon-bg"></div>
                <div className="icon-map"></div>
                <div className="icon-pointer"></div>
                <div className="icon-houses">
                  <div className="house house-1"></div>
                  <div className="house house-2"></div>
                </div>
              </div>

              <div className="package-details">
                <h4 className="package-name">Zip Code Blast</h4>
                <div className="package-price">
                  <span className="price">$79</span>
                  <span className="period">/week</span>
                </div>
              </div>
            </div>

            <p className="package-description">
              Capture buyer leads across your chosen ZIP code with wide-reaching
              ads that keep you top-of-mind in your local market.
            </p>

            {formData.selectedPackage === "zipcode" && (
              <div className="package-form-section">
                <label className="form-label">Confirm Your Zip Code</label>
                <Input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      zipCode: e.target.value,
                    }))
                  }
                  placeholder="Input code"
                  error={errors.zipCode}
                  className={errors.zipCode ? "error" : ""}
                />
                {errors.zipCode && (
                  <div className="error-message">{errors.zipCode}</div>
                )}
              </div>
            )}
          </div>

          {/* Listing Blast Package */}
          <div
            className={`package-card ${formData.selectedPackage === "listing" ? "selected" : ""}`}
            onClick={() =>
              setFormData((prev) => ({ ...prev, selectedPackage: "listing" }))
            }
          >
            <div className="package-select-corner">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <path
                  d="M30 0H0L34 34V4C34 1.79086 32.2091 0 30 0Z"
                  fill={
                    formData.selectedPackage === "listing"
                      ? "#3B5CDE"
                      : "#C6C8D1"
                  }
                />
                {formData.selectedPackage === "listing" && (
                  <svg
                    x="19"
                    y="5"
                    width="11"
                    height="8"
                    viewBox="0 0 13 9"
                    fill="none"
                  >
                    <path
                      d="M5.26043 8.46892L1.12287 4.67225C1.0548 4.61458 0.999075 4.54372 0.95905 4.46393C0.919026 4.38414 0.895525 4.29707 0.889961 4.20795C0.884397 4.11883 0.896884 4.02951 0.926673 3.94535C0.956462 3.86118 1.00294 3.78392 1.0633 3.71821C1.12367 3.6525 1.19668 3.59969 1.27795 3.56296C1.35921 3.52623 1.44706 3.50633 1.5362 3.50447C1.62534 3.50261 1.71393 3.51882 1.79665 3.55213C1.87938 3.58544 1.95452 3.63516 2.01757 3.69829L5.20032 6.62017L11.0849 0.510792C11.1452 0.448236 11.2173 0.398202 11.297 0.363546C11.3767 0.32889 11.4624 0.310292 11.5492 0.308812C11.6361 0.307332 11.7224 0.323 11.8032 0.354921C11.884 0.386842 11.9578 0.434392 12.0202 0.494855C12.0827 0.555317 12.1327 0.627509 12.1673 0.707309C12.2019 0.787108 12.2204 0.872952 12.2219 0.959939C12.2234 1.04693 12.2077 1.13335 12.1759 1.21429C12.144 1.29522 12.0965 1.36907 12.0361 1.43163L5.26043 8.46892Z"
                      fill="white"
                    />
                  </svg>
                )}
              </svg>
            </div>

            <div className="package-info">
              <div className="package-icon listing-icon">
                {/* Listing Icon */}
                <div className="listing-display">
                  <div className="listing-screen"></div>
                  <div className="listing-content">
                    <div className="listing-header"></div>
                    <div className="listing-lines">
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="package-details">
                <h4 className="package-name">Listing Blast</h4>
                <div className="package-price">
                  <span className="price">$79</span>
                  <span className="period">/week</span>
                </div>
              </div>
            </div>

            <p className="package-description">
              Highlight one property with a targeted ad campaign that drives
              high-intent buyers directly to your listing.
            </p>

            {formData.selectedPackage === "listing" && (
              <div className="package-form-section">
                <label className="form-label">Confirm Your Listing</label>

                {formData.selectedListing ? (
                  <div className="selected-listing">
                    <img
                      src={formData.selectedListing.image}
                      alt="Property"
                      className="listing-image"
                    />
                    <div className="listing-info">
                      <div className="listing-price">
                        {formData.selectedListing.price}
                      </div>
                      <div className="listing-address">
                        {formData.selectedListing.address}
                      </div>
                      <div className="listing-details">
                        {formData.selectedListing.beds} Beds |{" "}
                        {formData.selectedListing.baths} Baths |{" "}
                        {formData.selectedListing.sqft} Sqfts
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={selectListingManually}
                    className={`select-listing-button ${errors.selectedListing ? "error" : ""}`}
                  >
                    Select Listing Manually &gt;
                  </Button>
                )}

                {errors.selectedListing && (
                  <div className="error-message">{errors.selectedListing}</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Campaign Duration */}
        <div className="campaign-section">
          <h3 className="subsection-title">Select Campaign Duration</h3>

          <div className="campaign-options">
            {campaignOptions.map((option) => (
              <div
                key={option.value}
                className={`campaign-option ${formData.campaignDuration === option.value ? "selected" : ""}`}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    campaignDuration: option.value,
                  }))
                }
              >
                <div className="campaign-duration">{option.label}</div>
                <div className="campaign-progress">
                  <div className="progress-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${option.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="campaign-views">
                  <span className="views-count">{option.views}</span>
                  <span className="views-label">Views</span>
                </div>
                <div className="campaign-radio">
                  <div
                    className={`radio-circle ${formData.campaignDuration === option.value ? "selected" : ""}`}
                  >
                    <div className="radio-inner"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Mode */}
        <div className="payment-section">
          <h3 className="subsection-title">Select Payment Mode</h3>

          <div className="payment-dropdown" onClick={handlePaymentModeClick}>
            <div className="dropdown-content">
              <span className="dropdown-text">{formData.paymentMode}</span>
              <svg
                className="dropdown-arrow"
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
              >
                <path
                  d="M6.0003 6.25501L0.859047 1.14376C0.789203 1.0735 0.75 0.978455 0.75 0.879385C0.75 0.780315 0.789203 0.685271 0.859047 0.61501L6.0003 5.19751L10.609 0.61126C10.6439 0.576112 10.6854 0.548214 10.7311 0.529176L6.0003 6.25501Z"
                  fill="#C6C8D1"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="package-footer">
        <div className="footer-buttons">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="back-button"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!isFormValid()}
            className={`next-button ${!isFormValid() ? "disabled" : ""}`}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Payment Mode Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Select Payment Mode"
        actionButton={{
          text: "Confirm",
          onClick: handlePaymentConfirm,
        }}
      >
        <div className="payment-modal-content">
          <div className="payment-option">
            <label className="payment-option-label">
              <input
                type="radio"
                name="paymentMode"
                value="onetime"
                checked={tempPaymentMode === "onetime"}
                onChange={(e) => setTempPaymentMode(e.target.value)}
              />
              <div className="radio-circle">
                <div className="radio-inner"></div>
              </div>
              <div className="payment-option-content">
                <div className="payment-option-title">One-time Charge</div>
                <div className="payment-option-description">
                  By choosing this option, you will be billed for this time ONLY
                </div>
              </div>
            </label>
          </div>

          <div className="payment-option">
            <label className="payment-option-label">
              <input
                type="radio"
                name="paymentMode"
                value="recurring"
                checked={tempPaymentMode === "recurring"}
                onChange={(e) => setTempPaymentMode(e.target.value)}
              />
              <div className="radio-circle">
                <div className="radio-inner"></div>
              </div>
              <div className="payment-option-content">
                <div className="payment-option-title">Recurring Charge</div>
                <div className="payment-option-description">
                  By choosing this option, you will be billed monthly for total
                  12 months. Every month we will run the campaign for you based
                  on the duration you choose above
                </div>
              </div>
            </label>
          </div>
        </div>
      </Modal>

      {/* Listing Selection Modal */}
      <ListingSelectionModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        onSelect={handleListingSelect}
      />
    </div>
  );
}
