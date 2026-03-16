# J.A.R.V.I.S — Personal AI Assistant

## Deploy to Vercel (5 minutes)

### Step 1 — Upload to GitHub
1. Go to github.com → New repository → name it `jarvis-assistant`
2. Upload all these files keeping the same folder structure:
   - `api/chat.js`
   - `public/index.html`
   - `vercel.json`
   - `package.json`

### Step 2 — Deploy on Vercel
1. Go to vercel.com → Sign up free with your GitHub account
2. Click "Add New Project" → Import your `jarvis-assistant` repo
3. Click Deploy (no build settings needed)

### Step 3 — Add your API Key
1. In Vercel dashboard → your project → Settings → Environment Variables
2. Add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from console.anthropic.com (starts with sk-ant-)
3. Click Save → then go to Deployments → click the 3 dots → Redeploy

### Step 4 — Open your Jarvis
Vercel gives you a URL like `https://jarvis-assistant-xyz.vercel.app`
Open it in any browser — voice works in Chrome/Edge.

## Features
- Voice input (Chrome/Edge) + text input
- Voice output (text-to-speech)
- Stock analysis with BUY/HOLD/SELL ratings
- Full app code generation
- Email drafting
- Calendar event creation
- Financial planning
- Remembers conversation context
