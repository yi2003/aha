-- Demo data for Aha! app - ready for production display
-- Run this SQL in your Supabase dashboard to populate demo data

-- Insert demo profiles
INSERT INTO profiles (id, username, full_name, avatar_url, bio, created_at) VALUES
('demo-user-1', 'sarah_coder', 'Sarah Chen', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'Senior frontend engineer | React enthusiast | Accessibility advocate', NOW() - INTERVAL '15 days'),
('demo-user-2', 'mike_devops', 'Mike Rodriguez', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'DevOps wizard | Cloud architect | Making infrastructure invisible', NOW() - INTERVAL '10 days'),
('demo-user-3', 'lisa_design', 'Lisa Park', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'UX designer turned full-stack | Design systems & user experience', NOW() - INTERVAL '8 days'),
('demo-user-4', 'alex_backend', 'Alex Kumar', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Backend specialist | PostgreSQL & Redis | Performance optimization', NOW() - INTERVAL '5 days'),
('demo-user-5', 'emma_mobile', 'Emma Thompson', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 'Mobile developer | React Native & Flutter | Cross-platform enthusiast', NOW() - INTERVAL '3 days');

-- Insert demo posts with realistic insights
INSERT INTO posts (id, user_id, content, link_url, image_url, votes, created_at) VALUES
('demo-post-1', 'demo-user-1', '🔥 Just discovered that React Server Components can reduce bundle size by 70%! The key insight: move data fetching and heavy logic to the server. Our app went from 2.3MB to 680KB. Mind blown!', 'https://react.dev/blog/2023/03/22/react-server-components', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 89, NOW() - INTERVAL '30 minutes'),
('demo-post-2', 'demo-user-2', '💡 DevOps revelation: Infrastructure as Code isn''t just about automation - it''s about creating reproducible environments. Used Terraform to spin up identical staging environments in 3 minutes instead of 3 hours!', 'https://www.terraform.io/intro', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop', 67, NOW() - INTERVAL '2 hours'),
('demo-post-3', 'demo-user-3', '🎨 Design systems insight: The best component libraries aren''t built by designers OR developers alone - they''re built by teams that speak both languages. Started using Figma variables to sync design tokens directly with code!', 'https://www.figma.com/blog/introducing-variables-in-figma/', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop', 54, NOW() - INTERVAL '4 hours'),
('demo-post-4', 'demo-user-4', '🚀 PostgreSQL JSONB is a hidden gem! Instead of adding new columns for user preferences, I created a single JSONB field. Query performance is surprisingly good with proper indexes. Schema evolution without migrations!', 'https://www.postgresql.org/docs/current/datatype-json.html', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop', 43, NOW() - INTERVAL '6 hours'),
('demo-post-5', 'demo-user-5', '📱 React Native performance tip: useMemo and useCallback aren''t always the answer! Sometimes the overhead outweighs the benefits. Profile first, optimize second. Saved 200ms startup time by removing unnecessary memoization!', 'https://reactnative.dev/docs/performance', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop', 38, NOW() - INTERVAL '8 hours'),
('demo-post-6', 'demo-user-1', '⚡ CSS Grid + Flexbox combo is unstoppable! Finally understood when to use each: Grid for 2D layouts, Flexbox for 1D distribution. My responsive layouts have never been cleaner.', 'https://css-tricks.com/snippets/css/complete-guide-grid/', 31, NOW() - INTERVAL '10 hours'),
('demo-post-7', 'demo-user-2', '🐳 Docker multi-stage builds are a game changer! Separated build and runtime stages reduced our image size from 1.2GB to 89MB. Alpine Linux + proper layer caching = lightning fast deployments.', 'https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/', 27, NOW() - INTERVAL '12 hours');

-- Insert demo votes to create realistic engagement
INSERT INTO votes (user_id, post_id, created_at) VALUES
-- Post 1 (89 votes)
('demo-user-2', 'demo-post-1', NOW() - INTERVAL '25 minutes'),
('demo-user-3', 'demo-post-1', NOW() - INTERVAL '28 minutes'),
('demo-user-4', 'demo-post-1', NOW() - INTERVAL '30 minutes'),
('demo-user-5', 'demo-post-1', NOW() - INTERVAL '32 minutes'),
('demo-user-2', 'demo-post-1', NOW() - INTERVAL '35 minutes'),
-- Post 2 (67 votes)
('demo-user-1', 'demo-post-2', NOW() - INTERVAL '90 minutes'),
('demo-user-3', 'demo-post-2', NOW() - INTERVAL '100 minutes'),
('demo-user-4', 'demo-post-2', NOW() - INTERVAL '110 minutes'),
('demo-user-5', 'demo-post-2', NOW() - INTERVAL '115 minutes'),
-- Post 3 (54 votes)
('demo-user-1', 'demo-post-3', NOW() - INTERVAL '180 minutes'),
('demo-user-2', 'demo-post-3', NOW() - INTERVAL '200 minutes'),
('demo-user-4', 'demo-post-3', NOW() - INTERVAL '210 minutes'),
('demo-user-5', 'demo-post-3', NOW() - INTERVAL '220 minutes'),
-- Post 4 (43 votes)
('demo-user-1', 'demo-post-4', NOW() - INTERVAL '300 minutes'),
('demo-user-2', 'demo-post-4', NOW() - INTERVAL '320 minutes'),
('demo-user-3', 'demo-post-4', NOW() - INTERVAL '340 minutes'),
('demo-user-5', 'demo-post-4', NOW() - INTERVAL '350 minutes'),
-- Post 5 (38 votes)
('demo-user-1', 'demo-post-5', NOW() - INTERVAL '400 minutes'),
('demo-user-2', 'demo-post-5', NOW() - INTERVAL '420 minutes'),
('demo-user-3', 'demo-post-5', NOW() - INTERVAL '440 minutes'),
('demo-user-4', 'demo-post-5', NOW() - INTERVAL '460 minutes'),
-- Post 6 (31 votes)
('demo-user-2', 'demo-post-6', NOW() - INTERVAL '550 minutes'),
('demo-user-3', 'demo-post-6', NOW() - INTERVAL '580 minutes'),
('demo-user-4', 'demo-post-6', NOW() - INTERVAL '600 minutes'),
-- Post 7 (27 votes)
('demo-user-1', 'demo-post-7', NOW() - INTERVAL '650 minutes'),
('demo-user-3', 'demo-post-7', NOW() - INTERVAL '680 minutes'),
('demo-user-4', 'demo-post-7', NOW() - INTERVAL '700 minutes'),
('demo-user-5', 'demo-post-7', NOW() - INTERVAL '720 minutes');

-- Verify demo data
SELECT 'Demo data inserted successfully!' as status;
SELECT 'Total users: ' || (SELECT COUNT(*) FROM profiles WHERE id LIKE 'demo-user-%');
SELECT 'Total posts: ' || (SELECT COUNT(*) FROM posts WHERE id LIKE 'demo-post-%');
SELECT 'Total votes: ' || (SELECT COUNT(*) FROM votes WHERE user_id LIKE 'demo-user-%');

-- Show top 3 posts
SELECT 
  p.votes,
  p.content,
  pr.username,
  pr.full_name,
  p.created_at
FROM posts p
JOIN profiles pr ON p.user_id = pr.id
WHERE p.id LIKE 'demo-post-%'
ORDER BY p.votes DESC
LIMIT 3;