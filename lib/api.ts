// API Service Layer for Real Estate Advertising Platform

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
}

// Type definitions
export interface MLSProvider {
  id: string;
  name: string;
  code: string;
  region: string;
  active: boolean;
}

export interface Agent {
  id: string;
  mlsId: string;
  agentId: string;
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  verificationMethod: 'email' | 'phone';
}

export interface Listing {
  id: string;
  price: string;
  address: string;
  beds: string;
  baths: string;
  sqft: string;
  image: string;
  provider: string;
  agentId: string;
  mlsId: string;
  zipCode: string;
  status: string;
  listingDate: string;
  description: string;
}

export interface Package {
  id: string;
  name: string;
  type: 'zipcode' | 'listing';
  price: number;
  period: string;
  description: string;
  features: string[];
}

export interface CampaignDuration {
  id: string;
  label: string;
  weeks: number;
  estimatedViews: number;
  progress: number;
}

export interface Campaign {
  id: string;
  userId: string;
  packageId: string;
  targetType: 'zipcode' | 'listing';
  targetValue: string;
  duration: string;
  paymentMode: 'onetime' | 'recurring';
  status: string;
  createdAt: string;
  totalCost: number;
  taxes: number;
  finalAmount?: number;
}

// MLS & Authentication API
export const mlsApi = {
  // Get all MLS providers
  getProviders: (): Promise<MLSProvider[]> =>
    apiRequest('/mls_providers'),

  // Verify agent credentials
  verifyAgent: (mlsId: string, agentId: string): Promise<{
    success: boolean;
    agent?: Agent;
    message?: string;
  }> =>
    apiRequest('/mls/verify-agent', {
      method: 'POST',
      body: JSON.stringify({ mlsId, agentId }),
    }),

  // Send verification code
  sendVerificationCode: (agentId: string, method: 'email' | 'phone'): Promise<{
    success: boolean;
    message: string;
    code?: string; // Only for testing
  }> =>
    apiRequest('/mls/send-verification-code', {
      method: 'POST',
      body: JSON.stringify({ agentId, method }),
    }),

  // Verify code
  verifyCode: (agentId: string, code: string): Promise<{
    success: boolean;
    message: string;
  }> =>
    apiRequest('/mls/verify-code', {
      method: 'POST',
      body: JSON.stringify({ agentId, code }),
    }),

  // Search agents
  searchAgents: (mlsId: string, query: string): Promise<Agent[]> =>
    apiRequest(`/agents?mlsId=${mlsId}&q=${encodeURIComponent(query)}`),
};

// Listings API
export const listingsApi = {
  // Get all listings
  getAll: (): Promise<Listing[]> =>
    apiRequest('/listings'),

  // Search listings
  search: (params: {
    q?: string;
    agentId?: string;
    zipCode?: string;
  }): Promise<{
    success: boolean;
    listings: Listing[];
    total: number;
  }> => {
    const searchParams = new URLSearchParams();
    if (params.q) searchParams.append('q', params.q);
    if (params.agentId) searchParams.append('agentId', params.agentId);
    if (params.zipCode) searchParams.append('zipCode', params.zipCode);
    
    return apiRequest(`/listings/search?${searchParams.toString()}`);
  },

  // Get listing by ID
  getById: (id: string): Promise<Listing> =>
    apiRequest(`/listings/${id}`),
};

// Packages API
export const packagesApi = {
  // Get all packages
  getAll: (): Promise<Package[]> =>
    apiRequest('/packages'),

  // Get campaign durations
  getDurations: (): Promise<CampaignDuration[]> =>
    apiRequest('/campaign_durations'),
};

// Geographic API
export const geoApi = {
  // Validate zipcode
  validateZipcode: (code: string): Promise<{
    success: boolean;
    valid: boolean;
    zipcode?: {
      code: string;
      city: string;
      state: string;
      county: string;
      population: number;
      medianIncome: number;
    };
    message?: string;
  }> =>
    apiRequest(`/zipcodes/${code}/validate`),
};

// Campaigns API
export const campaignsApi = {
  // Create campaign
  create: (campaignData: {
    packageType: 'zipcode' | 'listing';
    targetType: 'zipcode' | 'listing';
    targetValue: string;
    duration: string;
    paymentMode: 'onetime' | 'recurring';
    userId?: string;
  }): Promise<{
    success: boolean;
    campaign: Campaign;
    estimatedViews: number;
  }> =>
    apiRequest('/campaigns/create', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    }),
};

// Checkout API
export const checkoutApi = {
  // Process payment
  processPayment: (paymentData: {
    campaignId: string;
    personalInfo: {
      firstName: string;
      lastName: string;
      email: string;
    };
    paymentInfo: {
      paymentMethod: string;
      accountHolderName: string;
    };
    billingAddress: {
      countryRegion: string;
      address: string;
    };
    termsAccepted: boolean;
  }): Promise<{
    success: boolean;
    orderId: string;
    message: string;
    campaignStatus: string;
    confirmationEmail: string;
  }> =>
    apiRequest('/checkout/process', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),
};

export default {
  mlsApi,
  listingsApi,
  packagesApi,
  geoApi,
  campaignsApi,
  checkoutApi,
};
