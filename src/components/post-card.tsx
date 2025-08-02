'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowUp, MessageSquare, ExternalLink } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

interface ExtendedPost extends Post {
  profiles: Profile
}

interface PostCardProps {
  post: ExtendedPost
  user: any
  onUpdate: () => void
}

export function PostCard({ post, user, onUpdate }: PostCardProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [voting, setVoting] = useState(false)
  const [userVotesToday, setUserVotesToday] = useState(0)

  const checkVoteStatus = async () => {
    if (!user) return

    // Check if user has voted on this post
    const { data } = await supabase
      .from('votes')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_id', post.id)
      .single()

    setHasVoted(!!data)

    // Check user's votes today
    const { data: votesData } = await supabase
      .rpc('get_user_votes_today', { user_uuid: user.id })
    
    setUserVotesToday(votesData || 0)
  }

  useState(() => {
    checkVoteStatus()
  })

  const handleVote = async () => {
    if (!user || voting) return

    setVoting(true)

    try {
      if (hasVoted) {
        // Remove vote
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', post.id)

        if (error) throw error
        setHasVoted(false)
      } else {
        // Add vote
        if (userVotesToday >= 5) {
          alert('You have used all 5 of your daily votes!')
          return
        }

        const { error } = await supabase
          .from('votes')
          .insert([{ user_id: user.id, post_id: post.id }])

        if (error) throw error
        setHasVoted(true)
      }

      onUpdate()
    } catch (error) {
      console.error('Error voting:', error)
    } finally {
      setVoting(false)
    }
  }

  const isOwnPost = user?.id === post.user_id

  return (
    <div className="post-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-medium">
                {post.profiles.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <span className="font-medium">{post.profiles.username}</span>
              <span className="text-sm text-muted-foreground ml-2">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>

          <p className="text-foreground mb-3">{post.content}</p>

          {post.link_url && (
            <a
              href={post.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm text-primary hover:underline mb-3"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View link</span>
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 pt-4 border-t border-border">
        <button
          onClick={handleVote}
          disabled={!user || isOwnPost || voting}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
            hasVoted
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ArrowUp className={`w-4 h-4 ${voting ? 'animate-pulse' : ''}`} />
          <span>{post.votes}</span>
        </button>

        <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground">
          <MessageSquare className="w-4 h-4" />
          <span>Comments</span>
        </button>

        {user && !isOwnPost && (
          <div className="text-sm text-muted-foreground">
            {userVotesToday}/5 votes used today
          </div>
        )}
      </div>
    </div>
  )
}