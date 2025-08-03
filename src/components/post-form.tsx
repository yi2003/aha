'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

interface PostFormProps {
  userId: string
  onSuccess: () => void
}

export function PostForm({ userId, onSuccess }: PostFormProps) {
  const [content, setContent] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [canPost, setCanPost] = useState(true)

  const checkCanPost = async () => {
    const { data, error } = await supabase
      .rpc('can_user_post_today', { user_uuid: userId })
    
    if (error) {
      console.error('Error checking post eligibility:', error)
      setCanPost(false)
    } else {
      setCanPost(data)
    }
  }

  useEffect(() => {
    checkCanPost()
  }, [userId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: userId,
            content: content.trim(),
            link_url: linkUrl.trim() || null,
          }
        ])

      if (error) {
        setError(error.message)
      } else {
        setContent('')
        setLinkUrl('')
        onSuccess()
      }
    } catch (err) {
      setError('An error occurred while creating your post')
    } finally {
      setLoading(false)
    }
  }

  if (!canPost) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-[hsl(var(--secondary))] p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Daily Limit Reached</h3>
          <p className="text-[hsl(var(--muted-foreground))]">
            You've already shared your insight for today. Come back tomorrow!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Insight
            <span className="text-[hsl(var(--muted-foreground))] ml-2">
              ({content.length}/500)
            </span>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 500))}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))] min-h-[120px]"
            placeholder="Share your best insight of the day..."
            maxLength={500}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Link (optional)
          </label>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))]"
            placeholder="https://..."
          />
        </div>

        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            One post per day. Make it count!
          </p>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary))]/90 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Share Aha'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}