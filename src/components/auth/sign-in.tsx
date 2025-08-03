'use client'

import { useState } from 'react'
import { signIn, signInWithGoogle } from '@/lib/auth'
import { Loader2 } from 'lucide-react'

interface SignInProps {
  onSuccess?: () => void
}

export function SignIn({ onSuccess }: SignInProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setError(error.message)
    } else {
      onSuccess?.()
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const { error } = await signInWithGoogle()
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--background))]"
            required
          />
        </div>
        
        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary))]/90 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[hsl(var(--border))]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[hsl(var(--background))] px-2 text-[hsl(var(--muted-foreground))]">Or continue with</span>
        </div>
      </div>
      
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full py-2 px-4 border border-[hsl(var(--border))] rounded-md hover:bg-[hsl(var(--secondary))] disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin mx-auto" />
        ) : (
          'Sign in with Google'
        )}
      </button>
    </div>
  )
}