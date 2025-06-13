"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import PersonalInfoModal from "./PersonalInfoModal";
import SuccessModal from "./SuccessModal";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

interface PaymentInfo {
  paymentMethod: string;
  accountHolderName: string;
  accountNumber: string;
  cvcCvv: string;
  expirationDate: string;
  setAsDefault: boolean;
}

interface BillingAddress {
  countryRegion: string;
  address: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  paymentInfo: PaymentInfo;
  billingAddress: BillingAddress;
  termsAccepted: boolean;
}

interface OrderItem {
  item: string;
  type: string;
  price: string;
}

const orderItems: OrderItem[] = [
  { item: "$79 Lofty Blast", type: "One-time Payment", price: "$79" },
  { item: "$79 Lofty Blast", type: "One-time Payment", price: "$79" },
];

export default function CheckoutForm() {
  const router = useRouter();
  const [billingAddressState, setBillingAddressState] = useState<
    "form" | "saved"
  >("form");
  const [showFullForm, setShowFullForm] = useState(true);
  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: "Alexander",
      lastName: "Alexander",
      email: "Alexander@lofty.com",
    },
    paymentInfo: {
      paymentMethod: "Credit & Debit Cards",
      accountHolderName: "Danny Gray",
      accountNumber: "*** **** **** 1235",
      cvcCvv: "1234",
      expirationDate: "06/25",
      setAsDefault: true,
    },
    billingAddress: {
      countryRegion: "United States",
      address: "John Doe, 456 Elm Street, Suite 3, Los Angeles, CA 90001, USA",
    },
    termsAccepted: true,
  });

  const handleBack = () => {
    router.push("/package-confirmation");
  };

  const handleCheckOut = () => {
    if (formData.termsAccepted) {
      // Process checkout and show success modal
      setIsSuccessModalOpen(true);
    }
  };

  const handlePersonalInfoEdit = () => {
    setIsPersonalInfoModalOpen(true);
  };

  const handlePersonalInfoSave = (personalInfo: PersonalInfo) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo,
    }));
  };

  const handleBillingAddressEdit = () => {
    setBillingAddressState("form");
  };

  const handleAddPayment = () => {
    console.log("Add payment method");
  };

  const handleSave = () => {
    setBillingAddressState("saved");
  };

  const toggleFormView = () => {
    setShowFullForm(!showFullForm);
  };

  return (
    <div className="checkout-container">
      {/* Header */}
      <div className="checkout-header">
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
          <div className="progress-fill step-4"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="checkout-content">
        <h2 className="page-title">Step 4: Checkout</h2>

        {/* Debug buttons for testing different states */}
        <div
          className="debug-buttons"
          style={{ margin: "10px 0", display: "flex", gap: "10px" }}
        >
          <button
            onClick={() => setShowFullForm(!showFullForm)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {showFullForm ? "Show Minimal" : "Show Full"}
          </button>
          <button
            onClick={() =>
              setBillingAddressState(
                billingAddressState === "form" ? "saved" : "form",
              )
            }
            style={{
              padding: "5px 10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {billingAddressState === "form" ? "Save Address" : "Edit Address"}
          </button>
        </div>

        {/* Personal Info Section */}
        <div className="info-section">
          <div className="section-header">
            <h3 className="section-title">Personal Info</h3>
            <button className="edit-button" onClick={handlePersonalInfoEdit}>
              Edit
            </button>
          </div>

          <div className="info-rows">
            <div className="info-row">
              <span className="info-label">First Name</span>
              <span className="info-value">
                {formData.personalInfo.firstName}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Name</span>
              <span className="info-value">
                {formData.personalInfo.lastName}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">{formData.personalInfo.email}</span>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Order Details Section */}
        <div className="order-section">
          <h3 className="section-title">Order Details</h3>

          <div className="order-table">
            <div className="table-header">
              <div className="table-cell header-cell">Item</div>
              <div className="table-cell header-cell">Type</div>
              <div className="table-cell header-cell">Total Price</div>
            </div>

            {orderItems.map((item, index) => (
              <div key={index} className="table-row">
                <div className="table-cell">{item.item}</div>
                <div className="table-cell">{item.type}</div>
                <div className="table-cell">{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Payment Info Section */}
        <div className="payment-section">
          <div className="section-header">
            <h3 className="section-title">Payment Info</h3>
            <button className="add-payment-button" onClick={handleAddPayment}>
              Add Payment
            </button>
          </div>

          <p className="payment-disclaimer">
            Your payment information is stored securely.
          </p>

          {showFullForm ? (
            <div className="payment-form">
              <div className="form-group">
                <label className="form-label">Payment Methods</label>
                <div className="payment-method-card selected">
                  <span className="payment-method-text">
                    {formData.paymentInfo.paymentMethod}
                  </span>
                  <div className="radio-button selected">
                    <div className="radio-inner"></div>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Account Holder Name</label>
                <Input
                  value={formData.paymentInfo.accountHolderName}
                  onChange={() => {}}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Number</label>
                <Input
                  value={formData.paymentInfo.accountNumber}
                  onChange={() => {}}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label cvc-label">
                  CVC/CVV
                  <div className="info-icon">
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 0.5C5.61553 0.5 4.26215 0.910543 3.11101 1.67971C1.95987 2.44888 1.06266 3.54213 0.532846 4.82122C0.00303297 6.1003 -0.13559 7.50776 0.134506 8.86563C0.404603 10.2235 1.07129 11.4708 2.05026 12.4497C3.02922 13.4287 4.2765 14.0954 5.63437 14.3655C6.99224 14.6356 8.3997 14.497 9.67879 13.9672C10.9579 13.4373 12.0511 12.5401 12.8203 11.389C13.5895 10.2378 14 8.88447 14 7.5C14 5.64348 13.2625 3.86301 11.9497 2.55025C10.637 1.2375 8.85652 0.5 7 0.5V0.5ZM7 11.875C6.82694 11.875 6.65777 11.8237 6.51388 11.7275C6.36999 11.6314 6.25783 11.4947 6.19161 11.3348C6.12538 11.175 6.10805 10.999 6.14181 10.8293C6.17558 10.6596 6.25891 10.5037 6.38128 10.3813C6.50365 10.2589 6.65956 10.1756 6.8293 10.1418C6.99903 10.108 7.17496 10.1254 7.33485 10.1916C7.49474 10.2578 7.63139 10.37 7.72754 10.5139C7.82368 10.6578 7.875 10.8269 7.875 11C7.875 11.2321 7.78281 11.4546 7.61872 11.6187C7.45463 11.7828 7.23207 11.875 7 11.875ZM7.875 8.375C7.875 8.60706 7.78281 8.82962 7.61872 8.99372C7.45463 9.15781 7.23207 9.25 7 9.25C6.76794 9.25 6.54538 9.15781 6.38128 8.99372C6.21719 8.82962 6.125 8.60706 6.125 8.375V4C6.125 3.76793 6.21719 3.54538 6.38128 3.38128C6.54538 3.21719 6.76794 3.125 7 3.125C7.23207 3.125 7.45463 3.21719 7.61872 3.38128C7.78281 3.54538 7.875 3.76793 7.875 4V8.375Z"
                        fill="#C6C8D1"
                      />
                    </svg>
                  </div>
                </label>
                <Input
                  value={formData.paymentInfo.cvcCvv}
                  onChange={() => {}}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Expiration Date</label>
                <Input
                  value={formData.paymentInfo.expirationDate}
                  onChange={() => {}}
                  className="form-input"
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.paymentInfo.setAsDefault}
                    onChange={() => {}}
                    className="hidden"
                  />
                  <div className="checkbox-custom">
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path
                        d="M11.9999 1L5 8L1 4"
                        stroke="#3B5CDE"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="checkbox-text">
                    Set this payment method as your default for future recurring
                    automatic payments.
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Payment Methods</label>
              <div className="payment-methods-divider"></div>
            </div>
          )}
        </div>

        <div className="section-divider"></div>

        {/* Billing Address Section */}
        {showFullForm && (
          <div className="billing-section">
            <div className="section-header">
              <h3 className="section-title">Billing Address</h3>
              {billingAddressState === "saved" && (
                <button
                  className="edit-button"
                  onClick={handleBillingAddressEdit}
                >
                  Edit
                </button>
              )}
            </div>

            <p className="billing-disclaimer">
              Please enter your billing address. This information is required to
              process taxes and complete your payment.
            </p>

            {billingAddressState === "form" ? (
              <div className="billing-form">
                <div className="form-group">
                  <label className="form-label required">
                    Country/Region *
                  </label>
                  <div className="country-select">
                    <div className="country-flag"></div>
                    <span className="country-text">United States</span>
                    <svg
                      className="dropdown-arrow"
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                    >
                      <path
                        d="M6.0003 6.25492L0.859047 1.14367C0.789203 1.07341 0.75 0.978363 0.75 0.879294C0.75 0.780224 0.789203 0.68518 0.859047 0.614919L6.0003 5.19742L10.609 0.611169C10.6439 0.57602 10.6854 0.548123 10.7311 0.529084C10.7768 0.510046 10.8258 0.500244 10.8753 0.500244C10.9248 0.500244 10.9738 0.510046 11.0195 0.529084C11.0652 0.548123 11.1067 0.57602 11.1415 0.611169C11.2114 0.681429 11.2506 0.776474 11.2506 0.875543C11.2506 0.974613 11.2114 1.06966 11.1415 1.13992L6.0003 6.25492Z"
                        fill="#C6C8D1"
                      />
                    </svg>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label required">Address *</label>
                  <Input
                    value="John Doe, 456 Elm Street, Suite 3, Los Angeles..."
                    onChange={() => {}}
                    className="form-input"
                  />
                </div>

                <Button
                  variant="secondary"
                  onClick={handleSave}
                  className="save-button"
                >
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <div className="address-card">
                  <div className="address-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M15.06 4.41511L8.265 0.165113C8.18553 0.115446 8.09371 0.0891113 8 0.0891113C7.90629 0.0891113 7.81447 0.115446 7.735 0.165113L0.94 4.41511C0.652493 4.5948 0.415386 4.84464 0.250956 5.14114C0.086525 5.43764 0.000168748 5.77107 0 6.11011L0 14.0001C0 14.5305 0.210714 15.0393 0.585786 15.4143C0.960859 15.7894 1.46957 16.0001 2 16.0001H14C14.5304 16.0001 15.0391 15.7894 15.4142 15.4143C15.7893 15.0393 16 14.5305 16 14.0001V6.11011C15.9998 5.77107 15.9135 5.43764 15.749 5.14114C15.5846 4.84464 15.3475 4.5948 15.06 4.41511ZM6 15.0001V10.0001H10V15.0001H6ZM15 14.0001C15 14.2653 14.8946 14.5197 14.7071 14.7072C14.5196 14.8948 14.2652 15.0001 14 15.0001H11V10.0001C11 9.7349 10.8946 9.48054 10.7071 9.29301C10.5196 9.10547 10.2652 9.00011 10 9.00011H6C5.73478 9.00011 5.48043 9.10547 5.29289 9.29301C5.10536 9.48054 5 9.7349 5 10.0001V15.0001H2C1.73478 15.0001 1.48043 14.8948 1.29289 14.7072C1.10536 14.5197 1 14.2653 1 14.0001V6.11011C0.99966 5.94017 1.04264 5.77294 1.12487 5.62422C1.20711 5.47549 1.32589 5.35018 1.47 5.26011L8 1.18011L14.53 5.26011C14.6741 5.35018 14.7929 5.47549 14.8751 5.62422C14.9574 5.77294 15.0003 5.94017 15 6.11011V14.0001Z"
                        fill="#3B5CDE"
                      />
                    </svg>
                  </div>
                  <span className="address-text">
                    {formData.billingAddress.address}
                  </span>
                </div>

                <div className="tax-include-note">Tax include</div>
              </div>
            )}
          </div>
        )}

        {showFullForm && <div className="section-divider"></div>}

        <div className="section-divider"></div>

        {/* Cost Summary */}
        <div className="cost-summary">
          <div className="tax-include-tag">Tax include</div>

          <div className="cost-row">
            <span className="cost-label">Taxes</span>
            <span className="cost-value">$6.79</span>
          </div>

          <div className="cost-row">
            <span className="cost-label">Today's Charge</span>
            <span className="cost-value">$79</span>
          </div>

          <div className="cost-row total">
            <span className="cost-label total-label">Monthly Budget</span>
            <span className="cost-value total-value">$85.79</span>
          </div>
        </div>
      </div>

      {/* Terms and Checkout Footer */}
      <div className="checkout-footer">
        <div className="terms-section">
          <label className="terms-label">
            <input
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={() => {}}
              className="hidden"
            />
            <div className="terms-checkbox">
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.61818 0.214001C10.0523 0.555409 10.1275 1.1841 9.78604 1.61822L4.39288 8.47592L0.315767 4.65053C-0.0869924 4.27263 -0.10715 3.63979 0.270743 3.23703C0.648636 2.83427 1.28148 2.81411 1.68424 3.19201L4.16986 5.52417L8.21396 0.381869C8.55537 -0.0522502 9.18406 -0.127407 9.61818 0.214001Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="terms-text">
              I have read and agreed to the Lofty{" "}
              <a href="#" className="terms-link">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="terms-link">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        <div className="checkout-buttons">
          <Button
            variant="secondary"
            onClick={handleBack}
            className="back-button-footer"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleCheckOut}
            disabled={!formData.termsAccepted}
            className="checkout-button"
          >
            Check Out
          </Button>
        </div>
      </div>

      {/* Modals */}
      <PersonalInfoModal
        isOpen={isPersonalInfoModalOpen}
        onClose={() => setIsPersonalInfoModalOpen(false)}
        personalInfo={formData.personalInfo}
        onSave={handlePersonalInfoSave}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        email={formData.personalInfo.email}
      />
    </div>
  );
}
