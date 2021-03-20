import Link from 'next/link'
import { useRouter } from 'next/router'

import BaseHome from '@/components/base-home'
import LoadingSpinner from '@/components/loading-spinner'
import Restaurant from '@/components/restaurant'
import AdminHome from '@/components/screens/admin-home'
import { useAuth, UserRole } from '@/lib/auth'

const restos = [
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
]

function WaiterHome() {
  return (
    <BaseHome pageTitle='Waiter Home'>
      <span>Waiter Home</span>
    </BaseHome>
  )
}

export default function Home() {
  const Router = useRouter()
  const { user, loading, signout } = useAuth()

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

  if (user.role >= UserRole.manager) {
    return <AdminHome />
  }

  return (
    <BaseHome pageTitle='Home'>
      <header className='flex justify-between items-baseline'>
        <h2 className='text-xl font-light'>Home</h2>
        <button onClick={() => signout('/')}>Sign Out ({user.name})</button>
      </header>
      <main>
        <section className='flex justify-center py-12'>
          <Link href='/new-order'>
            <a className='inline-block px-4 py-2 text-lg bg-gray-200 rounded transition-colors duration-100 hover:bg-gray-300'>
              New order
            </a>
          </Link>
        </section>
        <section>
          <h3 className='text-xl font-bold mb-2'>Recent Restaurants</h3>
          <div className='flex flex-col gap-4'>
            {restos.map((resto, index) => (
              <Restaurant key={index} {...resto} />
            ))}
          </div>
        </section>
      </main>
    </BaseHome>
  )
}
