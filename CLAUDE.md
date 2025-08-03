# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack & Architecture

- **Frontend**: Next.js 14 with TypeScript, App Router
- **Styling**: Tailwind CSS (v4.1.11)
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Icons**: Lucide React

## Development Commands

```bash
# Development
npm run dev          # Start Next.js dev server on localhost:3000
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Environment Setup
# Create .env.local with:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Architecture

### Core Tables
- `profiles`: User profiles (id, username, full_name, avatar_url, bio)
- `posts`: Daily insights (id, user_id, content, link_url, image_url, votes, created_at)
- `votes`: User votes on posts (id, user_id, post_id, created_at)
- `comments`: Comments on posts (id, post_id, user_id, content, created_at)

### Key Features
- **Daily post limit**: 1 post per user per day via `can_user_post_today()` function
- **Vote limit**: 5 votes per user per day via `get_user_votes_today()` function
- **Daily leaderboards**: Auto-resetting views (`daily_leaderboard`, `user_rankings`)
- **Real-time updates**: Supabase real-time subscriptions for live data

### Database Views
- `daily_leaderboard`: Top 10 posts of the day with rankings
- `user_rankings`: Top 10 users by votes received today

## Code Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page with leaderboards
│   ├── profile/[username]/page.tsx  # User profile pages
│   └── auth/callback/route.ts       # Auth callback handler
├── components/
│   ├── auth/              # Auth components (sign-in, sign-up, auth-modal)
│   ├── header.tsx         # Main navigation header
│   ├── home-page.tsx      # Main app interface
│   ├── leaderboard.tsx    # Daily leaderboard component
│   ├── post-card.tsx      # Individual post display
│   └── post-form.tsx      # New post creation form
├── lib/
│   ├── supabase.ts        # Supabase client configuration
│   └── auth.ts           # Authentication utilities
└── types/
    └── database.ts       # TypeScript database schema types
```

## Key Patterns

### Authentication
- Uses Supabase Auth with social providers
- Profiles auto-created on signup via PostgreSQL trigger
- RLS policies enforce user permissions

### Data Flow
- Real-time subscriptions for leaderboards and posts
- Optimistic updates for voting
- Automatic daily reset via PostgreSQL functions

### Database Functions
- `can_user_post_today(user_uuid)`: Returns boolean for daily post eligibility
- `get_user_votes_today(user_uuid)`: Returns count of votes used today
- Triggers auto-update vote counts and timestamps

## Environment Setup

1. **Create Supabase project** and run `supabase-schema.sql`
2. **Configure environment variables** in `.env.local`
3. **Install dependencies**: `npm install`
4. **Start development**: `npm run dev`

## Deployment

Ready for Vercel deployment with:
```bash
npx vercel deploy
```

The app includes proper build configuration and environment variable handling for production deployment.