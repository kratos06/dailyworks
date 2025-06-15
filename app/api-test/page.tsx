"use client";

import { useState } from "react";
import { mlsApi, listingsApi, packagesApi, geoApi, campaignsApi, checkoutApi } from "@/lib/api";

export default function APITestPage() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState<string | null>(null);

  const testEndpoint = async (name: string, apiCall: () => Promise<any>) => {
    setLoading(name);
    try {
      const result = await apiCall();
      setResults((prev: any) => ({ ...prev, [name]: result }));
    } catch (error) {
      setResults((prev: any) => ({ 
        ...prev, 
        [name]: { error: error instanceof Error ? error.message : 'Unknown error' }
      }));
    } finally {
      setLoading(null);
    }
  };

  const tests = [
    {
      name: "MLS Providers",
      call: () => mlsApi.getProviders()
    },
    {
      name: "Verify Agent",
      call: () => mlsApi.verifyAgent("crmls", "50846**")
    },
    {
      name: "Send Verification Code",
      call: () => mlsApi.sendVerificationCode("agent_001", "email")
    },
    {
      name: "Verify Code",
      call: () => mlsApi.verifyCode("agent_001", "12345")
    },
    {
      name: "All Listings",
      call: () => listingsApi.getAll()
    },
    {
      name: "Search Listings",
      call: () => listingsApi.search({ q: "Los Angeles", zipCode: "90045" })
    },
    {
      name: "All Packages",
      call: () => packagesApi.getAll()
    },
    {
      name: "Campaign Durations",
      call: () => packagesApi.getDurations()
    },
    {
      name: "Validate Zipcode",
      call: () => geoApi.validateZipcode("53202")
    },
    {
      name: "Create Campaign",
      call: () => campaignsApi.create({
        packageType: "zipcode",
        targetType: "zipcode",
        targetValue: "53202",
        duration: "4weeks",
        paymentMode: "onetime",
        userId: "user_001"
      })
    },
    {
      name: "Process Checkout",
      call: () => checkoutApi.processPayment({
        campaignId: "campaign_001",
        personalInfo: {
          firstName: "Alexander",
          lastName: "Alexander",
          email: "Alexander@lofty.com"
        },
        paymentInfo: {
          paymentMethod: "Credit & Debit Cards",
          accountHolderName: "Danny Gray"
        },
        billingAddress: {
          countryRegion: "United States",
          address: "456 Elm Street, Los Angeles, CA"
        },
        termsAccepted: true
      })
    }
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>API Integration Test Page</h1>
      <p>Test all mock server endpoints to verify integration.</p>
      
      <div style={{ marginBottom: "20px" }}>
        <h2>Quick Test All</h2>
        <button
          onClick={() => {
            tests.forEach((test, index) => {
              setTimeout(() => testEndpoint(test.name, test.call), index * 500);
            });
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b5cde",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Test All Endpoints
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        {tests.map((test) => (
          <div
            key={test.name}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#f9f9f9"
            }}
          >
            <h3>{test.name}</h3>
            <button
              onClick={() => testEndpoint(test.name, test.call)}
              disabled={loading === test.name}
              style={{
                padding: "8px 16px",
                backgroundColor: loading === test.name ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: loading === test.name ? "not-allowed" : "pointer",
                marginBottom: "10px"
              }}
            >
              {loading === test.name ? "Testing..." : "Test"}
            </button>
            
            {results[test.name] && (
              <div>
                <h4>Result:</h4>
                <pre
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    overflow: "auto",
                    maxHeight: "200px",
                    border: results[test.name].error ? "1px solid #ff0000" : "1px solid #ddd"
                  }}
                >
                  {JSON.stringify(results[test.name], null, 2)}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>API Status</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: Object.keys(results).length > 0 ? "#28a745" : "#dc3545"
            }}
          ></div>
          <span>
            Mock Server: {Object.keys(results).length > 0 ? "Connected" : "Disconnected"}
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
          Make sure the mock server is running on http://localhost:3001
        </p>
      </div>
    </div>
  );
}
