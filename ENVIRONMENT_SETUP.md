# Environment Variables Setup

This document outlines the required environment variables for the Investing.com clone project.

## Required Environment Variables

### Database
- `MONGODB_URI`: MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

### Authentication (JWT)
- `JWT_SECRET`: Secret key for signing JWT tokens (use a strong, random string)
  - **Your JWT Secret**: `alamsfdfsdsdfsdfsdfsdfsdfsdrafdar!@#$0fddlfjdfdfdssfds`
- `JWT_EXPIRES_IN`: Token expiration time (default: "7d")

### API Configuration
- `NEXT_PUBLIC_BASE_URL`: Base URL for API calls
  - Development: `http://localhost:3000`
  - Production: Your deployed URL

### Live Data APIs
- `COINGECKO_API_KEY`: CoinGecko API key for cryptocurrency data
  - **Your API Key**: `CryptonewsCG-T9g9UiueJgsnntj758KkEo9wuse`

## Setup Instructions

### For Local Development
1. Copy `.env.example` to `.env.local`
2. Fill in the actual values for each variable
3. Restart your development server

### For Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with the appropriate values for Production, Preview, and Development environments

## Security Notes
- Never commit actual environment variables to version control
- Use strong, unique secrets for JWT_SECRET
- Rotate API keys regularly
- Use different database instances for development and production
