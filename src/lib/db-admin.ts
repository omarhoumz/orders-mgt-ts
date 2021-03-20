import admin from './firebase-admin'

const db = admin.firestore()

export async function getManagerRestaurants(uid) {
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
