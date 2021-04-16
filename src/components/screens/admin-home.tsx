import Link from 'next/link'
import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import { fetcher } from '@/lib/fetcher'
import { MenuItem, RestaurantType } from 'src/types'

import BaseHome from '../base-home'
import LoadingSpinner from '../loading-spinner'

type ResponseType = {
  restaurants: RestaurantType[]
}

export type MenuItemsReturnType = {
  menuItems: MenuItem[]
}

export default function AdminHome() {
  const { user, signout } = useAuth()
  const { data, error } = useSWR<ResponseType>(
    ['/api/manager-restaurants', user.token],
    fetcher,
  )

  if (error) {
    console.error(error)
    return <div>Failed to load</div>
  }

  if (!data) {
    return (
      <BaseHome pageTitle='Loading'>
        <LoadingSpinner />
      </BaseHome>
    )
  }

  if (data.restaurants.length <= 0) {
    return (
      <BaseHome pageTitle='Admin Home'>
        <header className='pb-2 flex justify-between'>
          <h1 className='text-xl font-light'>My Restaurant</h1>
          <button onClick={() => signout('/')}>Sign Out ({user.name})</button>
        </header>

        <main className='flex flex-col gap-4 mt-6'>Handle no restaurants</main>
      </BaseHome>
    )
  }

  return (
    <BaseHome pageTitle='Admin Home'>
      <header className='pb-2 flex justify-between'>
        <h1 className='text-xl font-light'>My Restaurant</h1>
        <button onClick={() => signout('/')}>Sign Out ({user.name})</button>
      </header>

      <main className='flex flex-col gap-y-2 mt-6'>
        {data.restaurants.map((item) => (
          <Link href={`/home/restaurant/${item.id}`} key={item.id}>
            <a className='text-gray-900 bg-gray-100 px-2 py-3 capitalize rounded-sm shadow transition-shadow hover:shadow-md'>
              {item.name}
            </a>
          </Link>
        ))}
      </main>
    </BaseHome>
  )
}
