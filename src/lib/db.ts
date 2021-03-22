import { MenuItem } from 'src/types'

import { UserRole } from './auth'
import firebase from './firebase'

import type { User } from './auth'

const firestore = firebase.firestore()

export function createUser(user: Omit<User, 'token'>) {
  return firestore.collection('users').doc(user.uid).set(user)
}

export async function getUserRole(user: firebase.User): Promise<UserRole> {
  const dbUser = await firestore.collection('users').doc(user.uid).get()

  if (!dbUser.exists) {
    throw new Error(`User doen't exist`)
  }

  return dbUser.get('role')
}

export function addMenuItem({ rid, name, price, description }: { rid: string } & MenuItem) {
  return firestore
    .collection('restaurants')
    .doc(rid)
    .update({ menu: firebase.firestore.FieldValue.arrayUnion({ name, description, price }) })
}
