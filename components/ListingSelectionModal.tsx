"use client";

import { useState } from "react";

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

interface ListingSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (listing: Listing) => void;
}

const mockListings: Listing[] = [
  {
    id: "1",
    price: "$475,000",
    address: "7858 Truxton Ave, Los Angeles, CA 90045",
    beds: "3",
    baths: "2",
    sqft: "1,244",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fe253410a68864f0aaefd9114f63e501c%2Fb6bdbcdd6b0a42dc9b8710c1c974da4d?format=webp&width=800",
    provider:
      "Listing Provided By Dawn Kayano of Coldwell Banker Pacific Prop.",
  },
  {
    id: "2",
    price: "$475,000",
    address: "7858 Truxton Ave, Los Angeles, CA 90045",
    beds: "3",
    baths: "2",
    sqft: "1,244",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fe253410a68864f0aaefd9114f63e501c%2Fae9ac6a03b0747f4af1233853ec50601?format=webp&width=800",
    provider:
      "Listing Provided By Dawn Kayano of Coldwell Banker Pacific Prop.",
  },
  {
    id: "3",
    price: "$525,000",
    address: "1234 Ocean Blvd, Santa Monica, CA 90401",
    beds: "4",
    baths: "3",
    sqft: "1,650",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fe253410a68864f0aaefd9114f63e501c%2F68a927bf09034e0a8ef0e7f56bd0e9cc?format=webp&width=800",
    provider: "Listing Provided By Sarah Johnson of Century 21 Beachside",
  },
  {
    id: "4",
    price: "$695,000",
    address: "567 Beverly Dr, Beverly Hills, CA 90210",
    beds: "2",
    baths: "2",
    sqft: "1,100",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fe253410a68864f0aaefd9114f63e501c%2Fb6bdbcdd6b0a42dc9b8710c1c974da4d?format=webp&width=800",
    provider: "Listing Provided By Michael Chen of Luxury Homes Realty",
  },
];

