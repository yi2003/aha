'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Header } from './header'
import { Leaderboard } from './leaderboard'
import { PostForm } from './post-form'
import { PostCard } from './post-card'
import { AuthModal } from './auth/auth-modal'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

interface ExtendedPost extends Post {
  profiles: Profile
}

export function HomePage() {
  const [posts, setPosts] = useState<ExtendedPost[]>([])
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'fresh' | 'post'>('leaderboard')

  useEffect(() => {
    checkUser()
    fetchPosts()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`*, profiles(*)`)
      .order('created_at', { ascending: false })

    if (!error) {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const handlePostCreated = () => {
    fetchPosts()
    setActiveTab('leaderboard')
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={user} 
        onAuthClick={() => setShowAuthModal(true)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="container py-8">
        {activeTab === 'leaderboard' && <Leaderboard />}
        
        {activeTab === 'fresh' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Fresh Posts</h2>
            {loading ? (
              <div className="text-center py-8">Loading posts...</div>
            ) : (
              posts.map((post) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  user={user}
                  onUpdate={fetchPosts}
                />
              ))
            )}
          </div>
        )}
        
        {activeTab === 'post' && (
          user ? (
            <PostForm onSuccess={handlePostCreated} userId={user.id} />
          ) : (
            <div className="text-center py-8">
              <p>Please sign in to create a post</p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                Sign In
              </button>
            </div>
          )
        )}
      </main>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  )
}