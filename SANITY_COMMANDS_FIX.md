# Sanity Studio Commands - FIXED

## Problem
Multiple Sanity processes were running and conflicting with each other.

## Solution

### 1. Complete Login (currently in progress)
In your current terminal where the login prompt is showing:
- Use arrow keys to select your login method (Google, GitHub, or Email)
- Press Enter and complete the authentication

### 2. Start Sanity Studio
After successful login, run:
```bash
cd studio
npx sanity dev
```

### 3. Access Studio
Studio will be available at: http://localhost:3333

## Alternative Method (if you get stuck)

If the current login gets stuck, you can:
1. Press Ctrl+C to cancel current command
2. Clear any background processes:
   ```bash
   pkill -f sanity
   ```
3. Start fresh:
   ```bash
   cd studio
   npx sanity login
   npx sanity dev
   ```

## Verification
Once working, you should see:
- "Local server started on http://localhost:3333"
- Studio opens in your browser
- You can create/edit blog posts

## Project Details
- Project ID: 3prkr232
- Dataset: production
- Studio directory: ./studio/