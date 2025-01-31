import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetchData from '~/components/hooks/useFetchData'
import { AppDispatch, RootState } from '~/redux'
import { getAllEnrolledCourses } from '~/redux/actions/learning-action'
import './ArchivedList.scss'
import CourseBox from '~/components/common/CourseBox'

const ArchievedList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const isFetched = useFetchData(() => [dispatch(getAllEnrolledCourses())])
  const achivedCourses = useSelector((state: RootState) =>
    state.learnings.enrolledCourses.filter((ec) => ec.isArchived)
  )
  const handleClickCard = (courseId: string) => {
    navigate(`/learning/${courseId}`)
  }
  return (
    <>
      {isFetched && (
        <>
          {achivedCourses.length > 0 ? (
            <div style={{ display: 'flex', gap: '20px' }}>
              {achivedCourses.map((item, index) => (
                <CourseBox course={item} key={index} handleClick={() => handleClickCard(item.courseId!)} />
              ))}
            </div>
          ) : (
            <div className='achived-course-empty'>
              <p className='text1'>Chỉ tập trung vào những khóa học quan trọng đối với bạn</p>
              <p className='text2'>
                <span onClick={() => navigate('/my-courses')}>Chuyển đến tab Tất cả các khóa học</span> để lưu trữ
              </p>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ArchievedList
