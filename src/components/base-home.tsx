import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'

const links = [
  { label: 'Home', href: '/home' },
  { label: 'My Restaurants', href: '/home' },
]

export default function BaseHome({
  children,
  pageTitle,
}: {
  children?: React.ReactNode
  pageTitle: string
}) {
  return (
    <div className='max-w-sm mx-auto px-4 py-8'>
      <Head>
        <title>{pageTitle}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <nav className='mb-4 text-sm text-gray-700'>
        {links.map(({ label, href }, index) => (
          <>
            {index === 0 ? null : ' · '}
            <Link href={href} key={index}>
              <a className='capitalize'>{label}</a>
            </Link>
          </>
        ))}
      </nav>

      {children}
    </div>
  )
}
