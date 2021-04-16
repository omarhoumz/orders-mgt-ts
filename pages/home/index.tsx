import { useRouter } from 'next/router'

import BaseHome from '@/components/base-home'
import LoadingSpinner from '@/components/loading-spinner'
import AdminHome from '@/components/screens/admin-home'
import { useAuth, UserRole } from '@/lib/auth'
import DefaultHome from '@/components/screens/default-home'

function WaiterHome() {
  return (
    <BaseHome pageTitle='Waiter Home'>
      <span>Waiter Home</span>
    </BaseHome>
  )
}

export default function Home() {
  const Router = useRouter()
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <BaseHome pageTitle='Loading'>
        <LoadingSpinner />
      </BaseHome>
    )
  }

  if (!user) {
    Router.push('/')
    return null
  }

  if (user.role === UserRole.waiter) {
    return <WaiterHome />
  }

  if (user.role === UserRole.manager || user.role === UserRole.owner) {
    return <AdminHome />
  }

  return <DefaultHome />
}
