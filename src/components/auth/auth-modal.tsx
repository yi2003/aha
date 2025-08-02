'use client'

import { useState } from 'react'
import { SignIn } from './sign-in'
import { SignUp } from './sign-up'
import { X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {isSignUp ? (
          <SignUp onSuccess={onClose} />
        ) : (
          <SignIn onSuccess={onClose} />
        )}
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:underline"
          >
            {isSignUp 
              ? 'Already have an account? Sign in'
              : 'Don\'t have an account? Sign up'
            }
          </button>
        </div>
      </div>
    </div>
  )
}