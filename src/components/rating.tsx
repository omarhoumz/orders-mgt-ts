import React from 'react'

type TProps = {
  className?: string
  stars: number
}

function Rating({ className, stars }: TProps) {
  return (
    <div className={className}>
      {new Array(stars).fill('★', 0, stars).join('')}
      {new Array(5 - stars).fill('☆', 0, 5 - stars).join('')}
    </div>
  )
}

Rating.propTypes = {}

export default Rating
