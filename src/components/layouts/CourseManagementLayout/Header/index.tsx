import { GrFormPrevious } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  course: Course | null
}

const Header: React.FC<HeaderProps> = ({ course }) => {
  const navigate = useNavigate()

  return (
    <div className='cml-header'>
      <div className='cml-header-back' onClick={() => navigate('/instructor')}>
        <GrFormPrevious size={24} />
        <p>Quay lại khóa học</p>
      </div>
      <div className='cml-header-course'>
        <h3>{course?.title}</h3>
      </div>

    </div>
  )
}

export default Header
