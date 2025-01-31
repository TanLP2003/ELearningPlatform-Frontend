import Footer from '~/components/layouts/RootLayout/Footer'
import './Watching.scss'
import VideoPlayer from '~/components/common/VideoPlayer'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux'
import { useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import OverviewInfo from './OverviewInfo'
import CourseNotification from './CourseNotification'
import CourseNotes from './CourseNotes'

interface WatchingProps {
  course: Course | null
}

const Watching: React.FC<WatchingProps> = ({ course }) => {
  const learningLecture = useSelector((state: RootState) => state.courses.learningLecture)
  const [tab, setTab] = useState<number>(1)
  return (
    <div className='watching'>
      <div>
        <VideoPlayer url={learningLecture?.lectureContentUrl ?? null} />
      </div>
      <div className='course-content'>
        <ul className='wt'>
          <li className='wt-item'>
            <IoMdSearch size={24} />
          </li>
          <li className={'wt-item' + (tab == 1 ? ' wt-item-active' : '')} onClick={() => setTab(1)}>
            Tổng quan
          </li>
          <li className={'wt-item' + (tab == 2 ? ' wt-item-active' : '')} onClick={() => setTab(2)}>
            Thông báo
          </li>
          <li className={'wt-item' + (tab == 3 ? ' wt-item-active' : '')} onClick={() => setTab(3)}>
            Ghi chú
          </li>
        </ul>
        {tab == 1 && <OverviewInfo course={course} />}
        {tab == 2 && <CourseNotification />}
        {tab == 3 && <CourseNotes />}
      </div>
    </div>
  )
}

export default Watching
