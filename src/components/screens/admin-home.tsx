import Link from 'next/link'
import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import { fetcher } from '@/lib/fetcher'
import { MenuItem, RestaurantType } from 'src/types'

import BaseHome from '../base-home'
import LoadingSpinner from '../loading-spinner'
import SignOutBtn from '../sign-out-btn'

type ResponseType = {
  restaurants: {
    manager: RestaurantType[]
    owner: RestaurantType[]
  }
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

  const noRestaurants =
    data.restaurants.manager.length <= 0 && data.restaurants.owner.length <= 0

  if (noRestaurants) {
    return (
      <BaseHome pageTitle='Admin Home'>
        <header className='pb-2 flex justify-between items-center'>
          <h1 className='text-xl font-light'>My Restaurant</h1>
          <SignOutBtn signout={signout} user={user} />
        </header>

        <main className='flex flex-col gap-4 mt-6'>Handle no restaurants</main>
      </BaseHome>
    )
  }

  return (
    <BaseHome pageTitle='Admin Home'>
      <header className='pb-2 flex justify-between items-center'>
        <h1 className='text-xl font-light'>My Restaurants</h1>
        <SignOutBtn signout={signout} user={user} />
      </header>

      <main className='flex flex-col gap-y-2 mt-6'>
        <h3 className='text-gray-400'>I own:</h3>
        {data.restaurants.owner.map((item) => (
          <Link href={`/home/restaurant/${item.id}`} key={item.id}>
            <a className='text-gray-900 bg-gray-100 px-2 py-3 capitalize rounded-sm shadow transition-shadow hover:shadow-md'>
              {item.name}
            </a>
          </Link>
        ))}
        <h3 className='text-gray-400'>I manage:</h3>
        {data.restaurants.manager.map((item) => (
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
