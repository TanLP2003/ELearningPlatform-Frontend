import './CourseInstructor.scss'
import { IoIosSearch } from 'react-icons/io'
import img_placeholder from '../../assets/placeholder.jpg'
import useModal from '~/components/hooks/useModal'
import CreateCourseModal from './CreateCourseModal'
import useFetchData from '~/components/hooks/useFetchData'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import { getMyTeachingCourse } from '~/redux/actions/course-actions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CourseInstructor: React.FC = () => {
  const { isOpenModal, openModal, closeModal } = useModal()
  const dispatch: AppDispatch = useDispatch()
  const courseList = useSelector((state: RootState) => state.courses.instructorList)
  const isFetched = useFetchData(() => [dispatch(getMyTeachingCourse())])
  const navigate = useNavigate()
  const redirectToCourseManage = (courseId: string) => {
    navigate(`/instructor/${courseId}/manage`)
  }
  return (
    <>
      <div className='cm'>
        <div className='cm-body'>
          <h1 className='cm-title'>Khóa học</h1>
          <div className='cm-group'>
            <div className='cm-group-search'>
              <div className='cm-group-search-input'>
                <input type='text' placeholder='Tìm kiếm khóa học của bạn' />
              </div>
              <div className='cm-group-search-icon'>
                <IoIosSearch size={20} color='#fff' />
              </div>
            </div>
            <div className='cm-group-new' onClick={openModal}>
              Khóa học mới
            </div>
          </div>
          {isFetched && (
            <div className='cm-list'>
              {courseList.map((item, index) => {
                return (
                  <div key={index} className='cm-list-item' onClick={() => redirectToCourseManage(item.id)}>
                    <img src={item.courseImage ?? img_placeholder} />
                    <div className='cm-list-item-content'>
                      <p>
                        <b>{item.title}</b>
                      </p>
                      <p>
                        <b>{item.visuability == '0' ? 'Bản nháp' : 'Công khai'}</b>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      {isOpenModal && <CreateCourseModal closeModal={closeModal} />}
    </>
  )
}

export default CourseInstructor
