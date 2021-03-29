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

  if (!data) return <LoadingSpinner />

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

  const firstRestaurant = data.restaurants[0].id

  return (
    <BaseHome pageTitle='Admin Home'>
      <header className='pb-2 flex justify-between'>
        <h1 className='text-xl font-light'>My Restaurant</h1>
        <button onClick={() => signout('/')}>Sign Out ({user.name})</button>
      </header>

      <main className='flex flex-col gap-4 mt-6'>
        {data.restaurants.map((item) => (
          <a href={`/home/restaurant/${item.id}`}>{item.name}</a>
        ))}
        <Link
          href={{
            pathname: '/add/menu-item',
            query: { rid: firstRestaurant },
          }}
        >
          <a className='bg-blue-600 self-start px-3 py-2 rounded text-blue-50 hover:bg-blue-500'>
            Add a menu item
          </a>
        </Link>

        <div className='flex flex-col'>
          {data.restaurants[0].menu.map((item, index) => {
            const price = parseFloat(item.price.toString()).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )

            return (
              <div
                className='flex justify-between items-baseline py-2 text-gray-900 border-b'
                key={index}
              >
                <div>
                  <h3 className='text-xl capitalize'>{item.name}</h3>
                  {!item.description ? null : (
                    <p className='capitalize text-gray-700'>
                      {item.description}
                    </p>
                  )}
                </div>
                <div style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {price} <span className='text-xs'>MAD</span>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </BaseHome>
  )
}
