import './Intro.scss'
import { MdLanguage, MdOndemandVideo } from 'react-icons/md'
import img_holder from '../../../assets/placeholder.jpg'
import { FaRegHeart, FaRegFile, FaAward } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { IoMdPhonePortrait, IoIosInfinite, IoIosInformationCircle } from 'react-icons/io'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import { addCartItem, buyNow, getBasket } from '~/redux/actions/basket-actions'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setLoading } from '~/redux/features/loadingSlice'
import { getMyTeachingCourse, getWishList, likeCourse, unLikeCourse } from '~/redux/actions/course-actions'
import useFetchData from '~/components/hooks/useFetchData'
import { getAllEnrolledCourses } from '~/redux/actions/learning-action'
import CourseRating from '~/components/common/CourseRating'

interface IntroProps {
  course: CourseViewing | null
}

const Intro: React.FC<IntroProps> = ({ course }) => {
  const { courseId } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state: RootState) => state.users.currentUser)
  const isAdded = useSelector((state: RootState) => state.basket.items.map((i) => i.courseId).includes(courseId))
  const isLiked = useSelector((state: RootState) => state.courses.wishList.map((i) => i.courseId).includes(courseId))
  const isBuyed = useSelector((state: RootState) =>
    state.learnings.enrolledCourses.map((i) => i.courseId).includes(courseId!)
  )
  const isOwned = useSelector((state: RootState) => state.courses.instructorList.map((i) => i.id).includes(courseId!))
  const isFetched = useFetchData(() => [
    dispatch(getWishList()),
    dispatch(getBasket()),
    dispatch(getMyTeachingCourse()),
    dispatch(getAllEnrolledCourses())
  ])
  const handleAddToBasket = () => {
    dispatch(setLoading(true))
    dispatch(
      addCartItem({
        courseId: courseId!,
        courseName: course!.title,
        courseImage: course!.courseImage,
        authorId: course?.instructorId,
        authorName: course?.instructorName,
        price: course?.price
      })
    )
      .unwrap()
      .then(() => toast.success('Đã thêm khóa học vào giỏ hàng'))
      .catch(() => toast.error('Thêm khóa học vào giỏ hàng thất bại'))
      .finally(() => dispatch(setLoading(false)))
  }
  const handleAddToFavor = () => {
    dispatch(setLoading(true))
    dispatch(likeCourse(courseId!))
      .unwrap()
      .then(() => toast.success('Đã thêm khóa học vào mục yêu thích'))
      .catch(() => toast.error('Thêm thất bại'))
      .finally(() => dispatch(setLoading(false)))
  }
  const handleUnlikeCourse = () => {
    dispatch(setLoading(true))
    dispatch(unLikeCourse(courseId!))
      .unwrap()
      .then(() => toast.success('Đã xóa khóa học khỏi mục yêu thích'))
      .catch(() => toast.error('Xóa thất bại'))
      .finally(() => dispatch(setLoading(false)))
  }
  const handlePurchaseNow = () => {
    dispatch(
      buyNow({
        courseId: courseId!
      })
    )
      .unwrap()
      .then((result) => {
        window.location.replace(result.redirectUrl)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      {isFetched && (
        <div className='course-viewing-intro'>
          <div className='course-viewing-intro-wrapper'>
            <div className='course-viewing-intro-category'>{course?.category}</div>
            <div className='course-viewing-intro-name'>
              <h1>{course?.title}</h1>
            </div>
            <div className='course-viewing-intro-description'>{course?.description}</div>
            <CourseRating rating={course?.metadata?.rating} totalRatings={course?.metadata?.reviewCount} />
            <div className='course-viewing-intro-author'>
              <p>
                Được tạo bởi <span>{course?.instructorName}</span>
              </p>
            </div>
            <div className='course-viewing-intro-language'>
              <MdLanguage />
              <span>{course?.language}</span>
            </div>
          </div>
          <div className='course-viewing-sidebar'>
            <div className='course-viewing-sidebar-image'>
              <img src={course?.courseImage ?? img_holder} alt='' />
            </div>
            <div className='course-viewing-sidebar-body'>
              {!isBuyed && !isOwned ? (
                <div className='course-viewing-sidebar-not-buyed'>
                  <h2>đ {course?.price?.toLocaleString('vi-VN')}</h2>
                  <div className='course-viewing-sidebar-group-btn'>
                    {!isAdded ? (
                      <div className='course-viewing-sidebar-add-basket' onClick={handleAddToBasket}>
                        Thêm vào giỏ hàng
                      </div>
                    ) : (
                      <div className='course-viewing-sidebar-add-basket' onClick={() => navigate('/cart')}>
                        Chuyển đến giỏ hàng
                      </div>
                    )}
                    {!isLiked ? (
                      <div className='course-viewing-sidebar-btn' onClick={handleAddToFavor}>
                        <FaRegHeart size={24} />
                      </div>
                    ) : (
                      <div className='course-viewing-sidebar-btn' onClick={handleUnlikeCourse}>
                        <FaHeart size={24} />
                      </div>
                    )}
                  </div>
                  <div className='course-viewing-sidebar-btn' onClick={() => handlePurchaseNow()}>
                    Mua ngay
                  </div>
                </div>
              ) : (
                <div className='course-viewing-sidebar-buyed'>
                  <p>
                    <span>
                      <IoIosInformationCircle size={24} />
                    </span>
                    <span>
                      <b>{!isOwned ? 'Bạn đã mua khóa học này' : 'Bạn sở hữu khóa học này'}</b>
                    </span>
                  </p>
                  <div
                    onClick={() =>
                      !isOwned ? navigate(`/learning/${courseId}`) : navigate(`/instructor/${courseId}/manage`)
                    }
                  >
                    Chuyển đến khóa học
                  </div>
                </div>
              )}
              <p style={{ textAlign: 'center' }}>
                <small>Đảm bảo hoàn tiền trong 30 ngày</small>
              </p>
              <div className='course-viewing-sidebar-common'>
                <p>
                  <b>Khóa học này bao gồm</b>
                </p>
                <p>
                  <MdOndemandVideo />
                  <span>56 giờ video theo yêu cầu</span>
                </p>
                <p>
                  <FaRegFile />
                  <span>2 bài viết</span>
                </p>
                <p>
                  <IoMdPhonePortrait />
                  <p>Truy cập trên thiết bị di động và TV</p>
                </p>
                <p>
                  <IoIosInfinite />
                  <span>Quyền truy cập đầy đủ suốt đời</span>
                </p>
                <p>
                  <FaAward />
                  <span>Giấy chứng nhận hoàn thành</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Intro
