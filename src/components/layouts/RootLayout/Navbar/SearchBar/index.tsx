import { useLazyQuery } from '@apollo/client'
import { debounce } from 'lodash'
import { Fragment, KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useFetchData from '~/components/hooks/useFetchData'
import { SEARCH_QUERY } from '~/graphql/queries'
import { AppDispatch, RootState } from '~/redux'
import { getAllCourse } from '~/redux/actions/course-actions'

const SearchBar: React.FC = () => {
  // const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  // const publicCourse = useSelector((state: RootState) => state.courses.publicCourse)
  // const isFetched = useFetchData(() => [dispatch(getAllCourse())])
  const [searchTerm, setSearchTerm] = useState<string>('')
  // const [resultSearch, setResultSearch] = useState<Course[]>([])
  const [openSearch, setOpenSearch] = useState(false)

  const [search, { loading, data }] = useLazyQuery<{ search: SearchResult }>(SEARCH_QUERY)
  const [resultSearch, setResultSearch] = useState<SearchCourse[]>([])
  useEffect(() => {
    if (data?.search) {
      setResultSearch(data.search.courses)
    }
  }, [loading])
  const debouncedSearch = useMemo(
    () =>
      debounce((searchTerm: string) => {
        if (searchTerm.length >= 2) {
          setSearchTerm(searchTerm)
          search({ variables: { searchTerm } })
          setOpenSearch(true)
        } else {
          setOpenSearch(false)
        }
      }, 300),
    [search]
  )

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearchTerm(query)
    if (query.trim().length >= 2) {
      debouncedSearch(query)
    } else {
      setResultSearch([])
    }
    // if (query.trim().length > 0) {
    //   const result = publicCourse.filter((i) => i.title.includes(query.toLocaleLowerCase()))
    //   setResultSearch(result)
    // } else {
    //   if (isFetched) {
    //     setResultSearch(publicCourse)
    //   } else setResultSearch([])
    // }
  }
  const handleSearchSubmit = () => {
    if (searchTerm.trim().length > 0) {
      navigate(`/search?query=${searchTerm}`)
      setSearchTerm('')
      setOpenSearch(false)
      // setResultSearch([])
    }
  }
  // useEffect(() => {
  //   if (isFetched) {
  //     setResultSearch(publicCourse)
  //   }
  // }, [isFetched])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchResultsRef = useRef<HTMLDivElement>(null)
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log(event.currentTarget)
    console.log(event.relatedTarget)
    console.log(searchInputRef.current!.contains(event.currentTarget))
    console.log(searchResultsRef.current!.contains(event.currentTarget))
    console.log(searchResultsRef.current)
    if (
      !searchInputRef.current?.contains(event.relatedTarget) &&
      !searchResultsRef.current?.contains(event.relatedTarget)
    ) {
      setOpenSearch(false)
    }
  }
  // const handleFocus = () => {
  //   setOpenSearch(true)
  // }
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit()
    }
  }

  return (
    <div className='navbar-search-wrapper'>
      <div className='navbar-search'>
        <span className='navbar-search-btn'>
          <IoIosSearch size={24} />
        </span>
        <input
          type='text'
          placeholder='Tìm kiếm nội dung bất kỳ'
          value={searchTerm}
          // onChange={(e) => debouncedSearch(e.target.value)}
          onChange={handleInputChange}
          // onFocus={handleFocus}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          ref={searchInputRef}
        />
        {openSearch && !loading && (
          // <div className='navbar-search-result' ref={searchResultsRef}>
          <div className='navbar-search-result' ref={searchResultsRef}>
            <div className='navbar-search-result-list'>
              {resultSearch.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='navbar-search-result-item'
                    onMouseDown={() => navigate(`/course/${item.courseId}`)}
                  >
                    <span className='navbar-search-btn'>
                      <IoIosSearch size={18} />
                    </span>
                    <div style={{ flex: '1' }}>
                      <p>
                        <b>{item.courseTitle}</b>
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'center',
                          fontSize: '0.8rem',
                          marginTop: '3px',
                          color: '#6a6f73'
                        }}
                      >
                        <span>
                          <b> Khóa học</b>
                        </span>
                        <span>{item.instructorName}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              {data?.search.instructors.map((item, index) => {
                return (
                  <div
                    key={index}
                    className='navbar-search-result-item'
                    onMouseDown={() => navigate(`/user/${item.instructorId}`)}
                  >
                    <span className='navbar-search-btn'>
                      <IoIosSearch size={18} />
                    </span>
                    <div>
                      <p>
                        <b>{item.instructorName}</b>
                      </p>
                      <span style={{ fontSize: '0.8rem', color: '#6a6f73' }}>
                        <b>Giảng viên</b>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
