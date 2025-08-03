# Aha! - Daily Insights Social App

A modern social platform for sharing and discovering daily insights and "aha!" moments.

## Features

- **Daily Post Limit**: Share 1 insight per day to encourage quality over quantity
- **Vote System**: Give up to 5 votes per day to support great insights
- **Real-time Leaderboards**: Daily rankings for posts and users
- **User Profiles**: Customizable profiles with avatars and bios
- **Social Authentication**: Google and email sign-in options
- **Responsive Design**: Works seamlessly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and App Router
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Quick Start

1. **Clone and Install**:
   ```bash
   git clone [your-repo]
   cd aha
   npm install
   ```

2. **Environment Setup**:
   Copy `.env.local.example` to `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Database Setup**:
   Run the SQL schema in `supabase-schema.sql` in your Supabase dashboard

4. **Add Test Data** (Optional):
   ```bash
   # Run the test data SQL
   psql -h your-supabase-host -U your-user -d your-db -f test-data.sql
   ```

5. **Start Development**:
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

## Database Schema

### Core Tables
- `profiles`: User profiles and metadata
- `posts`: Daily insights with content and links
- `votes`: User votes on posts (limited to 5/day)
- `comments`: Post comments (future feature)

### Key Features
- Daily post limit via `can_user_post_today()` function
- Vote tracking with `get_user_votes_today()` function
- Auto-resetting daily leaderboards
- Real-time subscriptions for live updates

## API Routes

- `/api/auth/callback` - Authentication callback handler
- `/profile/[username]` - User profile pages
- `/` - Main leaderboard and fresh posts

## Daily Limits

- **Posts**: 1 per user per day
- **Votes**: 5 per user per day
- **Leaderboards**: Reset daily at midnight UTC

## Deployment

Ready for Vercel deployment:
```bash
npx vercel deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details