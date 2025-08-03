// Test data for Aha app
const testData = {
  profiles: [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      username: 'alice_dev',
      full_name: 'Alice Johnson',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      bio: 'Frontend developer passionate about React and TypeScript'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      username: 'bob_tech',
      full_name: 'Bob Smith',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Full-stack engineer exploring Next.js 14'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      username: 'carla_design',
      full_name: 'Carla Martinez',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      bio: 'UI/UX designer learning to code'
    }
  ],
  
  posts: [
    {
      id: 'post-001',
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      content: 'Just discovered that React Server Components can significantly improve performance by reducing bundle size. The key insight is moving component logic to the server where possible!',
      link_url: 'https://react.dev/blog/2023/03/22/react-server-components',
      votes: 42,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      id: 'post-002',
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      content: 'Tailwind CSS v4 introduces CSS variables for theming, making it much easier to implement dark mode. The @reference directive is a game changer!',
      link_url: 'https://tailwindcss.com/blog/tailwindcss-v4-alpha',
      votes: 28,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    {
      id: 'post-003',
      user_id: '550e8400-e29b-41d4-a716-446655440003',
      content: 'Learning that accessibility isn\'t just about screen readers - keyboard navigation is equally important. The tab order can make or break user experience!',
      link_url: 'https://web.dev/accessibility/',
      votes: 35,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    },
    {
      id: 'post-004',
      user_id: '550e8400-e29b-41d4-a716-446655440001',
      content: 'PostgreSQL\'s JSONB columns are incredibly powerful for semi-structured data. Perfect for user preferences without needing separate tables!',
      link_url: 'https://www.postgresql.org/docs/current/datatype-json.html',
      votes: 19,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
    },
    {
      id: 'post-005',
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      content: 'The new App Router in Next.js 14 makes nested layouts so much cleaner. No more _app.js wrapper confusion!',
      link_url: 'https://nextjs.org/docs/app/building-your-application/routing',
      votes: 31,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    }
  ]
};

// Export test data
console.log('Test data created for Aha app!');
console.log('Profiles:', testData.profiles.length);
console.log('Posts:', testData.posts.length);

// Export for use in other files
module.exports = testData;