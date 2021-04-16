import React from 'react'
import { UserType } from '@/lib/auth'

type IProps = {
  signout: (redirect?: string) => void
  user: UserType
}

export default function SignOutBtn({ signout, user }: IProps) {
  return (
    <button onClick={() => signout('/')} className='flex items-center gap-x-1'>
      <img
        src={user.photoUrl}
        alt={user.name}
        className='h-8 rounded-full border border-gray-200'
      />
      <span>Sign Out</span>
    </button>
  )
}
