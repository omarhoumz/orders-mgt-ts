import React from 'react'

type TProps = {
  className?: string
  stars: number
}

function Rating({ className, stars }: TProps) {
  if (!stars) {
    return null
  }

  const roundedStars = Math.floor(stars)

  return (
    <div className={className}>
      {new Array(roundedStars).fill('★', 0, roundedStars).join('')}
      {new Array(5 - roundedStars).fill('☆', 0, 5 - roundedStars).join('')}
    </div>
  )
}

Rating.propTypes = {}

export default Rating
