import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(`${requestUrl.origin}/?error=${error}&error_description=${errorDescription}`)
  }

  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    try {
      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Session exchange error:', sessionError)
        return NextResponse.redirect(`${requestUrl.origin}/?error=session_error&error_description=${encodeURIComponent(sessionError.message)}`)
      }

      if (data?.session) {
        console.log('Successfully created session for user:', data.user?.email)
        // Success - redirect to home page
        return NextResponse.redirect(`${requestUrl.origin}/`)
      }
    } catch (error) {
      console.error('Unexpected error during session exchange:', error)
      return NextResponse.redirect(`${requestUrl.origin}/?error=unexpected_error&error_description=${encodeURIComponent(String(error))}`)
    }
  }

  // No code parameter - redirect to home
  return NextResponse.redirect(`${requestUrl.origin}/`)
}