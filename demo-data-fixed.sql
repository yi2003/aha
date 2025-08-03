-- Demo data for Aha! app - Complete regenerated script
-- Run this SQL in your Supabase dashboard to populate demo data

-- Begin transaction to ensure data integrity
BEGIN;

-- Temporarily disable the trigger to avoid automatic profile creation conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Clear existing demo data to avoid conflicts
DELETE FROM votes WHERE user_id::text LIKE '550e8400%';
DELETE FROM posts WHERE user_id::text LIKE '550e8400%';
DELETE FROM profiles WHERE id::text LIKE '550e8400%';
DELETE FROM auth.users WHERE id::text LIKE '550e8400%';

-- Insert demo users into auth.users with proper metadata
INSERT INTO auth.users (id, email, email_confirmed_at, created_at, raw_user_meta_data) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'sarah@example.com', NOW(), NOW() - INTERVAL '15 days', '{"username": "sarah_coder", "full_name": "Sarah Chen"}'),
('550e8400-e29b-41d4-a716-446655440002', 'mike@example.com', NOW(), NOW() - INTERVAL '10 days', '{"username": "mike_devops", "full_name": "Mike Rodriguez"}'),
('550e8400-e29b-41d4-a716-446655440003', 'lisa@example.com', NOW(), NOW() - INTERVAL '8 days', '{"username": "lisa_design", "full_name": "Lisa Park"}'),
('550e8400-e29b-41d4-a716-446655440004', 'alex@example.com', NOW(), NOW() - INTERVAL '5 days', '{"username": "alex_backend", "full_name": "Alex Kumar"}'),
('550e8400-e29b-41d4-a716-446655440005', 'emma@example.com', NOW(), NOW() - INTERVAL '3 days', '{"username": "emma_mobile", "full_name": "Emma Thompson"}');

