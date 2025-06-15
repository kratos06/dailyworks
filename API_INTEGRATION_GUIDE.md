# Real Estate Advertising Platform - API Integration Guide

## Overview

This document provides a comprehensive guide to the API integration for the Real Estate Advertising Platform. The platform now includes a fully functional mock server with realistic data and API endpoints that support the entire 4-step user flow.

## Architecture

```
Frontend (Next.js)  ←→  Mock Server (Express)  ←→  JSON Database
     Port 3002              Port 3001              db.json
```

## Quick Start

### 1. Start Both Servers
```bash
# Start both frontend and mock server
npm run dev:full

# Or start individually
npm run mock-server  # Port 3001
npm run dev          # Port 3002
```

### 2. Test API Integration
Visit: http://localhost:3002/api-test

### 3. View Application
Visit: http://localhost:3002

## API Endpoints Summary

### MLS & Authentication
- `GET /api/mls_providers` - Get all MLS providers
- `POST /api/mls/verify-agent` - Verify agent credentials
- `POST /api/mls/send-verification-code` - Send verification code
- `POST /api/mls/verify-code` - Verify submitted code

### Listings
- `GET /api/listings` - Get all listings
- `GET /api/listings/search` - Search listings with filters

### Packages & Campaigns
- `GET /api/packages` - Get advertising packages
- `GET /api/campaign_durations` - Get campaign duration options
- `POST /api/campaigns/create` - Create new campaign

### Geographic
- `GET /api/zipcodes/{code}/validate` - Validate zip code

### Checkout
- `POST /api/checkout/process` - Process payment

## Integration Features

### 1. API Service Layer (`lib/api.ts`)
- Centralized API functions
- TypeScript interfaces
- Error handling
- Request/response typing

### 2. React Hooks (`hooks/useApi.ts`)
- `useApi` - Data fetching with loading states
- `useAsyncAction` - Form submissions and mutations
- `useLocalStorage` - Persistent form data
- `useFormValidation` - Form validation logic
- `useMultiStepForm` - Multi-step form management

### 3. Enhanced Components
- `MlsVerificationFormWithAPI.tsx` - API-integrated MLS verification
- `PackageConfirmationFormWithAPI.tsx` - API-integrated package selection
- Loading states and error handling
- Real-time validation

## Test Data

### MLS Providers
- CRMLS (California Regional MLS)
- BMLS (Bright MLS)
- Canopy MLS
- REIN (Real Estate Information Network)
- ARMLS (Arizona Regional MLS)
- NTREIS (North Texas Real Estate Info Systems)

### Test Agents
- Chris Trapani (ID: 50846**, MLS: CRMLS)
- Brian Evans (ID: 60123**, MLS: CRMLS)
- Albert Flores (ID: 70456**, MLS: CRMLS)

### Test Verification Code
Use `12345` for any verification code testing.

### Available Zip Codes
- 53202 (Milwaukee, WI)
- 90045 (Los Angeles, CA)
- 90210 (Beverly Hills, CA)

### Packages
- **Zip Code Blast**: $79/week - Target entire zip code
- **Listing Blast**: $79/week - Target specific listing

### Campaign Durations
- 1 Week (4 estimated views)
- 2 Weeks (33 estimated views)
- 3 Weeks (240 estimated views)
- 4 Weeks (1000 estimated views)

## API Usage Examples

### Verify Agent
```typescript
import { mlsApi } from '@/lib/api';

const result = await mlsApi.verifyAgent('crmls', '50846**');
if (result.success) {
  console.log('Agent verified:', result.agent);
}
```

### Search Listings
```typescript
import { listingsApi } from '@/lib/api';

const result = await listingsApi.search({
  q: 'Los Angeles',
  zipCode: '90045'
});
console.log('Found listings:', result.listings);
```

### Create Campaign
```typescript
import { campaignsApi } from '@/lib/api';

const campaign = await campaignsApi.create({
  packageType: 'zipcode',
  targetType: 'zipcode',
  targetValue: '53202',
  duration: '4weeks',
  paymentMode: 'onetime'
});
```

### Using React Hooks
```typescript
import { useApi, useAsyncAction } from '@/hooks/useApi';
import { packagesApi } from '@/lib/api';

function MyComponent() {
  // Fetch data
  const { data: packages, loading, error } = useApi(packagesApi.getAll);
  
  // Handle actions
  const { execute: createCampaign, loading: creating } = useAsyncAction(
    campaignsApi.create
  );
  
  const handleSubmit = async () => {
    const result = await createCampaign(campaignData);
    if (result?.success) {
      // Handle success
    }
  };
}
```

## Error Handling

### API Errors
- Network errors are caught and displayed
- Invalid responses show user-friendly messages
- Loading states prevent multiple submissions

### Validation Errors
- Real-time zip code validation
- Form field validation
- Required field checking

## Performance Features

### Caching
- Local storage for form data persistence
- API response caching where appropriate

### Loading States
- Skeleton loading for data fetching
- Button loading states for actions
- Spinner components for long operations

### Optimizations
- Debounced API calls for search
- Lazy loading of components
- Efficient re-renders with React hooks

## Development Tools

### API Testing
- Visit `/api-test` for comprehensive endpoint testing
- Individual endpoint testing buttons
- Response inspection and debugging

### Mock Server Features
- Realistic API delays (100-600ms)
- CORS enabled for development
- Comprehensive test data
- Error simulation capabilities

## Deployment Considerations

### Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
MOCK_SERVER_PORT=3001
NODE_ENV=development
```

### Production Setup
1. Replace mock server with real backend
2. Update API_BASE_URL in `lib/api.ts`
3. Configure proper CORS settings
4. Set up authentication tokens
5. Implement proper error logging

## Next Steps

1. **Real Backend Integration**: Replace mock server with actual backend
2. **Authentication**: Add JWT token handling
3. **Payment Processing**: Integrate with Stripe/PayPal
4. **File Uploads**: Add property image upload functionality
5. **Real-time Updates**: WebSocket integration for campaign status
6. **Analytics**: Add tracking and analytics integration

## Troubleshooting

### Common Issues

1. **Port Conflicts**: Servers auto-select available ports
2. **CORS Errors**: Ensure mock server is running on port 3001
3. **API Timeouts**: Check network connectivity
4. **Data Not Loading**: Verify mock server is running

### Debug Commands
```bash
# Check if mock server is running
curl http://localhost:3001/api/packages

# Test specific endpoint
curl -X POST http://localhost:3001/api/mls/verify-agent \
  -H "Content-Type: application/json" \
  -d '{"mlsId":"crmls","agentId":"50846**"}'

# View server logs
npm run mock-server
```

## Conclusion

The API integration provides a solid foundation for the real estate advertising platform with:

✅ Complete mock backend with realistic data  
✅ Type-safe API layer with error handling  
✅ React hooks for state management  
✅ Loading states and user feedback  
✅ Form validation and persistence  
✅ Comprehensive testing tools  
✅ Production-ready architecture  

The system is now ready for real backend integration and production deployment.
