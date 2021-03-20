import Head from 'next/head'
import * as React from 'react'

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

      {children}
    </div>
  )
}
