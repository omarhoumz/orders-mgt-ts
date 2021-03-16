import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import MenuItem, { menuItemType } from 'src/components/menu-item'
import Rating from 'src/components/rating'

function getCount(items: menuItemType[]) {
  return items.reduce((acc, cur) => {
    return cur?.isChecked ? acc + 1 : acc
  }, 0)
}

function getTotal(items: menuItemType[]) {
  return items
    .reduce((acc, cur) => {
      return cur?.isChecked ? acc + cur.price : acc
    }, 0)
    .toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
}

export default function Restaurant() {
  const [menuItems, setMenuItems] = React.useState<menuItemType[]>([
    {
      id: 1,
      title: 'Margarita',
      incredients: 'Red Sauce, Ricota, Red Pepper, Sport Pepper, Oregano',
      price: 12,
    },
    {
      id: 2,
      title: 'ITALIAN SAUSAGE',
      incredients: 'Red Sauce, Ricota, Red Pepper, Sport Pepper',
      price: 16,
      isChecked: true,
    },
    {
      id: 3,
      title: 'Margarita',
      incredients: 'Red Sauce, Ricota, Red Pepper, Sport Pepper, Oregano',
      price: 14,
      isChecked: true,
    },
    {
      id: 4,
      title: 'ITALIAN SAUSAGE',
      incredients: 'Red Sauce, Ricota, Red Pepper, Sport Pepper',
      price: 18,
    },
  ])

  function handleClickItem(id) {
    setMenuItems((items) =>
      items.map((el) => {
        if (el.id === id) {
          el.isChecked = !Boolean(el?.isChecked)
        }
        return { ...el }
      }),
    )
  }

  return (
    <div className='flex flex-col max-w-sm mx-auto min-h-screen pt-8'>
      <Head>
        <title>New order</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='flex justify-between items-center px-4 pb-2 text-gray-800 border-b border-gray-300'>
        <Link href='/'>
          <a className='text-xl font-light leading-none'>Home</a>
        </Link>
        <div className='relative inline-block text-gray-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 48 48'
            className='h-8 fill-current'
          >
            <title>Your cart</title>
            <path d='M11.016,32.179C11.103,32.655,11.517,33,12,33h28c0.483,0,0.897-0.345,0.984-0.821l4-22 c0.053-0.292-0.026-0.592-0.216-0.819S44.296,9,44,9H10.857L9.884,3.643C9.711,2.691,8.883,2,7.917,2H1v4h5.247L11.016,32.179z'></path>
            <circle cx='14' cy='41' r='5'></circle>
            <circle cx='38' cy='41' r='5'></circle>
          </svg>
          <div className='absolute -top-1.5 -right-1.5 inline-flex justify-center items-center h-5 w-5 text-xs bg-white ring-1 ring-white border-2 border-gray-600 rounded-full'>
            {getCount(menuItems)}
          </div>
        </div>
      </header>

      <main className='flex-grow flex flex-col px-4'>
        <div className='main-content'>
          <div className='flex gap-4 py-4'>
            <figure className='relative h-20 w-20 m-0 flex-shrink-0'>
              <Image
                src='/resto.jpeg'
                alt='An image of a restaurant'
                layout='fill'
                objectFit='cover'
                className='rounded'
              />
            </figure>
            <div className='meta'>
              <h4 className='text-lg font-bold'>This resto is sick</h4>
              <p className='text-sm text-gray-600'>
                Lorem ipsum dolor sit amet, sapiente adipisicing elit commodi.
              </p>
              <Rating className='mt-2 text-yellow-600' stars={4} />
            </div>
          </div>
          <div className='menu'>
            <h3 className='font-bold'>Menu</h3>
            <ul>
              {menuItems.map((el) => (
                <li key={el.id}>
                  <MenuItem {...el} onClickItem={handleClickItem} />
                </li>
              ))}
            </ul>
          </div>
          <div className='slider'>
            <h3 className='font-bold mt-4'>Meal Images</h3>
          </div>
        </div>
        <div className='sticky bottom-0 w-full bg-gray-50 py-2 text-center mt-auto'>
          <div className='flex gap-4 mb-4 text-gray-700 font-light '>
            <div className='ml-7'></div>
            <div className='flex-grow flex justify-between gap-2 text-lg'>
              <div>Total</div>
              <div>{getTotal(menuItems)}</div>
            </div>
          </div>
          <button className='bg-gray-100 py-2 px-8 capitalize rounded hover:bg-gray-200'>
            confirm order
          </button>
        </div>
      </main>

      <footer className=' px-4'></footer>
    </div>
  )
}
