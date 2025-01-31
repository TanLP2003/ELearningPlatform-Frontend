import { Star, Weight } from 'lucide-react'
import './OverviewInfo.scss'
import { LuAlarmClock } from 'react-icons/lu'
import { getLevel } from '~/redux/config'

interface OverviewInfoProps {
  course: Course | null
}

const OverviewInfo: React.FC<OverviewInfoProps> = ({ course }) => {
  if (course === null) return null
  const reviewCount = course.metadata?.reviewCount ?? 0
  return (
    <div className='oi'>
      <p className='oi-title'>{course.title}</p>
      <div style={{ display: 'flex', gap: '30px', marginBottom: '10px' }}>
        <div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', fontWeight: 'bold' }}>
            <span>{course.metadata?.rating ?? 0}</span>
            <Star color='#fbbf24' fill='#fbbf24' />
          </div>
          <span style={{ fontSize: '0.9rem' }}>{reviewCount + ' xếp hạng'}</span>
        </div>
        {/* <div>
          <p style={{ fontWeight: 'bold' }}>
            <span>{course.metadata.rating}</span>
          </p>
          <span style={{ fontSize: '0.9rem' }}>{course.metadata.reviewCount + ' xếp hạng'}</span>
        </div> */}
      </div>
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
      <div className='oi-box'>
        <p style={{ marginRight: '150px', width: '150px' }}>Theo số liệu</p>
        <div>
          <p>Trình độ kỹ năng: {getLevel(course.level.toString())}</p>
          <p>Ngôn ngữ: {course.language}</p>
          <p>Phụ đề: Có</p>
          <p>Bài giảng: {course.sections.reduce((prevSum, current) => prevSum + current.lectures.length, 0)}</p>
        </div>
      </div>
      <div className='oi-box'>
        <p style={{ marginRight: '150px', width: '150px' }}>Giấy chứng nhận</p>
        <div>
          <p>Nhận giấy chứng nhận ELearning bằng cách hoàn thành toàn bộ khóa học</p>
          <p
            aria-disabled
            style={{
              marginTop: '5px',
              width: '300px',
              textAlign: 'center',
              fontWeight: 'bold',
              border: '1px solid black',
              padding: '5px 0',
              borderRadius: '5px'
            }}
          >
            Giấy chứng nhận ELearning
          </p>
        </div>
      </div>
      <div className='oi-box'>
        <p style={{ marginRight: '150px', width: '150px' }}>Đặc điểm</p>
        <div>
          <p>Hiện có sẵn trên iOS và Android</p>
        </div>
      </div>
      <div className='oi-box'>
        <p style={{ width: '150px', minWidth: '150px', marginRight: '150px' }}>Mô tả</p>
        <div style={{ flex: 1, maxWidth: 'calc(100% - 300px)' }}>
          <p>{course.description}</p>
        </div>
      </div>
    </div>
  )
}

export default OverviewInfo
