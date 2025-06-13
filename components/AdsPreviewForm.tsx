"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import Link from "next/link";

export default function AdsPreviewForm() {
  const [activeTab, setActiveTab] = useState<"mobile" | "pc">("mobile");
  const [currentSlide, setCurrentSlide] = useState(0);

  const propertyListings = [
    {
      id: 1,
      title:
        "Find Your Dream Home in Casa Grande, AZ! Exclusive Deals for Home Buyers - Act Now!",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      image: "/api/placeholder/191/191",
    },
    {
      id: 2,
      title:
        "🏠 NEW LISTING - NOW AVAILABLE! Be the first to check out your new dream home! 4 BD/ 2.5 BA, 3805 168th PL SE,Bothell, WA 98012.",
      address: "123 Main Street, Apt 4B, Springfield, IL 62701, USA",
      image: "/api/placeholder/191/191",
    },
    {
      id: 3,
      title: "Perfect Home in Bothell",
      address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      image: "/api/placeholder/191/191",
    },
  ];

  return (
    <div className="ads-preview-container">
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
        <Link
          href="/mls-verification"
          className="back-button"
          aria-label="Go back"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
            <path
              d="M9 1L1 9.09909L9 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="header-title">Start Your Lofty Blast</h1>
      </header>

      {/* Progress Indicator - Step 2 */}
      <div className="progress-indicator">
        <div className="progress-bar progress-bar-step2"></div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <h2 className="page-title">Step 2: Preview</h2>

          <h3 className="section-title">Blast Ads Preview</h3>

          {/* Mobile/PC Tabs */}
          <div className="preview-tabs">
            <button
              className={`tab ${activeTab === "mobile" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("mobile")}
            >
              Mobile
            </button>
            <button
              className={`tab ${activeTab === "pc" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("pc")}
            >
              PC
            </button>
          </div>

          {/* Facebook Ad Preview */}
          <div className="ad-preview-section">
            {activeTab === "mobile" ? (
              <div className="mobile-ad-container">
                <div className="facebook-ad-card">
                  {/* Ad Header */}
                  <div className="ad-header">
                    <div className="advertiser-info">
                      <div className="advertiser-avatar"></div>
                      <div className="advertiser-details">
                        <div className="advertiser-name">
                          Chime Facebook Listing Ads
                        </div>
                        <div className="sponsored-label">Sponsored • 🌐</div>
                      </div>
                    </div>
                    <div className="ad-menu">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* Ad Content */}
                  <div className="ad-content">
                    <p className="ad-text">
                      {propertyListings[currentSlide]?.title}
                    </p>
                  </div>

                  {/* Property Cards */}
                  <div className="property-carousel">
                    <div className="property-cards">
                      {propertyListings.map((property, index) => (
                        <div key={property.id} className="property-card">
                          <div className="property-image">
                            <img src={property.image} alt={property.address} />
                          </div>
                          <div className="property-details">
                            <div className="property-address">
                              {property.address}
                            </div>
                            <div className="property-source">
                              FORM ON Facebook
                            </div>
                            <button className="learn-more-btn">
                              Learn More
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ad Actions */}
                  <div className="ad-actions">
                    <button className="action-btn">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 5l3.5-.5L6 1z"
                          fill="currentColor"
                        />
                      </svg>
                      Like
                    </button>
                    <button className="action-btn">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M2 2h8v6H4l-2 2V2z" fill="currentColor" />
                      </svg>
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pc-ad-container">
                <div className="facebook-ad-card pc-layout">
                  {/* PC Layout - Wider format */}
                  <div className="ad-header">
                    <div className="advertiser-info">
                      <div className="advertiser-avatar"></div>
                      <div className="advertiser-details">
                        <div className="advertiser-name">
                          Chime Facebook Listing Ads
                        </div>
                        <div className="sponsored-label">Sponsored • 🌐</div>
                      </div>
                    </div>
                  </div>

                  <div className="ad-content">
                    <p className="ad-text">
                      🏠 NEW LISTING - NOW AVAILABLE! Be the first to check out
                      your new dream home! 4 BD/ 2.5 BA, 3805 168th PL
                      SE,Bothell, WA 98012.
                    </p>
                  </div>

                  <div className="property-carousel pc-carousel">
                    <div className="property-cards pc-cards">
                      <div className="property-card pc-card">
                        <div className="property-image">
                          <img src="/api/placeholder/191/179" alt="Property" />
                        </div>
                        <div className="property-details">
                          <div className="property-title">
                            Perfect Home in Bothell
                          </div>
                          <div className="property-source">
                            FORM ON Facebook
                          </div>
                          <button className="learn-more-btn">Learn More</button>
                        </div>
                      </div>
                      <div className="property-card pc-card">
                        <div className="property-image">
                          <img src="/api/placeholder/191/179" alt="Property" />
                        </div>
                        <div className="property-details">
                          <div className="property-title">
                            Perfect Home in Bothell
                          </div>
                          <div className="property-source">
                            FORM ON Facebook
                          </div>
                          <button className="learn-more-btn">Learn More</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ad-actions">
                    <button className="action-btn">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9l-3 1.5.5-3.5L1 5l3.5-.5L6 1z"
                          fill="currentColor"
                        />
                      </svg>
                      Like
                    </button>
                    <button className="action-btn">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path d="M2 2h8v6H4l-2 2V2z" fill="currentColor" />
                      </svg>
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Dots */}
          <div className="pagination-dots">
            <div
              className={`dot ${currentSlide === 0 ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(0)}
            ></div>
            <div
              className={`dot ${currentSlide === 1 ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(1)}
            ></div>
            <div
              className={`dot ${currentSlide === 2 ? "dot-active" : ""}`}
              onClick={() => setCurrentSlide(2)}
            ></div>
          </div>
        </div>
      </main>

      {/* Bottom Buttons */}
      <div className="bottom-section dual-buttons">
        <Link href="/mls-verification" className="back-btn">
          Back
        </Link>
        <Link href="/package-confirmation">
          <Button className="next-button">Next</Button>
        </Link>
      </div>
    </div>
  );
}
