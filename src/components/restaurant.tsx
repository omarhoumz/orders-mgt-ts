import Image from 'next/image'
import * as React from 'react'

type ImageType = {
  src: string
  alt: string
}

type IProps = {
  image: ImageType
  title: string
  description: string
  stars: number
}

export default function Restaurant({
  image,
  title,
  description,
  stars,
}: IProps) {
  return (
    <article className='flex gap-2 border border-gray-300 p-2 rounded'>
      <figure className='relative w-28 h-24 m-0'>
        <Image
          src={image.src}
          alt={image.alt}
          layout='fill'
          objectFit='cover'
        />
        {/* <figcaption>An elephant at sunset</figcaption> */}
      </figure>
      <div className='flex flex-col'>
        <h4 className='text-gray-800 font-bold mb-1'>{title}</h4>
        <p className='text-gray-600 leading-tight'>{description}</p>
        <div className='mt-auto'>
          {new Array(stars).fill('★', 0, stars).join('')}
          {new Array(5 - stars).fill('☆', 0, 5 - stars).join('')}
        </div>
      </div>
    </article>
  )
}
