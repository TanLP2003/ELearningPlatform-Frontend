import { useLocation, useParams } from 'react-router-dom'
import CourseContentNav from './CourseContentNav'
import './CourseLearning.scss'
import Header from './Header'
import Watching from './Watching'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux'
import useFetchData from '~/components/hooks/useFetchData'
import { useDispatch } from 'react-redux'
import { getCourseForLearning, getCourseForPreviewing } from '~/redux/actions/course-actions'
import { useEffect, useState } from 'react'

const CourseLearning: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isPreviewing = queryParams.get('isPreviewing') === 'true'
  const { courseId } = useParams()
  const isFetched = useFetchData(() => [
    dispatch(isPreviewing ? getCourseForPreviewing(courseId!) : getCourseForLearning(courseId!))
  ])
  const selectedCourse = useSelector((state: RootState) =>
    isPreviewing ? state.courses.previewing : state.courses.watching
  )
  const [isPassedTopbar, setIsPassedTopbar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const topbarHeight = 50 // hoặc lấy chiều cao thực tế của topbar
      if (window.scrollY > topbarHeight) {
        setIsPassedTopbar(true)
      } else {
        setIsPassedTopbar(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div>
      {isFetched && (
        <div>
          <Header course={selectedCourse!} />
          <div className='learning-body'>
            <div className='learning-body-left'>
              <Watching course={selectedCourse} />
            </div>
            <div
              className='learning-body-right'
              style={{
                height: isPassedTopbar ? '100vh' : 'calc(100vh - 50px)',
                top: isPassedTopbar ? 0 : '50px'
              }}
            >
              <CourseContentNav sections={selectedCourse!.sections} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseLearning
