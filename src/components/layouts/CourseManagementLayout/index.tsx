import { Outlet, useParams } from 'react-router-dom'
import Footer from '../RootLayout/Footer'
import './CourseManagementLayout.scss'
import Sidenav from './Sidenav'
import Header from './Header'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import useFetchData from '~/components/hooks/useFetchData'
import { getMyTeachingCourse } from '~/redux/actions/course-actions'

const CourseManagementLayout: React.FC = () => {
  const { courseId } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const isFetched = useFetchData(() => [dispatch(getMyTeachingCourse())])
  const course = useSelector((state: RootState) => state.courses.instructorList.filter((c) => c.id === courseId)[0])
  return (
    <div className='cml'>
      {isFetched && (
        <>
          <Header course={course} />
          <div className='cml-content'>
            <Sidenav />
            <div className='cml-main'>
              <Outlet />
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  )
}

export default CourseManagementLayout
