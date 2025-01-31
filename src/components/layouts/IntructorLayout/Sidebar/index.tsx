import './Sidebar.scss'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { ImProfile } from 'react-icons/im'
import { IoSettingsOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'

const Sidebar: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const handleSectionClick = (section: string) => {
    navigate(`/instructor/${section}`)
  }
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <h3 className='sidebar-logo'>E</h3>
        </li>
        <li
          className={location.pathname === '/instructor/' ? 'sidebar-icon-active' : ''}
          onClick={() => handleSectionClick('')}
        >
          <div className='sidebar-icon '>
            <MdOutlineOndemandVideo size={24} />
          </div>
        </li>
        <li
          className={location.pathname === '/instructor/profile' ? 'sidebar-icon-active' : ''}
          onClick={() => handleSectionClick('profile')}
        >
          <div className='sidebar-icon'>
            <ImProfile size={24} />
          </div>
        </li>
        <li>
          <div>
            <IoSettingsOutline size={24} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
