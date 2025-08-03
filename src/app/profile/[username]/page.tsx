import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from 'lucide-react'
import { PostCard } from '@/components/post-card'

interface ProfileProps {
  params: Promise<{
    username: string
  }>
}

export default async function ProfilePage({ params }: ProfileProps) {
  const { username } = await params
  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) {
    notFound()
  }

  // Fetch user's posts
  const { data: posts } = await supabase
    .from('posts')
    .select(`*, profiles(*)`)
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false })

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.username}</h1>
              {profile.full_name && (
                <p className="text-muted-foreground">{profile.full_name}</p>
              )}
              {profile.bio && (
                <p className="mt-2 text-foreground">{profile.bio}</p>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex space-x-6 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">{posts?.length || 0}</span> posts
            </div>
            <div>
              <span className="font-medium text-foreground">
                {posts?.reduce((sum, post) => sum + post.votes, 0) || 0}
              </span> total votes
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
          {posts && posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  user={null} 
                  onUpdate={() => {}} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No posts yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}