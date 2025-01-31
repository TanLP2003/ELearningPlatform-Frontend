import { LuAlarmClock } from 'react-icons/lu'
import './Learning.scss'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import useFetchData from '~/components/hooks/useFetchData'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllEnrolledCourses } from '~/redux/actions/learning-action'
import CourseBox from '~/components/common/CourseBox'

const Learning: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const isFetched = useFetchData(() => [dispatch(getAllEnrolledCourses())])
  const enrolledCourses = useSelector((state: RootState) =>
    state.learnings.enrolledCourses.filter((item) => !item.isArchived)
  )
  const handleClickCard = (courseId: string) => {
    navigate(`/learning/${courseId}`)
  }
  return (
    <div className='learning'>
      <div className='learning-schedule'>
        <div>
          <LuAlarmClock size={32} />
        </div>
        <div className='learning-schedule-content'>
          <h4>Lên lịch thời gian học</h4>
          <p>
            Học một chút mỗi ngày sẽ giúp bạn tích lũy kiến thức. Nghiên cứu cho thấy rằng những học viên biến việc học
            thành thói quen sẽ có nhiều khả năng đạt được mục tiêu hơn. Hãy dành thời gian để học và nhận lời nhắc bằng
            cách sử dụng trình lên lịch học tập.
          </p>
          <span className='learning-schedule-begin'>Bắt đầu</span>
          <span className='learning-schedule-cancel'>Hủy bỏ</span>
        </div>
      </div>

      {isFetched && (
        <div className='learning-list'>
          {enrolledCourses.map((item, index) => (
            <CourseBox course={item} key={index} handleClick={() => handleClickCard(item.courseId!)} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Learning
