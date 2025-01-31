import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './SearchPage.scss'
import img_default from '../../assets/course_image_default.jpg'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import useFetchData from '~/components/hooks/useFetchData'
import { getAllCourse } from '~/redux/actions/course-actions'
import CourseRating from '~/components/common/CourseRating'
import { getLevel } from '~/redux/config'

const SearchPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('query')
  const dispatch: AppDispatch = useDispatch()
  const isFetched = useFetchData(() => [dispatch(getAllCourse())])
  console.log(searchQuery?.toLocaleLowerCase())
  const publicCourse = useSelector((state: RootState) => state.courses.publicCourse)

  const getClassForLevel = (level: string) => {
    if (level === '0') return 'search-page-item-level-beginner'
    else if (level === '1') return 'search-page-item-level-middle'
    else if (level === '2') return 'search-page-item-level-advanced'
  }
  const handleClickItem = (courseId: string) => {
    navigate(`/course/${courseId}`)
  }
  return (
    isFetched && (
      <div className='search-page'>
        <div>
          <h1>
            {publicCourse.filter((i) => i.title.toLocaleLowerCase().includes(searchQuery!.toLowerCase())).length} kết
            quả cho "{searchQuery}"
          </h1>
        </div>
        <div className='search-page-list'>
          {publicCourse
            .filter((i) => i.title.toLocaleLowerCase().includes(searchQuery!.toLowerCase()))
            .map((item, index) => {
              return (
                <div key={index} className='search-page-item' onClick={() => handleClickItem(item.id)}>
                  <div className='search-page-item-image'>
                    <img src={item.courseImage ?? img_default} className='img-cover' />
                  </div>
                  <div className='search-page-item-body'>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p style={{ fontSize: '0.9rem', color: '#3d3d3d' }}>{item.instructorName}</p>
                    <CourseRating rating={item.metadata?.rating} totalRatings={item.metadata?.reviewCount} />
                    <p style={{ color: '#3d3d3d' }}>
                      <span>Tổng số {item.sections.length} phần </span>•
                      <span>
                        {` ${item.sections.reduce((prevSum, currentValue) => prevSum + currentValue.lectures.length, 0)} Bài giảng `}
                      </span>
                      •<span>{' ' + getLevel(item.level.toString())}</span>
                    </p>

                    {/* <p className={'search-page-item-level ' + getClassForLevel(item.level.toString())}>
                      <b>{getLevel(item.level.toString())}</b>
                    </p> */}
                  </div>
                  <div className='search-page-item-price'>
                    <p>
                      <b>đ {item.price?.toLocaleString('vi-VN')}</b>
                    </p>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  )
}

export default SearchPage
