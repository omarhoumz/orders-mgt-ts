import { MenuItemsReturnType } from '@/components/screens/admin-home'
import admin from './firebase-admin'

const db = admin.firestore()

export async function getRestaurant(rid) {
  const snapshot = await db.collection('restaurants').doc(rid).get()

  let restaurant = null
  if (snapshot.exists) {
    restaurant = { id: snapshot.id, ...snapshot.data() }
  }

  return { restaurant }
}

export async function getMyRestaurants(uid: string) {
  const ownerSnapshot = await db
    .collection('restaurants')
    .where('owners', 'array-contains', uid)
    .get()

  const managerSnapshot = await db
    .collection('restaurants')
    .where('managers', 'array-contains', uid)
    .get()

  const owner = getItemsFromSnapshot(ownerSnapshot)
  const manager = getItemsFromSnapshot(managerSnapshot)

  return { restaurants: { owner, manager } }
}

export async function getUserRecommnededRestaurants(uid?: string) {
  const snapshot = await db.collection('restaurants').limit(10).get()

  return { restaurants: getItemsFromSnapshot(snapshot) }
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

  return { menuItems: getItemsFromSnapshot(snapshot) }
}

function getItemsFromSnapshot(
  snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
) {
  const items = []

  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() })
    })
  }

  return items
}
