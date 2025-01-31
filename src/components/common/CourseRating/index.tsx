import React from 'react'
import { Star, StarHalf } from 'lucide-react'
import './CourseRating.scss'

interface CourseRatingProps {
  rating?: number
  totalRatings?: number
}

const CourseRating: React.FC<CourseRatingProps> = ({ rating = 0, totalRatings = 0 }) => {
  // Đảm bảo rating là số hợp lệ
  const safeRating = Number(rating) || 0

  // Tính số sao đầy và nửa sao
  const fullStars = Math.floor(safeRating)
  const hasHalfStar = safeRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className='course-rating'>
      <span className='course-rating__score'>{safeRating.toFixed(1)}</span>

      <div className='course-rating__stars'>
        {/* Sao đầy */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className='star star--filled' />
        ))}

        {/* Nửa sao */}
        {hasHalfStar && <StarHalf className='star star--filled' />}

        {/* Sao rỗng */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className='star star--empty' />
        ))}
      </div>

      <span className='course-rating__total'>({Number(totalRatings).toLocaleString()} xếp hạng)</span>
    </div>
  )
}

export default CourseRating
