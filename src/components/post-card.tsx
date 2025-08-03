'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowUp, MessageSquare, ExternalLink, Send, Link2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Comment = Database['public']['Tables']['comments']['Row']

interface ExtendedPost extends Post {
  profiles: Profile
}

interface ExtendedComment extends Comment {
  profiles: Profile
  replies?: ExtendedComment[]
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
  const [comments, setComments] = useState<ExtendedComment[]>([])
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [loadingComments, setLoadingComments] = useState(false)
  const [submittingComment, setSubmittingComment] = useState(false)

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

  const buildCommentTree = (comments: ExtendedComment[]): ExtendedComment[] => {
    const commentMap = new Map<string, ExtendedComment>()
    const rootComments: ExtendedComment[] = []

    // First pass: create map and initialize replies
    comments.forEach(comment => {
      commentMap.set(comment.id, { ...comment, replies: [] })
    })

    // Second pass: organize into tree structure
    comments.forEach(comment => {
      if (comment.parent_id) {
        const parent = commentMap.get(comment.parent_id)
        if (parent && parent.replies) {
          parent.replies.push(commentMap.get(comment.id)!)
        }
      } else {
        rootComments.push(commentMap.get(comment.id)!)
      }
    })

    return rootComments
  }

  const loadComments = async () => {
    setLoadingComments(true)
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`*, profiles(*)`)
        .eq('post_id', post.id)
        .order('created_at', { ascending: true })

      if (error) throw error
      const commentTree = buildCommentTree(data || [])
      setComments(commentTree)
      return commentTree
    } catch (error) {
      console.error('Error loading comments:', error)
      return []
    } finally {
      setLoadingComments(false)
    }
  }

  const handleComment = async () => {
    if (!user || !newComment.trim() || submittingComment) return

    setSubmittingComment(true)
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          post_id: post.id,
          user_id: user.id,
          content: newComment.trim(),
          parent_id: replyTo
        }])

      if (error) throw error

      setNewComment('')
      setReplyTo(null)
      loadComments()
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setSubmittingComment(false)
    }
  }

  useEffect(() => {
    checkVoteStatus()
  }, [user, post.id])

  useEffect(() => {
    // Auto-open comments and scroll to comment if URL has comment hash
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      if (hash.startsWith('comment-')) {
        const commentId = hash.replace('comment-', '')
        // Check if this comment belongs to this post
        const commentExists = comments.some(c => c.id === commentId)
        if (!commentExists) {
          // Load comments and then scroll
          setShowComments(true)
          loadComments().then(() => {
            setTimeout(() => {
              const element = document.getElementById(`comment-${commentId}`)
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                element.classList.add('bg-yellow-100', 'dark:bg-yellow-900', 'rounded', 'p-2', 'transition-colors', 'duration-1000')
                setTimeout(() => {
                  element.classList.remove('bg-yellow-100', 'dark:bg-yellow-900', 'rounded', 'p-2')
                }, 2000)
              }
            }, 100)
          })
        } else {
          // Comment already loaded, just scroll
          const element = document.getElementById(`comment-${commentId}`)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            element.classList.add('bg-yellow-100', 'dark:bg-yellow-900', 'rounded', 'p-2', 'transition-colors', 'duration-1000')
            setTimeout(() => {
              element.classList.remove('bg-yellow-100', 'dark:bg-yellow-900', 'rounded', 'p-2')
            }, 2000)
          }
        }
      }
    }
  }, [comments])

  const CommentItem = ({ comment, depth = 0 }: { comment: ExtendedComment; depth?: number }) => {
    const [showReplyInput, setShowReplyInput] = useState(false)
    
    return (
      <div className={`flex space-x-3 group ${depth > 0 ? 'ml-8 mt-3' : ''}`} id={`comment-${comment.id}`}>
        <div className={`${depth > 0 ? 'w-5 h-5' : 'w-6 h-6'} rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center flex-shrink-0`}>
          <span className={`${depth > 0 ? 'text-xs' : 'text-xs'} font-medium`}>
            {comment.profiles.username?.[0]?.toUpperCase() || 'U'}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{comment.profiles.username}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
              </span>
              {depth > 0 && (
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  • Reply
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => {
                  const url = new URL(window.location.href)
                  url.hash = `comment-${comment.id}`
                  navigator.clipboard.writeText(url.toString())
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[hsl(var(--secondary))] rounded"
                title="Copy comment link"
              >
                <Link2 className="w-3 h-3 text-[hsl(var(--muted-foreground))]" />
              </button>
              {user && (
                <button
                  onClick={() => {
                    setReplyTo(comment.id)
                    setShowReplyInput(!showReplyInput)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[hsl(var(--secondary))] rounded text-xs text-[hsl(var(--muted-foreground))]"
                  title="Reply to comment"
                >
                  Reply
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-[hsl(var(--foreground))] mt-1">{comment.content}</p>
          
          {user && showReplyInput && replyTo === comment.id && (
            <div className="mt-2 flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                placeholder={`Reply to ${comment.profiles.username}...`}
                className="flex-1 px-2 py-1 text-xs border border-[hsl(var(--border))] rounded bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-1 focus:ring-primary"
                autoFocus
              />
              <button
                onClick={handleComment}
                disabled={!newComment.trim() || submittingComment}
                className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingComment ? (
                  <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-3 h-3" />
                )}
              </button>
              <button
                onClick={() => {
                  setReplyTo(null)
                  setShowReplyInput(false)
                  setNewComment('')
                }}
                className="px-2 py-1 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
              >
                Cancel
              </button>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

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
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--secondary))] flex items-center justify-center">
              <span className="text-sm font-medium">
                {post.profiles.username?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <span className="font-medium">{post.profiles.username}</span>
              <span className="text-sm text-[hsl(var(--muted-foreground))] ml-2">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>

          <p className="text-[hsl(var(--foreground))] mb-3">{post.content}</p>

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

      <div className="flex items-center space-x-4 pt-4 border-t border-[hsl(var(--border))]">
        <button
          onClick={handleVote}
          disabled={!user || isOwnPost || voting}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
            hasVoted
              ? 'bg-primary text-primary-foreground'
              : 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary))]/80'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ArrowUp className={`w-4 h-4 ${voting ? 'animate-pulse' : ''}`} />
          <span>{post.votes}</span>
        </button>

        <button
          onClick={() => {
            setShowComments(!showComments)
            if (!showComments && comments.length === 0) {
              loadComments()
            }
          }}
          className="flex items-center space-x-1 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{comments.length} Comments</span>
        </button>

        {user && !isOwnPost && (
          <div className="text-sm text-[hsl(var(--muted-foreground))]">
            {userVotesToday}/5 votes used today
          </div>
        )}
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-[hsl(var(--border))]">
          <div className="space-y-3 mb-4">
            {loadingComments ? (
              <div className="text-sm text-[hsl(var(--muted-foreground))]">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="text-sm text-[hsl(var(--muted-foreground))]">No comments yet</div>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>

          {user && (
            <div>
              {replyTo && (
                <div className="flex items-center justify-between mb-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <span>Replying to comment...</span>
                  <button
                    onClick={() => {
                      setReplyTo(null)
                      setNewComment('')
                    }}
                    className="text-xs hover:text-[hsl(var(--foreground))]"
                  >
                    Cancel
                  </button>
                </div>
              )}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  placeholder={replyTo ? "Write a reply..." : "Add a comment..."}
                  className="flex-1 px-3 py-2 text-sm border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleComment}
                  disabled={!newComment.trim() || submittingComment}
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingComment ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}