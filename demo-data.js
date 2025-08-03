// Demo data for Aha! app - with proper UUIDs for Supabase
const demoData = {
  // Demo profiles with proper UUIDs
  profiles: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      username: 'sarah_coder',
      full_name: 'Sarah Chen',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Senior frontend engineer | React enthusiast | Accessibility advocate',
      created_at: new Date('2024-01-15').toISOString()
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      username: 'mike_devops',
      full_name: 'Mike Rodriguez',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'DevOps wizard | Cloud architect | Making infrastructure invisible',
      created_at: new Date('2024-01-10').toISOString()
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      username: 'lisa_design',
      full_name: 'Lisa Park',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      bio: 'UX designer turned full-stack | Design systems & user experience',
      created_at: new Date('2024-01-08').toISOString()
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      username: 'alex_backend',
      full_name: 'Alex Kumar',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Backend specialist | PostgreSQL & Redis | Performance optimization',
      created_at: new Date('2024-01-05').toISOString()
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      username: 'emma_mobile',
      full_name: 'Emma Thompson',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      bio: 'Mobile developer | React Native & Flutter | Cross-platform enthusiast',
      created_at: new Date('2024-01-03').toISOString()
    }
  ],

  // Demo posts with trending insights
  posts: [
    {
      id: 'demo-post-1',
      user_id: 'demo-user-1',
      content: '🔥 Just discovered that React Server Components can reduce bundle size by 70%! The key insight: move data fetching and heavy logic to the server. Our app went from 2.3MB to 680KB. Mind blown!',
      link_url: 'https://react.dev/blog/2023/03/22/react-server-components',
      image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      votes: 89,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      profiles: {
        id: 'demo-user-1',
        username: 'sarah_coder',
        full_name: 'Sarah Chen',
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 'demo-post-2',
      user_id: 'demo-user-2',
      content: '💡 DevOps revelation: Infrastructure as Code isn\'t just about automation - it\'s about creating reproducible environments. Used Terraform to spin up identical staging environments in 3 minutes instead of 3 hours!',
      link_url: 'https://www.terraform.io/intro',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      votes: 67,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      profiles: {
        id: 'demo-user-2',
        username: 'mike_devops',
        full_name: 'Mike Rodriguez',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 'demo-post-3',
      user_id: 'demo-user-3',
      content: '🎨 Design systems insight: The best component libraries aren\'t built by designers OR developers alone - they\'re built by teams that speak both languages. Started using Figma variables to sync design tokens directly with code!',
      link_url: 'https://www.figma.com/blog/introducing-variables-in-figma/',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      votes: 54,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
      profiles: {
        id: 'demo-user-3',
        username: 'lisa_design',
        full_name: 'Lisa Park',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 'demo-post-4',
      user_id: 'demo-user-4',
      content: '🚀 PostgreSQL JSONB is a hidden gem! Instead of adding new columns for user preferences, I created a single JSONB field. Query performance is surprisingly good with proper indexes. Schema evolution without migrations!',
      link_url: 'https://www.postgresql.org/docs/current/datatype-json.html',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      votes: 43,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
      profiles: {
        id: 'demo-user-4',
        username: 'alex_backend',
        full_name: 'Alex Kumar',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 'demo-post-5',
      user_id: 'demo-user-5',
      content: '📱 React Native performance tip: useMemo and useCallback aren\'t always the answer! Sometimes the overhead outweighs the benefits. Profile first, optimize second. Saved 200ms startup time by removing unnecessary memoization!',
      link_url: 'https://reactnative.dev/docs/performance',
      image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
      votes: 38,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
      profiles: {
        id: 'demo-user-5',
        username: 'emma_mobile',
        full_name: 'Emma Thompson',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 'demo-post-6',
      user_id: 'demo-user-1',
      content: '⚡ CSS Grid + Flexbox combo is unstoppable! Finally understood when to use each: Grid for 2D layouts, Flexbox for 1D distribution. My responsive layouts have never been cleaner.',
      link_url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
      votes: 31,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(), // 10 hours ago
      profiles: {
        id: 'demo-user-1',
        username: 'sarah_coder',
        full_name: 'Sarah Chen',
        avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 'demo-post-7',
      user_id: 'demo-user-2',
      content: '🐳 Docker multi-stage builds are a game changer! Separated build and runtime stages reduced our image size from 1.2GB to 89MB. Alpine Linux + proper layer caching = lightning fast deployments.',
      link_url: 'https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/',
      votes: 27,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
      profiles: {
        id: 'demo-user-2',
        username: 'mike_devops',
        full_name: 'Mike Rodriguez',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    }
  ],

  // Demo leaderboard data
  leaderboard: {
    posts: [
      { rank: 1, post_id: 'demo-post-1', content: 'React Server Components reduce bundle size by 70%...', votes: 89, username: 'sarah_coder', user_id: 'demo-user-1' },
      { rank: 2, post_id: 'demo-post-2', content: 'Infrastructure as Code isn\'t just automation...', votes: 67, username: 'mike_devops', user_id: 'demo-user-2' },
      { rank: 3, post_id: 'demo-post-3', content: 'Design systems built by bilingual teams...', votes: 54, username: 'lisa_design', user_id: 'demo-user-3' },
      { rank: 4, post_id: 'demo-post-4', content: 'PostgreSQL JSONB is a hidden gem...', votes: 43, username: 'alex_backend', user_id: 'demo-user-4' },
      { rank: 5, post_id: 'demo-post-5', content: 'React Native performance optimization...', votes: 38, username: 'emma_mobile', user_id: 'demo-user-5' }
    ],
    users: [
      { rank: 1, username: 'sarah_coder', total_votes_received: 120, post_count: 2, user_id: 'demo-user-1' },
      { rank: 2, username: 'mike_devops', total_votes_received: 94, post_count: 2, user_id: 'demo-user-2' },
      { rank: 3, username: 'lisa_design', total_votes_received: 54, post_count: 1, user_id: 'demo-user-3' },
      { rank: 4, username: 'alex_backend', total_votes_received: 43, post_count: 1, user_id: 'demo-user-4' },
      { rank: 5, username: 'emma_mobile', total_votes_received: 38, post_count: 1, user_id: 'demo-user-5' }
    ]
  },

  // Demo stats
  stats: {
    totalUsers: 5,
    totalPosts: 7,
    totalVotes: 120 + 94 + 54 + 43 + 38,
    dailyActiveUsers: 5,
    trendingTopics: ['React', 'Performance', 'DevOps', 'Design Systems', 'PostgreSQL']
  }
};

// Export for immediate use
export default demoData;

// Quick usage example:
// import demoData from './demo-data';
// console.log('Demo users:', demoData.profiles.length);
// console.log('Demo posts:', demoData.posts.length);