export default function ListingSelectionModal({
  isOpen,
  onClose,
  onSelect,
}: ListingSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  if (!isOpen) return null;

  const filteredListings = mockListings.filter(
    (listing) =>
      listing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.provider.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchCancel = () => {
    setSearchTerm("");
    setIsSearchActive(false);
  };

  const handleListingSelect = (listing: Listing) => {
    onSelect(listing);
    onClose();
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="listing-search-highlight">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const renderEmptyState = () => (
    <div className="listing-empty-state">
      <div className="empty-state-illustration">
        <svg width="345" height="185" viewBox="0 0 345 185" fill="none">
          <circle cx="172.5" cy="75" r="75" fill="url(#paint0_linear)" />
          <mask
            id="mask0"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="97"
            y="0"
            width="151"
            height="150"
          >
            <circle cx="172.5" cy="75" r="75" fill="url(#paint1_linear)" />
          </mask>
          <g mask="url(#mask0)">
            <g opacity="0.7">
              <path
                d="M136.432 81H208.106L223.038 109.846H121.5L136.432 81Z"
                fill="#8BADFD"
              />
              <path
                d="M136.5 81L139.962 108.692H121.5L136.5 81Z"
                fill="url(#paint2_linear)"
              />
              <path
                d="M208.039 81L204.577 108.692H223.039L208.039 81Z"
                fill="url(#paint3_linear)"
              />
              <path
                d="M121.5 148.23C121.5 149.335 122.395 150.23 123.5 150.23H221.038C222.143 150.23 223.038 149.335 223.038 148.23V108.692H121.5V148.23Z"
                fill="url(#paint4_linear)"
              />
              <path
                d="M121.5 109.846H223.038V108.692H121.5V109.846Z"
                fill="#E8F0FF"
              />
            </g>
          </g>
          <path
            d="M183.106 49.446L209.911 25.3856L199.1 52.9442L191.31 47.7546L183.106 49.446Z"
            fill="#CCE0FF"
          />
          <path
            d="M209.841 45.7864L209.911 25.3849C207.267 32.3138 201.516 46.8851 201.516 46.8851L209.841 45.7864Z"
            fill="#BACDFF"
          />
          <path
            d="M191.31 47.7532C197.201 40.7725 209.169 26.5257 209.911 25.3842L181.935 49.6862L191.31 47.7532Z"
            fill="#BACDFF"
          />
          <path
            d="M196.572 60C197.625 66.7929 193.919 82.5621 170.669 85.4734C141.607 89.1124 152.979 60 170.669 70.9172C184.821 79.6509 168.142 98.8166 158.033 107.308"
            stroke="#5C7CFF"
            strokeOpacity="0.5"
            strokeDasharray="2 2"
          />
          <path
            d="M136.876 45.4972L147.775 57.1902L140.588 42.9123C140.588 42.9123 139.545 40.4249 137.225 42.0405C134.905 43.6561 136.876 45.4972 136.876 45.4972Z"
            fill="#BACDFF"
          />
          <path
            d="M137.508 58.4879L145.015 58.7771L139.038 54.2316C139.038 54.2316 136.16 52.5892 135.204 55.2494C134.247 57.9096 137.508 58.4879 137.508 58.4879Z"
            fill="#BACDFF"
          />
          <text
            x="132.935"
            y="180.332"
            fill="#797E8B"
            fontSize="15"
            fontFamily="SF Pro Text"
          >
            No Listings
          </text>
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="172.5"
              y1="0"
              x2="172.5"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FAFCFF" />
              <stop offset="0.802399" stopColor="#F1F7FF" />
              <stop offset="1" stopColor="#EFF6FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="172.5"
              y1="0"
              x2="172.5"
              y2="150"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3F86E3" />
              <stop offset="0.802399" stopColor="#F1F7FF" />
              <stop offset="1" stopColor="#EFF6FF" />
            </linearGradient>
            <linearGradient
              id="paint2_linear"
              x1="142.269"
              y1="96"
              x2="124.385"
              y2="99.4615"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5A88FF" />
              <stop offset="1" stopColor="#B4BBF4" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint3_linear"
              x1="199.962"
              y1="94.8462"
              x2="221.885"
              y2="102.923"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#5A88FF" />
              <stop offset="1" stopColor="#A6AFFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear"
              x1="172.269"
              y1="150.23"
              x2="172.269"
              y2="108.692"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#81A4FF" />
              <stop offset="0.0001" stopColor="#81A4FF" stopOpacity="0.48" />
              <stop offset="1" stopColor="#81A3FB" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="listing-modal-overlay">
      <div className="listing-modal-container">
        {/* Status Bar */}
        <div className="listing-status-bar">
          <div className="status-time">8:29</div>
          <div className="status-icons">
            <div className="status-signal"></div>
            <div className="status-wifi"></div>
            <div className="status-battery"></div>
          </div>
        </div>

        {/* Navigation Header */}
        <div className="listing-nav-header">
          <button className="listing-back-btn" onClick={onClose}>
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
          <h1 className="listing-nav-title">Select Listing</h1>
        </div>

        <div className="listing-nav-divider"></div>

        {/* Search Section */}
        <div className="listing-search-section">
          <div className="listing-search-container">
            <div className="listing-search-input-wrapper">
              <div className="listing-search-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.1654 12.0139C9.98427 13.0039 8.46174 13.6 6.8 13.6C3.04446 13.6 0 10.5555 0 6.8C0 3.04446 3.04446 0 6.8 0C10.5555 0 13.6 3.04446 13.6 6.8C13.6 8.46174 13.0039 9.98426 12.014 11.1654L15.7539 14.9054C15.9882 15.1397 15.9882 15.5196 15.7539 15.7539C15.5196 15.9882 15.1397 15.9882 14.9054 15.7539L11.1654 12.0139ZM12.4 6.8C12.4 9.89279 9.8928 12.4 6.8 12.4C3.70721 12.4 1.2 9.89279 1.2 6.8C1.2 3.70721 3.70721 1.2 6.8 1.2C9.8928 1.2 12.4 3.70721 12.4 6.8Z"
                    fill="#C6C8D1"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="listing-search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
              />
              {isSearchActive && searchTerm && (
                <>
                  <button
                    className="listing-search-clear"
                    onClick={() => setSearchTerm("")}
                  >
                    <div className="clear-icon">
                      <div className="clear-circle"></div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </button>
                  <div className="search-cursor"></div>
                </>
              )}
            </div>
            {isSearchActive && (
              <button
                className="listing-search-cancel"
                onClick={handleSearchCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="listing-content-area">
          {filteredListings.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="listing-cards-container">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="listing-property-card"
                  onClick={() => handleListingSelect(listing)}
                >
                  <div className="listing-image-container">
                    <img
                      src={listing.image}
                      alt="Property"
                      className="listing-property-image"
                    />
                    <div className="listing-image-overlay"></div>
                    <div className="listing-mls-badge">MLS</div>
                  </div>

                  <div className="listing-property-info">
                    <div className="listing-property-price">
                      {listing.price}
                    </div>
                    <div className="listing-property-address">
                      {highlightSearchTerm(listing.address)}
                    </div>
                    <div className="listing-property-details">
                      <span>{listing.beds} Beds</span>
                      <span className="property-detail-separator">|</span>
                      <span>{listing.baths} Baths</span>
                      <span className="property-detail-separator">|</span>
                      <span>{listing.sqft} Sqfts</span>
                    </div>
                    <div className="listing-property-provider">
                      {listing.provider}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
