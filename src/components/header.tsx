'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth'
import { signOut } from '@/lib/auth'
import { User, LogOut, TrendingUp, PlusCircle, Clock } from 'lucide-react'

interface HeaderProps {
  user: any
  onAuthClick: () => void
  activeTab: 'leaderboard' | 'fresh' | 'post'
  onTabChange: (tab: 'leaderboard' | 'fresh' | 'post') => void
}

export function Header({ user, onAuthClick, activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="border-b border-border">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Aha</h1>
            <p className="text-sm text-muted-foreground">Share your best daily insight</p>
          </div>
          
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onTabChange('leaderboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                activeTab === 'leaderboard' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Leaderboard</span>
            </button>
            
            <button
              onClick={() => onTabChange('fresh')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                activeTab === 'fresh' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Fresh</span>
            </button>
            
            <button
              onClick={() => onTabChange('post')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                activeTab === 'post' 
                  ? 'bg-secondary text-secondary-foreground' 
                  : 'hover:bg-secondary/50'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Aha</span>
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-secondary">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.user_metadata?.username || 'User'}</span>
                </div>
                <button
                  onClick={async () => {
                    await signOut()
                    window.location.reload()
                  }}
                  className="p-2 hover:bg-secondary rounded-md"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Sign In
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}