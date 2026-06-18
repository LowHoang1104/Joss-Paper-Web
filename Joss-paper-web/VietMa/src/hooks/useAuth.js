import { useEffect, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'

export function getAuthRedirectTo() {
  if (window.location.hash) {
    sessionStorage.setItem('postLoginRedirect', window.location.hash)
  }
  return `${window.location.origin}${window.location.pathname}`
}

export function useAuth() {
  const [session, setSession] = useState(null)
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return undefined
    }

    let isMounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session)
        setIsLoading(false)

        if (data.session) {
          const redirect = sessionStorage.getItem('postLoginRedirect')
          if (redirect) {
            sessionStorage.removeItem('postLoginRedirect')
            window.location.hash = redirect
          }
        }
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession)
      setIsLoading(false)

      if (event === 'SIGNED_IN') {
        const redirect = sessionStorage.getItem('postLoginRedirect')
        if (redirect) {
          sessionStorage.removeItem('postLoginRedirect')
          window.location.hash = redirect
        }
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  return {
    isLoading,
    session,
    user: session?.user || null,
  }
}
