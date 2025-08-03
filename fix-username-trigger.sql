-- Function to generate unique username
CREATE OR REPLACE FUNCTION generate_unique_username(base_username TEXT)
RETURNS TEXT AS $$
DECLARE
  new_username TEXT;
  counter INTEGER := 0;
  suffix TEXT;
BEGIN
  new_username := base_username;
  
  -- Ensure username is not too long and remove invalid characters
  new_username := regexp_replace(lower(new_username), '[^a-z0-9_.-]', '', 'g');
  new_username := left(new_username, 20);
  
  -- Handle empty username
  IF new_username IS NULL OR new_username = '' THEN
    new_username := 'user';
  END IF;
  
  WHILE EXISTS (SELECT 1 FROM profiles WHERE username = new_username) LOOP
    counter := counter + 1;
    suffix := '_' || counter;
    new_username := left(new_username, 20 - length(suffix)) || suffix;
  END LOOP;
  
  RETURN new_username;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

-- Create user profile on signup with proper username handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
BEGIN
  -- Generate base username
  base_username := COALESCE(
    new.raw_user_meta_data->>'username',
    CASE 
      WHEN new.email IS NOT NULL AND new.email LIKE '%@%' THEN 
        SUBSTRING(new.email FROM 1 FOR POSITION('@' IN new.email) - 1)
      ELSE 
        'user'
    END
  );
  
  -- Generate unique username
  final_username := generate_unique_username(base_username);
  
  INSERT INTO profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    final_username,
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      SUBSTRING(new.email FROM 1 FOR POSITION('@' IN new.email) - 1)
    ),
    COALESCE(
      new.raw_user_meta_data->>'avatar_url',
      new.raw_user_meta_data->>'picture'
    )
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();