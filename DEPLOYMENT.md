# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

## Manual Deployment Steps

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Connect your GitHub/GitLab repository
   - Import the project

2. **Environment Variables (Optional)**
   - Add `DATABASE_URL` if you want to use PostgreSQL instead of in-memory storage
   - The app works out of the box with in-memory storage for demo purposes

3. **Build Settings**
   - Framework Preset: **Other**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy" - Vercel will automatically build and deploy your app

## Architecture

### Frontend
- React app built with Vite
- Serves static files from `dist/public`
- Uses wouter for client-side routing

### Backend
- Serverless functions in `/api`
- Express.js server handles API routes
- In-memory storage (can be upgraded to PostgreSQL)

### API Routes
- `POST /api/contacts` - Submit contact form
- `POST /api/bookings` - Create booking
- `GET /api/contacts` - List all contacts (admin)
- `GET /api/bookings` - List all bookings (admin)

## Local Development

```bash
npm install
npm run dev
```

The app will run on `http://localhost:5000` with hot reload enabled.

## Production Considerations

1. **Database**: Currently uses in-memory storage. For production, set `DATABASE_URL` to use PostgreSQL
2. **Persistence**: In-memory data is lost on serverless function cold starts
3. **Scaling**: Serverless functions automatically scale with traffic

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **API not working**: Verify `vercel.json` routes are correct
- **Functions timeout**: Check Vercel function limits and optimize code