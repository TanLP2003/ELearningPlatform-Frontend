import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './MyCourse.scss'
import { useState } from 'react'

const MyCourse: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathName = location.pathname.split('/')
  const lastPathString = pathName[pathName.length - 1]
  return (
    <div className='mycourse'>
      <div className='mycourse-header'>
        <h1>Học tập</h1>
        <div className='mycourse-nav'>
          <div
            className={'mycourse-nav-link ' + (lastPathString === 'my-courses' ? 'mycourse-nav-active' : '')}
            onClick={() => navigate('')}
          >
            Tất cả khóa học
          </div>
          {/* <div
            onClick={() => handleOnClick(2, 'lists')}
            className={'mycourse-nav-link ' + (section === 2 ? 'mycourse-nav-active' : '')}
          >
            Danh sách của tôi
          </div> */}
          <div
            onClick={() => navigate('wishlist')}
            className={'mycourse-nav-link ' + (lastPathString === 'wishlist' ? 'mycourse-nav-active' : '')}
          >
            Mong muốn
          </div>
          <div
            onClick={() => navigate('archieved')}
            className={'mycourse-nav-link ' + (lastPathString === 'archieved' ? 'mycourse-nav-active' : '')}
          >
            Lưu trữ
          </div>
        </div>
      </div>
      <div className='mycourse-body'>
        <Outlet />
      </div>
    </div>
  )
}

export default MyCourse
