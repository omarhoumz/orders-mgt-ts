import firebase from './firebase'
import type { User } from './auth'

const firestore = firebase.firestore()

export function createUser(user: Omit<User, 'token'>) {
  return firestore.collection('users').doc(user.uid).set(user)
}
