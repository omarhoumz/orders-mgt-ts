import BaseHome from '@/components/base-home'
import LoadingSpinner from '@/components/loading-spinner'
import { MenuItemsReturnType } from '@/components/screens/admin-home'
import { useAuth } from '@/lib/auth'
import { fetcher } from '@/lib/fetcher'
import { useRouter } from 'next/router'
import useSWR from 'swr'

export default function ManageRestaurant() {
  const router = useRouter()
  const { rid } = router.query

  const { user, loading } = useAuth()

  const url = user ? [`/api/menu-items/${rid}`, user.token] : null
  const { data, error } = useSWR<MenuItemsReturnType>(url, fetcher)

  const isLoading = !rid || loading || !data

  if (isLoading) return <LoadingSpinner />

  if (error) {
    return <div>There was an error while fetching restaurant data</div>
  }

  console.log(data)

  return (
    <BaseHome pageTitle='Home'>
      <div className='flex flex-col'>
        {data.menuItems.map((item, index) => {
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
                  <p className='capitalize text-gray-700'>{item.description}</p>
                )}
              </div>
              <div style={{ fontVariantNumeric: 'tabular-nums' }}>
                {price} <span className='text-xs'>MAD</span>
              </div>
            </div>
          )
        })}
      </div>
    </BaseHome>
  )
}
