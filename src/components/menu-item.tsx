import React from 'react'

export type idType = number | string

export interface menuItemType {
  id: idType
  incredients: string
  isChecked?: boolean
  onClickItem?: (id: idType) => void | undefined
  price: number
  title: string
}

export default function MenuItem({
  id,
  isChecked = false,
  title,
  price,
  incredients,
  onClickItem,
}: menuItemType) {
  return (
    <button
      className='w-full flex-grow flex gap-4 items-center py-2'
      onClick={onClickItem ? () => onClickItem(id) : undefined}
    >
      <div
        className={`flex-shrink-0 rounded ${
          !isChecked ? 'bg-gray-50' : 'bg-gray-600'
        } border-4 border-gray-600 h-7 w-7`}
      ></div>
      <div className='flex-grow'>
        <div className='flex justify-between items-end'>
          <h5 className='font-light'>{title}</h5>
          <span className='text-sm font-light'>
            {price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <p className='text-sm text-gray-700 font-light text-left'>
          {incredients}
        </p>
      </div>
    </button>
  )
}
