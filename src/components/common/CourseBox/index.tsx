import './CourseBox.scss'
import img_default from '../../../assets/course_image_default.jpg'
import { useEffect, useRef, useState } from 'react'
import { MoreVertical, FolderPlus, Star, FolderMinus } from 'lucide-react'
import RatingModal from '../RatingModal'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '~/redux'
import {
  addCourseReview,
  archiveOrUnarchiveEnrolledCourse,
  deleteCourseReview,
  updateCourseReview
} from '~/redux/actions/learning-action'

interface CourseBoxProps {
  course: EnrolledCourse
  handleClick: Function
}

const CourseBox: React.FC<CourseBoxProps> = ({ course, handleClick }) => {
  const dispatch: AppDispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const stars = Array(5).fill(0)
  const completionPercentage = course?.completionPercentage || 0
  const rating = course?.courseReview?.rating || 0
  const feedback = course?.courseReview?.reviewText || ''
  const [isRatingModalOpen, setRatingModalOpen] = useState(false)
  const handleRatingModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setRatingModalOpen(true)
  }
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleArchiveOrUnarchive = () => {
    dispatch(
      archiveOrUnarchiveEnrolledCourse({
        courseId: course.courseId,
        setArchived: !course.isArchived
      })
    )
  }
  const handleUpdateCourseReview = (rating: number, feedback: string) => {
    dispatch(
      addCourseReview({
        courseId: course.courseId,
        rating: rating,
        reviewText: feedback
      })
    )
  }
  const handleDeleteCourseReview = () => {
    dispatch(deleteCourseReview(course.courseId))
  }
  return (
    <>
      <div className='course-box' onClick={() => handleClick()}>
        {/* Custom Menu Dropdown */}
        <div className='menu-container' ref={menuRef}>
          <button
            className='menu-button'
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
          >
            <MoreVertical className='h-5 w-5' />
          </button>

          {isMenuOpen && (
            <div className='menu-dropdown'>
              <button
                className='menu-item'
                onClick={(e) => {
                  e.stopPropagation()
                  // onArchive?.(course?.courseId)
                  handleArchiveOrUnarchive()
                  setIsMenuOpen(false)
                }}
              >
                {!course.isArchived ? (
                  <>
                    <FolderPlus className='h-4 w-4' />
                    <span>Lưu trữ</span>
                  </>
                ) : (
                  <>
                    <FolderMinus className='h-4 w-4' />
                    <span>Hủy lưu trữ</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Image */}
        <div className='image-container'>
          <img src={img_default} alt={course?.courseTitle || 'Course thumbnail'} />
        </div>

        {/* Content */}
        <div className='content'>
          <h3 className='title'>{course?.courseTitle || 'Untitled Course'}</h3>

          <p className='instructor-name'>{course?.instructorName || 'Unknown Instructor'}</p>

          {/* Progress Bar */}
          <div className='progress'>
            <div className='progress-bar'>
              <div className='progress-bar-fill' style={{ width: `${completionPercentage}%` }} />
            </div>
            <p className='progress-text'>Hoàn thành {completionPercentage}%</p>
          </div>

          {/* Rating */}
          <div className='rating' onClick={handleRatingModalOpen}>
            <div className='rating-stars'>
              {stars.map((_, index) => (
                <Star key={index} className={`star ${index < rating ? 'filled' : 'empty'}`} />
              ))}
            </div>
            <span className='rating-text'>{rating > 0 ? 'Chỉnh sửa đánh giá' : 'Đưa ra xếp hạng'}</span>
          </div>
        </div>
      </div>
      {isRatingModalOpen && (
        <RatingModal
          existingRating={course.courseReview}
          onClose={() => setRatingModalOpen(false)}
          // onSelectRating={handleSelectRating}
          onSubmit={handleUpdateCourseReview}
          onDelete={handleDeleteCourseReview}
        />
      )}
    </>
  )
}

export default CourseBox
