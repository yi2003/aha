-- Test data for Aha app
-- Insert test profiles
INSERT INTO profiles (id, username, full_name, avatar_url, bio) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'alice_dev', 'Alice Johnson', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150', 'Frontend developer passionate about React and TypeScript'),
('550e8400-e29b-41d4-a716-446655440002', 'bob_tech', 'Bob Smith', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', 'Full-stack engineer exploring Next.js 14'),
('550e8400-e29b-41d4-a716-446655440003', 'carla_design', 'Carla Martinez', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', 'UI/UX designer learning to code');

-- Insert test posts
INSERT INTO posts (id, user_id, content, link_url, votes, created_at) VALUES
('post-001', '550e8400-e29b-41d4-a716-446655440001', 'Just discovered that React Server Components can significantly improve performance by reducing bundle size. The key insight is moving component logic to the server where possible!', 'https://react.dev/blog/2023/03/22/react-server-components', 42, NOW() - INTERVAL '2 hours'),
('post-002', '550e8400-e29b-41d4-a716-446655440002', 'Tailwind CSS v4 introduces CSS variables for theming, making it much easier to implement dark mode. The @reference directive is a game changer!', 'https://tailwindcss.com/blog/tailwindcss-v4-alpha', 28, NOW() - INTERVAL '4 hours'),
('post-003', '550e8400-e29b-41d4-a716-446655440003', 'Learning that accessibility isn''t just about screen readers - keyboard navigation is equally important. The tab order can make or break user experience!', 'https://web.dev/accessibility/', 35, NOW() - INTERVAL '6 hours'),
('post-004', '550e8400-e29b-41d4-a716-446655440001', 'PostgreSQL''s JSONB columns are incredibly powerful for semi-structured data. Perfect for user preferences without needing separate tables!', 'https://www.postgresql.org/docs/current/datatype-json.html', 19, NOW() - INTERVAL '8 hours'),
('post-005', '550e8400-e29b-41d4-a716-446655440002', 'The new App Router in Next.js 14 makes nested layouts so much cleaner. No more _app.js wrapper confusion!', 'https://nextjs.org/docs/app/building-your-application/routing', 31, NOW() - INTERVAL '12 hours');

-- Insert some test votes
INSERT INTO votes (user_id, post_id, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440002', 'post-001', NOW() - INTERVAL '1 hour'),
('550e8400-e29b-41d4-a716-446655440003', 'post-001', NOW() - INTERVAL '90 minutes'),
('550e8400-e29b-41d4-a716-446655440001', 'post-002', NOW() - INTERVAL '2 hours'),
('550e8400-e29b-41d4-a716-446655440003', 'post-002', NOW() - INTERVAL '150 minutes'),
('550e8400-e29b-41d4-a716-446655440001', 'post-003', NOW() - INTERVAL '3 hours'),
('550e8400-e29b-41d4-a716-446655440002', 'post-003', NOW() - INTERVAL '180 minutes'),
('550e8400-e29b-41d4-a716-446655440002', 'post-004', NOW() - INTERVAL '4 hours'),
('550e8400-e29b-41d4-a716-446655440003', 'post-004', NOW() - INTERVAL '5 hours'),
('550e8400-e29b-41d4-a716-446655440001', 'post-005', NOW() - INTERVAL '6 hours'),
('550e8400-e29b-41d4-a716-446655440003', 'post-005', NOW() - INTERVAL '7 hours');

-- Test query to verify data
SELECT 
  p.id,
  p.content,
  p.votes,
  pr.username,
  pr.full_name
FROM posts p
JOIN profiles pr ON p.user_id = pr.id
ORDER BY p.votes DESC;