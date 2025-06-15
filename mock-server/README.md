# Mock Server for Real Estate Advertising Platform

This mock server provides all the backend API endpoints needed for the real estate advertising platform.

## Quick Start

### Start Mock Server Only
```bash
npm run mock-server
```

### Start Both Frontend and Mock Server
```bash
npm run dev:full
```

## API Endpoints

### Base URL
```
http://localhost:3001/api
```

### MLS & Authentication

#### Verify Agent
```http
POST /api/mls/verify-agent
Content-Type: application/json

{
  "mlsId": "crmls",
  "agentId": "50846**"
}
```

#### Send Verification Code
```http
POST /api/mls/send-verification-code
Content-Type: application/json

{
  "agentId": "agent_001",
  "method": "email"
}
```

#### Verify Code
```http
POST /api/mls/verify-code
Content-Type: application/json

{
  "agentId": "agent_001",
  "code": "12345"
}
```

### Listings

#### Search Listings
```http
GET /api/listings/search?q=Los Angeles&agentId=agent_001&zipCode=90045
```

#### Get All Listings
```http
GET /api/listings
```

### Packages & Campaigns

#### Get Packages
```http
GET /api/packages
```

#### Create Campaign
```http
POST /api/campaigns/create
Content-Type: application/json

{
  "packageType": "zipcode",
  "targetType": "zipcode",
  "targetValue": "53202",
  "duration": "4weeks",
  "paymentMode": "onetime",
  "userId": "user_001"
}
```

### Geographic Data

#### Validate Zipcode
```http
GET /api/zipcodes/53202/validate
```

### Checkout

#### Process Payment
```http
POST /api/checkout/process
Content-Type: application/json

{
  "campaignId": "campaign_001",
  "personalInfo": {
    "firstName": "Alexander",
    "lastName": "Alexander",
    "email": "Alexander@lofty.com"
  },
  "paymentInfo": {
    "paymentMethod": "Credit & Debit Cards",
    "accountHolderName": "Danny Gray"
  },
  "billingAddress": {
    "countryRegion": "United States",
    "address": "456 Elm Street, Los Angeles, CA"
  },
  "termsAccepted": true
}
```

## Test Data

### Available MLS Providers
- CRMLS (California Regional MLS)
- BMLS (Bright MLS)
- Canopy MLS
- REIN (Real Estate Information Network)
- ARMLS (Arizona Regional MLS)
- NTREIS (North Texas Real Estate Info Systems)

### Test Agents
- Chris Trapani (ID: 50846**)
- Brian Evans (ID: 60123**)
- Albert Flores (ID: 70456**)

### Test Verification Code
Use `12345` for any verification code testing.

### Available Zipcodes
- 53202 (Milwaukee, WI)
- 90045 (Los Angeles, CA)
- 90210 (Beverly Hills, CA)

## Features

- ✅ CORS enabled for localhost:3000
- ✅ Realistic API delays (100-600ms)
- ✅ Comprehensive test data
- ✅ Error handling
- ✅ Search functionality
- ✅ Campaign cost calculation
- ✅ Payment processing simulation

## Database Structure

The mock database (`db.json`) contains:
- `mls_providers`: Available MLS systems
- `agents`: Real estate agents
- `listings`: Property listings
- `packages`: Advertising packages
- `campaign_durations`: Available campaign lengths
- `zipcodes`: Geographic data
- `users`: User profiles
- `payment_methods`: Payment information
- `billing_addresses`: Billing addresses
- `campaigns`: Created campaigns
- `verification_codes`: Verification codes
