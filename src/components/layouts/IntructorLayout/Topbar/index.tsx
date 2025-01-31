import { AppDispatch } from '~/redux'
import './Topbar.scss'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '~/redux/actions/auth-actions'
import Popover from '~/components/common/Popover'

const Topbar: React.FC = () => {
  const currentUser = localStorage.getItem('currentUser')
  let userData = null
  if (currentUser) {
    userData = JSON.parse(currentUser) as User
  }
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/auth')
      })
  }
  return (
    <div className='topbar'>
      {/* <div className='topbar-link'>logo icon</div> */}
      <Popover
        right={12}
        refElement={
          <div className='navbar-user'>
            <div>{getInitials(userData!.userName)}</div>
          </div>
        }
        content={
          <div className='popover-content'>
            <div className='profile'>
              <div className='profile-acronym'>
                <div>{getInitials(userData!.userName)}</div>
              </div>
              <div className='profile-detail'>
                <p className='profile-name'>{userData?.userName}</p>
                <p className='profile-email'>{userData?.email}</p>
              </div>
            </div>
            <div className='options'>
              <p className='text-hover options-item' onClick={() => navigate('/my-courses')}>
                Học tập
              </p>
              <p className='text-hover options-item' onClick={() => navigate('/cart')}>
                Giỏ hàng của tôi
              </p>
              <p className='text-hover options-item' onClick={() => navigate('/my-courses/wishlist')}>
                Mong muốn
              </p>
              <p className='text-hover options-item' onClick={() => navigate('/instructor')}>
                Bảng điều khiển của giảng viên
              </p>
            </div>
            <div className='options'>
              <p className='text-hover options-item'>Thông báo</p>
              <p className='text-hover options-item'>Tin nhắn</p>
            </div>
            <div className='options'>
              <p className='text-hover options-item'>Cài đặt tài khoản</p>
              <p className='text-hover options-item'>Phương thức thanh toán</p>
              <p className='text-hover options-item'>Thuê bao</p>
              <p className='text-hover options-item'>Ưu đãi ELearning</p>
              <p className='text-hover options-item'>Lịch sử mua</p>
            </div>
            <div className='options'>
              <p className='text-hover options-item' onClick={() => navigate(`/user/${userData?.id}`)}>
                Hồ sơ công khai
              </p>
              <p className='text-hover options-item' onClick={() => navigate('/instructor/profile')}>
                Chỉnh sửa hồ sơ
              </p>
            </div>
            <div className='options'>
              <p className='text-hover options-item'>Trợ giúp</p>
              <p className='text-hover options-item' onClick={handleLogout}>
                Đăng xuất
              </p>
            </div>
          </div>
        }
      />
      <div className='topbar-link text-hover'>
        <IoMdNotificationsOutline size={24} />
      </div>
      <div className='topbar-link text-hover' onClick={() => navigate('/')}>
        Học viên
      </div>
    </div>
  )
}
function getInitials(name: string) {
  const words = name.split(' ')
  if (words.length <= 2) {
    return words.map((word) => word.charAt(0).toUpperCase()).join('')
  } else {
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
  }
}
export default Topbar
