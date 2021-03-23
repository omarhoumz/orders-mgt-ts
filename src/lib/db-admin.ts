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
