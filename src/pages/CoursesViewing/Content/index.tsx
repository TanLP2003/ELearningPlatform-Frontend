import { useState } from 'react'
import './Content.scss'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdOndemandVideo } from 'react-icons/md'

interface ContentProps {
  course: CourseViewing | null
}

const Content: React.FC<ContentProps> = ({ course }) => {
  const sectionLen = course?.sections.length
  const lectureLen = course?.sections.reduce((prevSum, current) => prevSum + current.lectures.length, 0)
  return (
    <div className='course-viewing-body'>
      <h2>Nội dung khóa học</h2>
      <p>
        {sectionLen} phần • {lectureLen} bài giảng
      </p>
      <div className='course-viewing-body-section-list'>
        {course?.sections.map((item, index) => {
          return <SectionItem key={index} section={item} />
        })}
      </div>
    </div>
  )
}

interface SectionItemProps {
  section: SectionViewing
}

const SectionItem: React.FC<SectionItemProps> = ({ section }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  return (
    <>
      <div className='course-viewing-body-section-item' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <p>
          {!isDropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          <b>{section.name}</b>
        </p>
        <p>{section.lectures.length} bài giảng</p>
      </div>
      {isDropdownOpen && (
        <div className='course-viewing-body-lecture-list'>
          {section.lectures.map((item, index) => {
            return (
              <div key={index} className='course-viewing-body-lecture-item'>
                <MdOndemandVideo />
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Content