-- Insert demo profiles
INSERT INTO profiles (id, username, full_name, avatar_url, bio, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'sarah_coder', 'Sarah Chen', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'Senior frontend engineer | React enthusiast | Accessibility advocate', NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655440002', 'mike_devops', 'Mike Rodriguez', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'DevOps wizard | Cloud architect | Making infrastructure invisible', NOW() - INTERVAL '10 days'),
('550e8400-e29b-41d4-a716-446655440003', 'lisa_design', 'Lisa Park', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'UX designer turned full-stack | Design systems & user experience', NOW() - INTERVAL '8 days'),
('550e8400-e29b-41d4-a716-446655440004', 'alex_backend', 'Alex Kumar', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Backend specialist | PostgreSQL & Redis | Performance optimization', NOW() - INTERVAL '5 days'),
('550e8400-e29b-41d4-a716-446655440005', 'emma_mobile', 'Emma Thompson', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 'Mobile developer | React Native & Flutter | Cross-platform enthusiast', NOW() - INTERVAL '3 days');

-- Insert demo posts with consistent structure
INSERT INTO posts (id, user_id, content, link_url, image_url, votes, created_at) VALUES
('11111111-1111-1111-1111-111111111111', '550e8400-e29b-41d4-a716-446655440001', '🔥 Just discovered that React Server Components can reduce bundle size by 70%! The key insight: move data fetching and heavy logic to the server. Our app went from 2.3MB to 680KB. Mind blown!', 'https://react.dev/blog/2023/03/22/react-server-components', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 89, NOW() - INTERVAL '30 minutes'),
('22222222-2222-2222-2222-222222222222', '550e8400-e29b-41d4-a716-446655440002', '💡 DevOps revelation: Infrastructure as Code isn''t just about automation - it''s about creating reproducible environments. Used Terraform to spin up identical staging environments in 3 minutes instead of 3 hours!', 'https://www.terraform.io/intro', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop', 67, NOW() - INTERVAL '2 hours'),
('33333333-3333-3333-3333-333333333333', '550e8400-e29b-41d4-a716-446655440003', '🎨 Design systems insight: The best component libraries aren''t built by designers OR developers alone - they''re built by teams that speak both languages. Started using Figma variables to sync design tokens directly with code!', 'https://www.figma.com/blog/introducing-variables-in-figma/', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop', 54, NOW() - INTERVAL '4 hours'),
('44444444-4444-4444-4444-444444444444', '550e8400-e29b-41d4-a716-446655440004', '🚀 PostgreSQL JSONB is a hidden gem! Instead of adding new columns for user preferences, I created a single JSONB field. Query performance is surprisingly good with proper indexes. Schema evolution without migrations!', 'https://www.postgresql.org/docs/current/datatype-json.html', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop', 43, NOW() - INTERVAL '6 hours'),
('55555555-5555-5555-5555-555555555555', '550e8400-e29b-41d4-a716-446655440005', '📱 React Native performance tip: useMemo and useCallback aren''t always the answer! Sometimes the overhead outweighs the benefits. Profile first, optimize second. Saved 200ms startup time by removing unnecessary memoization!', 'https://reactnative.dev/docs/performance', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop', 38, NOW() - INTERVAL '8 hours'),
('66666666-6666-6666-6666-666666666666', '550e8400-e29b-41d4-a716-446655440001', '⚡ CSS Grid + Flexbox combo is unstoppable! Finally understood when to use each: Grid for 2D layouts, Flexbox for 1D distribution. My responsive layouts have never been cleaner.', 'https://css-tricks.com/snippets/css/complete-guide-grid/', NULL, 31, NOW() - INTERVAL '10 hours'),
('77777777-7777-7777-7777-777777777777', '550e8400-e29b-41d4-a716-446655440002', '🐳 Docker multi-stage builds are a game changer! Separated build and runtime stages reduced our image size from 1.2GB to 89MB. Alpine Linux + proper layer caching = lightning fast deployments.', 'https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/', NULL, 27, NOW() - INTERVAL '12 hours');

-- Insert demo votes with unique constraints
INSERT INTO votes (user_id, post_id, created_at) VALUES
-- Post 1 votes (4 votes)
('550e8400-e29b-41d4-a716-446655440002', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '25 minutes'),
('550e8400-e29b-41d4-a716-446655440003', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '28 minutes'),
('550e8400-e29b-41d4-a716-446655440004', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '30 minutes'),
('550e8400-e29b-41d4-a716-446655440005', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '32 minutes'),
-- Post 2 votes (3 votes)
('550e8400-e29b-41d4-a716-446655440001', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '90 minutes'),
('550e8400-e29b-41d4-a716-446655440003', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '100 minutes'),
('550e8400-e29b-41d4-a716-446655440004', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '110 minutes'),
-- Post 3 votes (3 votes)
('550e8400-e29b-41d4-a716-446655440001', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '3 hours'),
('550e8400-e29b-41d4-a716-446655440002', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '3.5 hours'),
('550e8400-e29b-41d4-a716-446655440005', '33333333-3333-3333-3333-333333333333', NOW() - INTERVAL '4 hours'),
-- Post 4 votes (2 votes)
('550e8400-e29b-41d4-a716-446655440001', '44444444-4444-4444-4444-444444444444', NOW() - INTERVAL '5 hours'),
('550e8400-e29b-41d4-a716-446655440002', '44444444-4444-4444-4444-444444444444', NOW() - INTERVAL '5.5 hours'),
-- Post 5 votes (2 votes)
('550e8400-e29b-41d4-a716-446655440001', '55555555-5555-5555-5555-555555555555', NOW() - INTERVAL '7 hours'),
('550e8400-e29b-41d4-a716-446655440002', '55555555-5555-5555-5555-555555555555', NOW() - INTERVAL '7.5 hours'),
-- Post 6 votes (2 votes)
('550e8400-e29b-41d4-a716-446655440002', '66666666-6666-6666-6666-666666666666', NOW() - INTERVAL '9 hours'),
('550e8400-e29b-41d4-a716-446655440003', '66666666-6666-6666-6666-666666666666', NOW() - INTERVAL '9.5 hours'),
-- Post 7 votes (2 votes)
('550e8400-e29b-41d4-a716-446655440001', '77777777-7777-7777-7777-777777777777', NOW() - INTERVAL '11 hours'),
('550e8400-e29b-41d4-a716-446655440003', '77777777-7777-7777-7777-777777777777', NOW() - INTERVAL '11.5 hours');

-- Re-enable the trigger for future user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Verify demo data insertion
SELECT 'Demo data inserted successfully!' as status;
SELECT 'Total profiles: ' || (SELECT COUNT(*) FROM profiles WHERE id::text LIKE '550e8400%');
SELECT 'Total posts: ' || (SELECT COUNT(*) FROM posts WHERE id::text LIKE '11111111%');
SELECT 'Total votes: ' || (SELECT COUNT(*) FROM votes WHERE user_id::text LIKE '550e8400%');

-- Show demo leaderboard
SELECT 
  p.votes,
  LEFT(p.content, 100) || '...' as preview,
  pr.username,
  pr.full_name,
  p.created_at
FROM posts p
JOIN profiles pr ON p.user_id = pr.id
WHERE p.user_id::text LIKE '550e8400%'
ORDER BY p.votes DESC, p.created_at ASC
LIMIT 5;

-- Commit the transaction
COMMIT;