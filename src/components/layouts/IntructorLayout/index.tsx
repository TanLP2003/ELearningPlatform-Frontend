import { Outlet } from 'react-router-dom'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Footer from '../RootLayout/Footer'
import './IntructorLayout.scss'

const InstructorLayout: React.FC = () => {
  return (
    <div className='instructor'>
      <Topbar />
      <Sidebar />
      <div className='instructor-body'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default InstructorLayout
