# Real Estate Advertising Platform

A Next.js-based real estate advertising platform with a 4-step wizard flow for creating and purchasing advertising campaigns.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
# Start both frontend and mock server
npm run dev:full

# Or start individually
npm run dev          # Frontend only (port 3000)
npm run mock-server  # Mock server only (port 3001)
```

### Access Points
- **Main Application**: http://localhost:3000
- **API Test Page**: http://localhost:3000/api-test
- **Mock Server**: http://localhost:3001/api

## 📁 Project Structure

```
├── app/                    # Next.js 14 app router
│   ├── mls-verification/   # Step 1: MLS verification
│   ├── ads-preview/        # Step 2: Ad preview
│   ├── package-confirmation/ # Step 3: Package selection
│   ├── checkout/           # Step 4: Payment
│   └── api-test/          # API testing interface
├── components/             # React components
│   ├── ui/                # Reusable UI components
│   ├── *Form.tsx          # Original form components (static data)
│   └── *FormWithAPI.tsx   # API-integrated versions
├── lib/                   # API service layer
│   └── api.ts            # Type-safe API functions
├── hooks/                 # Custom React hooks
│   └── useApi.ts         # API state management hooks
├── mock-server/           # Express-based mock backend
│   ├── server.js         # Mock server implementation
│   ├── db.json           # Mock database
│   └── README.md         # API documentation
└── API_INTEGRATION_GUIDE.md # Complete integration guide
```

## 🔄 Application Flow

1. **MLS Verification** - Verify real estate agent credentials
2. **Ads Preview** - Preview Facebook ad appearance
3. **Package Confirmation** - Select advertising package and target
4. **Checkout** - Complete payment and finalize order

## 🛠 Technology Stack

- **Frontend**: Next.js 14, TypeScript, React
- **Backend**: Express.js (mock server)
- **Database**: JSON file (development)
- **Styling**: CSS Modules
- **State Management**: React hooks + local storage

## 📊 Features

### Frontend
- ✅ Responsive mobile-first design
- ✅ 4-step wizard flow
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ Local storage for form persistence

### Backend (Mock)
- ✅ 15+ RESTful API endpoints
- ✅ Realistic test data
- ✅ Error handling and validation
- ✅ CORS enabled for development
- ✅ Simulated API delays

### API Integration
- ✅ Type-safe API layer
- ✅ React hooks for state management
- ✅ Real-time validation
- ✅ Comprehensive error handling

## 🧪 Testing

### API Testing
Visit http://localhost:3000/api-test to test all endpoints interactively.

### Manual Testing
```bash
# Test MLS providers
curl http://localhost:3001/api/mls_providers

# Test agent verification
curl -X POST http://localhost:3001/api/mls/verify-agent \
  -H "Content-Type: application/json" \
  -d '{"mlsId":"crmls","agentId":"50846**"}'
```

## 📝 Available Scripts

```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run mock-server  # Start mock backend server
npm run dev:full     # Start both frontend and backend
```

## 🔧 Configuration

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_key
NEXT_PUBLIC_API_URL=http://localhost:3001/api
MOCK_SERVER_PORT=3001
NODE_ENV=development
```

## 📚 Documentation

- **API Integration Guide**: `API_INTEGRATION_GUIDE.md`
- **Mock Server Documentation**: `mock-server/README.md`

## 🚀 Deployment

### Frontend
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform

### Backend
Replace the mock server with a real backend API:
1. Update `NEXT_PUBLIC_API_URL` in environment variables
2. Implement real authentication and payment processing
3. Set up a production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for demonstration purposes.

---

For detailed API documentation and integration examples, see `API_INTEGRATION_GUIDE.md`.
