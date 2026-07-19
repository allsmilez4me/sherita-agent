# Sherita Grinter — Career Agent

An AI-powered career agent that lets recruiters and hiring managers learn about Sherita Grinter's background, AI certifications, business impact, leadership, and why she belongs on their team.

## Deploy to Vercel (5 minutes)

### Step 1 — Get an Anthropic API key
1. Go to console.anthropic.com
2. Sign up or log in
3. Go to API Keys and create a new key
4. Copy the key — you will only see it once

### Step 2 — Push to GitHub
1. Create a new repository on github.com (can be private)
2. Upload all files from this folder into the repository
3. Commit and push

### Step 3 — Deploy on Vercel
1. Go to vercel.com and sign up with your GitHub account
2. Click "Add New Project"
3. Import your GitHub repository
4. Before clicking Deploy, click "Environment Variables"
5. Add one variable:
   - Name: ANTHROPIC_API_KEY
   - Value: paste your key from Step 1
6. Click Deploy

### Step 4 — Get your URL
Vercel will give you a URL like sherita-agent.vercel.app
That is the link you send to recruiters and hiring managers.

## Run Locally

```bash
npm install
cp .env.example .env.local
# Edit .env.local and add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000

## How it works

- The front end (pages/index.js) sends questions to /api/chat
- The API route (pages/api/chat.js) holds the system prompt and calls Anthropic
- The API key never touches the browser — it lives only in the server environment
- Built with Next.js 14, zero external dependencies beyond React and Next
