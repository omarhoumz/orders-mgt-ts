import { useRouter } from 'next/router'

import BaseHome from '@/components/base-home'
import LoadingSpinner from '@/components/loading-spinner'
import { useAuth } from '@/lib/auth'

export default function Home() {
  const { loading, user, signinWithGoogle } = useAuth()
  const Router = useRouter()

  if (loading) {
    return (
      <BaseHome pageTitle='Loading ...'>
        <LoadingSpinner />
      </BaseHome>
    )
  }

  if (user) {
    Router.push('/home')
  }

  return (
    <BaseHome pageTitle='Sign in'>
      <button onClick={() => signinWithGoogle('/home')}>
        Sign In With Google
      </button>
    </BaseHome>
  )
}
