import type { NextApiRequest, NextApiResponse } from 'next'

import admin from '@/lib/firebase-admin'
import { getMenuItems } from '@/lib/db-admin'

const auth = admin.auth()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rid = (req.query?.rid as string) ?? ''
  // const { uid } = await auth.verifyIdToken(req.headers.token as string)

  const items = await getMenuItems({ rid })

  res.status(200).json(items)
}
