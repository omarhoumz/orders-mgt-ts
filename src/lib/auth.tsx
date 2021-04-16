import * as React from 'react'
import Router from 'next/router'

import firebase from './firebase'
import { createUser, getUserRole } from './db'

// TODO: maybe move to types
export enum UserRole {
  user = 'user',
  waiter = 'waiter',
  manager = 'manager',
  owner = 'owner',
}

export type UserType = {
  uid: string
  email: string | null
  name: string | null
  provider: string
  photoUrl: string | null
  token: string
  role: UserRole
} | null

type AuthContextType = {
  user: UserType
  loading: boolean
  signinWithEmail: (email: string, password: string) => Promise<void> | void
  signinWithGoogle: (redirect?: string) => Promise<void> | void
  signout: (redirect?: string) => Promise<void> | void
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  loading: true,
  signinWithEmail: () => {},
  signinWithGoogle: () => {},
  signout: () => {},
})

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error(
      'Before using the `useAuth` hook, wrap your component in `AuthProvider`',
    )
  }

  return context
}

function useProvideAuth() {
  const [user, setUser] = React.useState<UserType>(null)
  const [loading, setLoading] = React.useState(true)

  async function handleUser(
    rawUser,
    aditionalUserInfo?: firebase.auth.AdditionalUserInfo,
  ) {
    if (rawUser) {
      const isNewUser = Boolean(aditionalUserInfo?.isNewUser)
      const user = await formatUser(rawUser, isNewUser)
      const { token, ...userWithoutToken } = user

      if (isNewUser) {
        createUser(userWithoutToken)
      }

      setUser(user)
    } else {
      setUser(null)
    }
    setLoading(false)
  }

  const signinWithEmail = (email: string, password: string) => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user, response.additionalUserInfo)
      })
  }

  const signinWithGoogle = (redirect?: string) => {
    setLoading(true)
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user, response.additionalUserInfo)

        if (redirect) {
          Router.push(redirect)
        }
      })
  }

  const signout = (redirect?: string) => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(null)

        if (redirect) {
          Router.push(redirect)
        }
      })
  }

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signinWithEmail,
    signinWithGoogle,
    signout,
  }
}

const formatUser = async (
  user: firebase.User,
  isNewUser: boolean,
): Promise<UserType> => {
  const token = await user.getIdToken()
  const role = isNewUser ? UserRole.user : await getUserRole(user)

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    role,
    token,
  }
}
