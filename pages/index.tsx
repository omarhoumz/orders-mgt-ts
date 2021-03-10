import Head from 'next/head'
import Link from 'next/link'

import Restaurant from 'src/components/restaurant'

const restos = [
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
  {
    image: { src: '/resto.jpeg', alt: 'An image of a restaurant' },
    title: 'The restaurant',
    description: 'This is a cool restaurant',
    stars: 4,
  },
]

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hello ts</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='max-w-sm mx-auto px-4 py-8'>
        <header>
          <h2 className='text-xl font-light'>Home</h2>
        </header>
        <main>
          <section className='flex justify-center py-12'>
            <Link href='/new-order'>
              <a className='inline-block px-4 py-2 text-lg bg-gray-200 rounded transition-colors duration-100 hover:bg-gray-300'>
                New order
              </a>
            </Link>
          </section>
          <section>
            <h3 className='text-xl font-bold mb-2'>Recent Restaurants</h3>
            <div className='flex flex-col gap-4'>
              {restos.map((resto, index) => (
                <Restaurant key={index} {...resto} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer></footer>
    </div>
  )
}
