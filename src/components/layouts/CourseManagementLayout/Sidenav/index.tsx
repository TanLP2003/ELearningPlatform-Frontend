import { useState } from 'react'
import './Sidenav.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch, useSelector } from 'react-redux'
import { publishCourse } from '~/redux/actions/course-actions'
import { toast } from 'react-toastify'
import { setLoading } from '~/redux/features/loadingSlice'

const Sidenav: React.FC = () => {
  const [section, setSection] = useState(1)
  const navigate = useNavigate()
  const handleNavigateSection = (section: number, route: string) => {
    setSection(section)
    navigate(route)
  }
  const { courseId } = useParams()
  const course = useSelector((state: RootState) => state.courses.instructorList.filter((c) => c.id === courseId)[0])

  const dispatch: AppDispatch = useDispatch()
  const handlePublishCourse = () => {
    dispatch(setLoading(true))
    dispatch(publishCourse(courseId!))
      .unwrap()
      .then(() => toast.success('Cập nhật thành công'))
      .catch((err) => toast.error('Cập nhật thất bại'))
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
  return (
    <div className='sidenav'>
      <p>Lên kế hoạch cho khóa học của bạn</p>
      <ul>
        <li className={section === 1 ? 'sidenav-active' : ''} onClick={() => handleNavigateSection(1, '')}>
          Trang tổng quan khóa học
        </li>
        <li className={section === 2 ? 'sidenav-active' : ''} onClick={() => handleNavigateSection(2, 'structure')}>
          Cấu trúc khóa học
        </li>
      </ul>
      {course.visuability.toString() === '0' ? (
        <div className='sidenav-publish-btn' onClick={handlePublishCourse}>
          Công khai khóa học
        </div>
      ) : (
        <div className='sidenav-publish-btn'>Lưu trữ khóa học</div>
      )}
    </div>
  )
}

export default Sidenav
