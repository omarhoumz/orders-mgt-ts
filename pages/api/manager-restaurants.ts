import type { NextApiRequest, NextApiResponse } from 'next'

import admin from '@/lib/firebase-admin'
import { getManagerRestaurants } from '@/lib/db-admin'

const auth = admin.auth()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let uid = null
  try {
    const res = await auth.verifyIdToken(req.headers.token as string)
    uid = res.uid
  } catch (error) {
    console.error('Error verifying Id Token')
    console.error(error)
  }

  let restos = { restaurants: [] }
  try {
    restos = await getManagerRestaurants(uid)
  } catch (error) {
    console.error('Error getting Manager Restaurants')
    console.error(error)
  }

  res.status(200).json(restos)
}
