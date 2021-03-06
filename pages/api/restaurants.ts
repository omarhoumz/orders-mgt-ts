import type { NextApiRequest, NextApiResponse } from 'next'

import admin from '@/lib/firebase-admin'
import { getUserRecommnededRestaurants } from '@/lib/db-admin'

const auth = admin.auth()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { uid } = await auth.verifyIdToken(req.headers.token as string)

  const restos = await getUserRecommnededRestaurants(uid)

  res.status(200).json(restos)
}
