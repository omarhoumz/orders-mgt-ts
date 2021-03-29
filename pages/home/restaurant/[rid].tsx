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

  console.log({ rid, user, loading })

  const isLoading = !rid || loading

  const { data, error } = useSWR<MenuItemsReturnType>(
    isLoading ? undefined : ['/api/manager-restaurants', user.token],
    fetcher,
  )

  if (isLoading && !data) return <LoadingSpinner />

  console.log(data)

  return data.
}
