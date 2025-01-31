import { useParams } from 'react-router-dom'
import './CourseViewing.scss'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import useFetchData from '~/components/hooks/useFetchData'
import { getCourseForViewing } from '~/redux/actions/course-actions'
import Intro from './Intro'
import Content from './Content'
import { useSelector } from 'react-redux'

const CourseViewing: React.FC = () => {
  const { courseId } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const isFetched = useFetchData(() => [dispatch(getCourseForViewing(courseId!))])
  const course = useSelector((state: RootState) => state.courses.courseViewing)
  return (
    <>
      {isFetched && (
        <div className='course-viewing'>
          <Intro course={course} />
          <Content course={course} />
        </div>
      )}
    </>
  )
}

export default CourseViewing
