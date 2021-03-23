import { useAuth } from '@/lib/auth'
import { fetcher } from '@/lib/fetcher'
import Link from 'next/link'
import { RestaurantType } from 'src/types'
import useSWR from 'swr'

import BaseHome from '../base-home'
import LoadingSpinner from '../loading-spinner'
import Restaurant from '../restaurant'

type ResponseType = {
  restaurants: RestaurantType[]
}

export default function DefaultHome() {
  const { user, signout } = useAuth()
  const { data, error } = useSWR<ResponseType>(
    ['/api/restaurants', user.token],
    fetcher,
  )

  if (error) {
    console.error(error)
    return <div>Failed to load</div>
  }

  if (!data) return <LoadingSpinner />

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
            {data.restaurants.map((resto) => (
              <Restaurant key={resto.id} {...resto} />
            ))}
          </div>
        </section>
      </main>
    </BaseHome>
  )
}
