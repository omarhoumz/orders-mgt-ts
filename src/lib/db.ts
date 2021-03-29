import { MenuItem, RestaurantType } from 'src/types'

import { UserRole } from './auth'
import firebase from './firebase'

import type { User } from './auth'

const db = firebase.firestore()
const storage = firebase.storage()

export function createUser(user: Omit<User, 'token'>) {
  return db.collection('users').doc(user.uid).set(user)
}

export async function getUserRole(user: firebase.User): Promise<UserRole> {
  const dbUser = await db.collection('users').doc(user.uid).get()

  if (!dbUser.exists) {
    throw new Error(`User doen't exist`)
  }

  return dbUser.get('role')
}

export function addMenuItem({
  rid,
  name,
  price,
  description,
}: { rid: string } & MenuItem) {
  return db
    .collection('restaurants')
    .doc(rid)
    .update({
      menu: firebase.firestore.FieldValue.arrayUnion({
        name,
        description,
        price,
      }),
    })
}

export function addMenuItem2(menuItem: { rid: string } & MenuItem) {
  return db.collection('menu-items').add(menuItem)
}

export async function addRestaurant(restaurant: RestaurantType) {
  const restaurantCollection = db.collection('restaurants')
  let docRef = { id: '' }

  try {
    docRef = await restaurantCollection.add(restaurant)
  } catch (error) {
    console.log(error)
    throw new Error(`Failed adding new restaurant`)
  }

  const rid = docRef.id

  if (!rid) return 0

  const imageExt = 'png'
  const defaultImagePath = `restaurants/${rid}/default.${imageExt}`

  let defaultImageRef = null

  try {
    defaultImageRef = storage.ref(defaultImagePath)
    const file = ('' as unknown) as ArrayBuffer

    await defaultImageRef.put(file)
  } catch (error) {
    console.log(error)
    throw new Error(`Failed adding new restaurant`)
  }

  if (!defaultImageRef) return 0

  restaurantCollection
    .doc(rid)
    .update({ image: { src: await defaultImageRef.getDownloadURL(), alt: '' } })

  return 1
}
