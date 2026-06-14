import { useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'
import { getAuthRedirectTo, useAuth } from '../hooks/useAuth.js'

function AuthButton({ mobile = false, onAuthAction }) {
  const { isLoading: isAuthLoading, session } = useAuth()
  const [isActionLoading, setIsActionLoading] = useState(false)
  const [error, setError] = useState('')
  const isLoading = isAuthLoading || isActionLoading

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured) {
      setError('Chưa cấu hình Supabase')
      return
    }

    setError('')
    setIsActionLoading(true)

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getAuthRedirectTo(),
      },
    })

    if (signInError) {
      setError(signInError.message)
      setIsActionLoading(false)
    }

    onAuthAction?.()
  }

  const handleLogout = async () => {
    setError('')
    setIsActionLoading(true)

    const { error: signOutError } = await supabase.auth.signOut()

    if (signOutError) {
      setError(signOutError.message)
    }

    setIsActionLoading(false)
    onAuthAction?.()
  }

  if (!isSupabaseConfigured) {
    return (
      <span className={`auth-status ${mobile ? 'auth-status-mobile' : ''}`}>
        Thiếu cấu hình Supabase
      </span>
    )
  }

  if (session) {
    const displayName =
      session.user.user_metadata?.full_name ||
      session.user.user_metadata?.name ||
      session.user.email

    return (
      <div className={`auth-menu ${mobile ? 'auth-menu-mobile' : ''}`}>
        <span className="auth-user" title={session.user.email}>
          {displayName}
        </span>
        <button
          type="button"
          className="auth-button"
          onClick={handleLogout}
          disabled={isLoading}
        >
          Đăng xuất
        </button>
        {error && <span className="auth-error">{error}</span>}
      </div>
    )
  }

  return (
    <div className={`auth-menu ${mobile ? 'auth-menu-mobile' : ''}`}>
      <button
        type="button"
        className="auth-button auth-button-google"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <span className="auth-google-mark" aria-hidden="true">
          G
        </span>
        {isLoading ? 'Đang tải...' : 'Đăng nhập'}
      </button>
      {error && <span className="auth-error">{error}</span>}
    </div>
  )
}

export default AuthButton
