import './Navbar.scss'
import { FaRegHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import Popover from '~/components/common/Popover'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import { logout } from '~/redux/actions/auth-actions'
import SearchBar from './SearchBar'
import { setLoading } from '~/redux/features/loadingSlice'
import useFetchData from '~/components/hooks/useFetchData'
import { getAllCategories } from '~/redux/actions/course-actions'
import { useSelector } from 'react-redux'
import { getInitials } from '~/redux/config'
import { ApolloProvider } from '@apollo/client'
import { client } from '~/graphql/client'

const Navbar: React.FC = () => {
  const currentUser = localStorage.getItem('currentUser')
  let userData = null
  if (currentUser) {
    userData = JSON.parse(currentUser) as User
  }
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const isFetched = useFetchData(() => [dispatch(getAllCategories())])
  const categories = useSelector((state: RootState) => state.courses.categories)
  const handleLogout = () => {
    dispatch(setLoading(true))
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate('/auth')
      })
      .finally(() => dispatch(setLoading(false)))
  }
  return (
    <nav className='navbar-wrapper'>
      <a className='navbar-brand' href='/'>
        ELearning
      </a>
      <Popover
        refElement={<div className='navbar-category'>Thể loại</div>}
        content={
          <div className='popover-content'>
            {isFetched && (
              <div className='category-list'>
                {categories.map((category) => {
                  return <div className='category-item'>{category.name}</div>
                })}
              </div>
            )}
          </div>
        }
      />
      <ApolloProvider client={client}>
        <SearchBar />
      </ApolloProvider>
      <span>Elearning Business</span>
      <span className='navbar-teacher' onClick={() => navigate('instructor')}>
        Giảng viên
      </span>
      <span className='navbar-learning' onClick={() => navigate('/my-courses')}>
        Học tập
      </span>
      <div className='navbar-heart' onClick={() => navigate('/my-courses/wishlist')}>
        <FaRegHeart size={24} />
      </div>

      <div className='navbar-cart' onClick={() => navigate('cart')}>
        <MdOutlineShoppingCart size={24} />
      </div>
      <div className='navbar-notification'>
        <IoMdNotificationsOutline size={24} />
      </div>
      {!currentUser ? (
        <div className='navbar-group-btn'>
          <button className='navbar-login' onClick={() => navigate('/auth')}>
            Đăng nhập
          </button>
          {/* <button className='navbar-register' onClick={() => navigate('/auth/register')}>
            Đăng ký
          </button> */}
        </div>
      ) : (
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
                <p className='text-hover options-item' onClick={() => navigate('/my-courses/')}>
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
      )}
    </nav>
  )
}

export default Navbar
