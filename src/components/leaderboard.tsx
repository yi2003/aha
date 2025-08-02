'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowUp, Award, User } from 'lucide-react'

interface LeaderboardData {
  post_id: string
  user_id: string
  content: string
  votes: number
  rank: number
  username: string
  avatar_url: string | null
}

interface UserRanking {
  user_id: string
  username: string
  total_votes_received: number
  post_count: number
  rank: number
  avatar_url: string | null
}

export function Leaderboard() {
  const [posts, setPosts] = useState<LeaderboardData[]>([])
  const [users, setUsers] = useState<UserRanking[]>([])
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    setLoading(true)
    
    // Fetch daily leaderboard
    const { data: postsData, error: postsError } = await supabase
      .from('daily_leaderboard')
      .select('*')
      .order('rank')

    if (!postsError) {
      setPosts(postsData || [])
    }

    // Fetch user rankings
    const { data: usersData, error: usersError } = await supabase
      .from('user_rankings')
      .select('*')
      .order('rank')

    if (!usersError) {
      setUsers(usersData || [])
    }

    setLoading(false)
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-500'
      case 2: return 'text-gray-500'
      case 3: return 'text-orange-500'
      default: return 'text-muted-foreground'
    }
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return rank.toString()
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading leaderboard...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Today's Leaderboard</h2>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'posts'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Top Posts
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'users'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          Top Users
        </button>
      </div>

      {activeTab === 'posts' && (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No posts yet today. Be the first to share an insight!
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.post_id} className="post-card">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`text-2xl font-bold ${getRankColor(post.rank)}`}>
                      {getRankIcon(post.rank)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{post.username}</span>
                      </div>
                      <p className="text-foreground">{post.content}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ArrowUp className="w-4 h-4" />
                    <span>{post.votes}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-4">
          {users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No users have posted today.
            </div>
          ) : (
            users.map((user) => (
              <div key={user.user_id} className="leaderboard-item">
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl font-bold ${getRankColor(user.rank)}`}>
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.post_count} post{user.post_count !== 1 ? 's' : ''} • {user.total_votes_received} vote{user.total_votes_received !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{user.total_votes_received}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Leaderboards reset daily at midnight UTC
      </div>
    </div>
  )
}