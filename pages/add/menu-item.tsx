import BaseHome from '@/components/base-home'
import LoadingSpinner from '@/components/loading-spinner'
import { addMenuItem } from '@/lib/db'
import { useRouter } from 'next/router'
import * as React from 'react'
import { MenuItem } from 'src/types'

enum STATES {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

function Input({
  name,
  label,
  type = 'text',
  onChange,
  value,
}: {
  name: string
  label: string
  type?: 'text' | 'number'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string | number
}) {
  return (
    <label htmlFor={name} className='flex flex-col gap-1'>
      <div>{label}</div>
      <input
        type={type}
        name={name}
        className='border border-gray-300 w-80 px-2 py-1 rounded-sm'
        onChange={onChange}
        value={value}
      />
    </label>
  )
}

export default function AddMenuItem() {
  const [status, setStatus] = React.useState<STATES>(STATES.IDLE)
  const [formData, setFormData] = React.useState<MenuItem>({
    name: '',
    price: 0,
  })
  const Router = useRouter()

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setStatus(STATES.LOADING)

    const rid = Router.query.rid as string
    await addMenuItem({ rid, ...formData })

    setStatus(STATES.SUCCESS)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  if (status === STATES.SUCCESS) {
    Router.push('/home')
    return <div>Redirecting ...</div>
  }

  if (status === STATES.ERROR) {
    console.log('Error')
    return <div>Failed to add menu item</div>
  }

  if (status === STATES.LOADING) {
    return (
      <>
        <div>Adding menu item</div>
        <LoadingSpinner />
      </>
    )
  }

  return (
    <BaseHome pageTitle='Add menu item'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-start'>
        <Input
          name='name'
          label='Title'
          onChange={handleChange}
          value={formData.name}
        />
        <Input
          name='price'
          label='Price'
          type='number'
          onChange={handleChange}
          value={formData.price}
        />

        <button>Submit</button>
      </form>
    </BaseHome>
  )
}
