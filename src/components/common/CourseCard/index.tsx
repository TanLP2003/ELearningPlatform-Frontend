import './CourseCard.scss'
import img_default from '../../../assets/course_image_default.jpg'

interface CourseCardProps {
  course: LearningListItem | WishListItem
  handleClick: Function
}

const CourseCard: React.FC<CourseCardProps> = ({ course, handleClick }) => {
  return (
    <div className='course-card' onClick={() => handleClick()}>
      <div style={{ overflow: 'hidden' }}>
        <img className='img-cover' src={img_default} alt='' />
      </div>
      <p>{course.courseName}</p>
      <span>{course.authorName}</span>
    </div>
  )
}

export default CourseCard
