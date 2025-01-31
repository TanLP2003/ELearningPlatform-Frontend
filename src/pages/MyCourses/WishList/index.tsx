import { AppDispatch, RootState } from '~/redux'
import './WishList.scss'
import { useDispatch } from 'react-redux'
import useFetchData from '~/components/hooks/useFetchData'
import { getWishList } from '~/redux/actions/course-actions'
import { useSelector } from 'react-redux'
import CourseCard from '~/components/common/CourseCard'
import { useNavigate } from 'react-router-dom'

const WishList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const isFetched = useFetchData(() => [dispatch(getWishList())])
  const wishList = useSelector((state: RootState) => state.courses.wishList)
  const handleClickCard = (courseId: string) => {
    navigate(`/course/${courseId}`)
  }
  return (
    <>
      {isFetched && (
        <div className='wish-list'>
          {wishList.map((item, index) => {
            return <CourseCard course={item} key={index} handleClick={() => handleClickCard(item.courseId!)} />
          })}
        </div>
      )}
    </>
  )
}

export default WishList
