import { MenuItemsReturnType } from '@/components/screens/admin-home'
import admin from './firebase-admin'

const db = admin.firestore()

export async function getManagerRestaurants(uid: string) {
  const snapshot = await db
    .collection('restaurants')
    .where('managers', 'array-contains', uid)
    .get()

  const restaurants = []

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      restaurants.push({ id: doc.id, ...doc.data() })
    })
  }

  return { restaurants }
}

export async function getUserRecommnededRestaurants(uid?: string) {
  const snapshot = await db.collection('restaurants').limit(10).get()

  const restaurants = []

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      restaurants.push({ id: doc.id, ...doc.data() })
    })
  }

  return { restaurants }
}

export async function getMenuItems({
  rid,
}: {
  rid: string
}): Promise<MenuItemsReturnType> {
  const snapshot = await db
    .collection('menu-items')
    .where('rid', '==', rid)
    .get()

  const menuItems = []

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      menuItems.push({ id: doc.id, ...doc.data() })
    })
  }

  return { menuItems }
}
