# Aha - Gamified Knowledge Marketplace

A platform where users share one high-quality insight per day, with community voting and daily leaderboards determining the value of knowledge.

## Features

- **Daily Insights**: Share one valuable insight per day
- **Community Voting**: Upvote the best insights with a daily limit of 5 votes
- **Real-time Leaderboards**: Top posts and users reset daily
- **User Profiles**: Showcase your contribution history
- **Clean Design**: Professional, data-focused interface

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- Supabase account
- Vercel account (for deployment)

### Setup

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd aha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy `supabase-schema.sql` into the SQL editor in Supabase dashboard
   - Run the SQL to set up the database schema

4. **Configure environment variables**
   Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Deploy to Vercel**
   ```bash
   npx vercel deploy
   ```

## Database Schema

### Core Tables
- `profiles`: User profiles
- `posts`: Daily insights
- `votes`: User votes on posts
- `comments`: Comments on posts

### Key Features
- **One-post-per-day**: Enforced by `can_user_post_today()` function
- **Vote limits**: 5 votes per user per day via `get_user_votes_today()`
- **Daily leaderboards**: Auto-resetting views for posts and users
- **Real-time updates**: Supabase real-time subscriptions

## Usage

### For Users
1. **Sign up** with email/username or Google
2. **Share insights**: One high-quality post per day
3. **Vote wisely**: 5 votes daily to support best insights
4. **Engage**: Comment and discuss valuable posts

### For Developers
- **Authentication**: Ready-to-use auth with social providers
- **Real-time**: Live leaderboards and notifications
- **Scalable**: PostgreSQL with proper indexing
- **Secure**: Row-level security policies

## API Endpoints

- `GET /` - Home page with leaderboards
- `GET /profile/[username]` - User profile pages
- `POST /api/posts` - Create new posts (authenticated)
- `POST /api/votes` - Vote on posts (authenticated)
- `GET /api/leaderboard` - Current daily rankings

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open a GitHub issue or contact the development team.