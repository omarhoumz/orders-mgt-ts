import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'

export default function NewOrder() {
  return (
    <div className='max-w-sm mx-auto px-4 py-8'>
      <Head>
        <title>New order</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <header>
          <h2 className='text-md text-center font-bold'>
            Scanning a new restaurant code
          </h2>
        </header>

        <section className='max-h-s-12/3 h-cam my-12 rounded-3xl bg-blue-50 border-2 border-blue-300'>
          <div className='flex justify-center items-center h-full w-full'>
            <Link href='/restaurant'>
              <a className='inline-block px-4 py-2 text-lg bg-gray-200 rounded transition-colors duration-100 hover:bg-gray-300'>
                next
              </a>
            </Link>
          </div>
        </section>

        <footer>
          <h2 className='text-xl text-center font-light'>
            Center the QR code inside the box
          </h2>
        </footer>
      </main>

      <footer></footer>
    </div>
  )
}
