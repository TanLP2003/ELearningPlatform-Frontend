import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import './Header.scss'

interface HeaderProps {
  course: Course
}

const Header: React.FC<HeaderProps> = ({ course }) => {
  return (
    <div className='watching-header'>
      <a href={'/my-courses'} className='watching-header-s1'>
        {/* <h2>
          <span className='text-purple'>E</span>Learning
        </h2> */}
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
          <IoIosArrowBack className='text-purple' />
          <span>
            <b>Quay lại danh sách học tập</b>
          </span>
        </p>
      </a>
      <div className='learning-header-s2'>
        <p>{course.title}</p>
      </div>
    </div>
  )
}

export default Header
