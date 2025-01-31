import { useState } from 'react'
import './CourseContentNav.scss'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdCheckBoxOutlineBlank, MdOndemandVideo } from 'react-icons/md'
import { AppDispatch } from '~/redux'
import { useDispatch } from 'react-redux'
import { setLearningLecture } from '~/redux/features/courseSlice'

interface CourseContentNavProps {
  sections: Section[]
}

const CourseContentNav: React.FC<CourseContentNavProps> = ({ sections }) => {
  return (
    <div className='content-nav'>
      <div className='content-nav-header'>Nội dung khóa học</div>
      <div className='content-nav-list'>
        <div className='content-nav-list-wrapper'>
          {sections.map((item, index) => {
            return <SectionDropdown key={index} section={item} />
          })}
        </div>
      </div>
    </div>
  )
}

interface SectionDropdownProps {
  section: Section
}

const SectionDropdown: React.FC<SectionDropdownProps> = ({ section }) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const handleLectureClick = (lecture: Lecture) => {
    dispatch(setLearningLecture(lecture))
  }
  return (
    <div className='content-nav-item-wrapper'>
      <div className='content-nav-item' onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
        <div className='content-nav-item-header'>
          <h4>{section.name}</h4>
          {!isOpenDropdown ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
        <p>
          <small>{section.lectures.length} bài giảng</small>
        </p>
      </div>
      {isOpenDropdown && (
        <div className='section-dropdown-list'>
          {section.lectures.map((item, index) => {
            return (
              <div key={index} className='section-dropdown-item-wrapper' onClick={() => handleLectureClick(item)}>
                <div className='section-dropdown-item'>
                  <MdCheckBoxOutlineBlank size={25} />
                  <div>
                    <p>
                      {item.lectureNumber}. {item.name}
                    </p>
                    <p>
                      <MdOndemandVideo />
                      <span>1 phút</span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CourseContentNav
