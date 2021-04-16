import Image from 'next/image'
import * as React from 'react'
import Rating from './rating'

type ImageType = {
  src: string
  alt: string
}

type IProps = {
  image?: ImageType
  name: string
  description: string
  rating: number
}

export default function Restaurant({
  image,
  name,
  description,
  rating,
}: IProps) {
  return (
    <article className='flex gap-2 bg-white border border-gray-200 p-2 rounded'>
      {image ? (
        <figure className='relative w-28 h-24 m-0'>
          <Image
            src={image.src}
            alt={image.alt}
            layout='fill'
            objectFit='cover'
            className='rounded-sm'
          />
        </figure>
      ) : (
        <div className='relative w-28 h-24 rounded-sm bg-gray-200' />
      )}
      <div className='flex flex-col'>
        <h4 className='text-gray-800 font-bold mb-1'>{name}</h4>
        <p className='text-gray-600 leading-tight'>{description}</p>
        <Rating className='mt-auto' stars={rating} />
      </div>
    </article>
  )
}
