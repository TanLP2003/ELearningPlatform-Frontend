import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import './RootLayout.scss'

const RootLayout: React.FC = () => {
  return (
    <div className='root-layout'>
      <Navbar />
      {/* <div style={{height: '100vh'}}> */}
      <div>
        <Outlet />
      </div>
      {/* </div> */}
      <Footer />
    </div>
  )
}

export default RootLayout
