const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Custom middleware for API responses
app.use((req, res, next) => {
  // Add delay to simulate real API
  setTimeout(() => {
    next();
  }, Math.random() * 500 + 100); // 100-600ms delay
});

// MLS Verification Endpoints
app.post('/api/mls/verify-agent', (req, res) => {
  const { mlsId, agentId } = req.body;

  const agent = db.agents.find(a => a.mlsId === mlsId && a.agentId === agentId);
  
  if (agent) {
    res.json({
      success: true,
      agent: {
        id: agent.id,
        name: agent.name,
        email: agent.email,
        verified: agent.verified
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Agent not found'
    });
  }
});

app.post('/api/mls/send-verification-code', (req, res) => {
  const { agentId, method } = req.body;
  
  // Generate random 5-digit code
  const code = Math.floor(10000 + Math.random() * 90000).toString();
  
  // In a real app, you would send the code via email/SMS
  console.log(`Verification code for agent ${agentId}: ${code}`);
  
  res.json({
    success: true,
    message: `Verification code sent via ${method}`,
    // In production, don't return the code!
    code: code // Only for testing
  });
});

app.post('/api/mls/verify-code', (req, res) => {
  const { agentId, code } = req.body;
  
  // Simple verification - in production, check against stored codes
  if (code === '12345' || code.length === 5) {
    res.json({
      success: true,
      message: 'Code verified successfully'
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid verification code'
    });
  }
});

// Listings Endpoints
app.get('/api/listings/search', (req, res) => {
  const { q, agentId, zipCode } = req.query;

  let listings = [...db.listings];
  
  if (agentId) {
    listings = listings.filter(listing => listing.agentId === agentId);
  }
  
  if (zipCode) {
    listings = listings.filter(listing => listing.zipCode === zipCode);
  }
  
  if (q) {
    const query = q.toLowerCase();
    listings = listings.filter(listing => 
      listing.address.toLowerCase().includes(query) ||
      listing.provider.toLowerCase().includes(query) ||
      listing.price.toLowerCase().includes(query)
    );
  }
  
  res.json({
    success: true,
    listings: listings,
    total: listings.length
  });
});

// Zipcode Validation
app.get('/api/zipcodes/:code/validate', (req, res) => {
  const { code } = req.params;

  const zipcode = db.zipcodes.find(z => z.code === code);
  
  if (zipcode) {
    res.json({
      success: true,
      valid: true,
      zipcode: zipcode
    });
  } else {
    res.json({
      success: true,
      valid: false,
      message: 'Zipcode not found'
    });
  }
});

// Campaign Creation
app.post('/api/campaigns/create', (req, res) => {
  const {
    packageType,
    targetType,
    targetValue,
    duration,
    paymentMode,
    userId
  } = req.body;

  const packages = db.packages;
  const durations = db.campaign_durations;
  
  const selectedPackage = packages.find(p => p.type === packageType);
  const selectedDuration = durations.find(d => d.id === duration);
  
  if (!selectedPackage || !selectedDuration) {
    return res.status(400).json({
      success: false,
      message: 'Invalid package or duration'
    });
  }
  
  const totalCost = selectedPackage.price * selectedDuration.weeks;
  const taxes = Math.round(totalCost * 0.0859 * 100) / 100; // 8.59% tax
  
  const campaign = {
    id: `campaign_${Date.now()}`,
    userId: userId || 'user_001',
    packageId: selectedPackage.id,
    targetType,
    targetValue,
    duration,
    paymentMode,
    status: 'pending',
    createdAt: new Date().toISOString(),
    totalCost,
    taxes,
    finalAmount: totalCost + taxes
  };
  
  res.json({
    success: true,
    campaign,
    estimatedViews: selectedDuration.estimatedViews
  });
});

// Checkout Processing
app.post('/api/checkout/process', (req, res) => {
  const { 
    campaignId, 
    personalInfo, 
    paymentInfo, 
    billingAddress,
    termsAccepted 
  } = req.body;
  
  if (!termsAccepted) {
    return res.status(400).json({
      success: false,
      message: 'Terms and conditions must be accepted'
    });
  }
  
  // Simulate payment processing
  const orderId = `order_${Date.now()}`;
  
  res.json({
    success: true,
    orderId,
    message: 'Payment processed successfully',
    campaignStatus: 'active',
    confirmationEmail: personalInfo.email
  });
});

// Additional REST endpoints for direct data access
app.get('/api/mls_providers', (req, res) => {
  res.json(db.mls_providers);
});

app.get('/api/agents', (req, res) => {
  res.json(db.agents);
});

app.get('/api/listings', (req, res) => {
  res.json(db.listings);
});

app.get('/api/packages', (req, res) => {
  res.json(db.packages);
});

app.get('/api/campaign_durations', (req, res) => {
  res.json(db.campaign_durations);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Mock Server is running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${path.join(__dirname, 'db.json')}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});
