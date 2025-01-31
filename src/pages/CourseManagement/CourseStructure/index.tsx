import { useNavigate, useParams } from 'react-router-dom'
import './CourseStructure.scss'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { IoIosAdd } from 'react-icons/io'
import { FaCheckCircle } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp, IoIosClose, IoIosSearch } from 'react-icons/io'
import authAxios from '~/redux/authAxios'
import { SERVER } from '~/redux/config'
import { AxiosProgressEvent, AxiosResponse } from 'axios'
import useFetchData from '~/components/hooks/useFetchData'
import { getUploadedListByUser, uploadLectureVideo } from '~/redux/actions/resource-actions'
import { MdDelete } from 'react-icons/md'
import thumbnail_holder from '../../../assets/placeholder.jpg'
import { MdModeEdit } from 'react-icons/md'
import {
  addDescriptionForLecture,
  createLecture,
  createSection,
  getMyTeachingCourse,
  selectVideoForLecture
} from '~/redux/actions/course-actions'
import { toast } from 'react-toastify'

const CourseStructure: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { courseId } = useParams()
  console.log(courseId)
  const course = useSelector((state: RootState) => state.courses.instructorList.filter((c) => c.id === courseId)[0])
  // const isFetched = useFetchData(() => [dispatch()])
  console.log(course)
  const [isCreateSectionOpen, setCreateSectionOpen] = useState(false)
  return (
    <div className='cs'>
      <div className='cs-header'>
        <h2>Chương trình giảng dạy</h2>
      </div>
      <div className='cs-body'>
        <div className='cs-section-list'>
          {course.sections.map((section, index) => {
            return <Section key={index} section={section} />
          })}
        </div>
        {isCreateSectionOpen ? (
          <CreateSection courseId={course.id} closeCreateSection={() => setCreateSectionOpen(false)} />
        ) : (
          <div className='add-btn' onClick={() => setCreateSectionOpen(true)}>
            <IoIosAdd size={20} />
            <span>Phần</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface CreateSectionProps {
  courseId: string
  closeCreateSection: Function
}

const CreateSection: React.FC<CreateSectionProps> = ({ courseId, closeCreateSection }) => {
  const dispatch: AppDispatch = useDispatch()
  const schema = Yup.object({
    courseId: Yup.string().required(),
    sectionName: Yup.string().required('Tên của phần là bắt buộc')
  })
  const formik = useFormik({
    initialValues: {
      courseId: courseId,
      sectionName: ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createSection(values))
        .unwrap()
        .then(() => {
          toast.success('Create section successfully')
        })
        .catch((err) => {
          toast.error(err)
        })
        .finally(() => closeCreateSection())
    }
  })

  return (
    <form className='create-section' onSubmit={formik.handleSubmit}>
      <div className='create-section-body'>
        <label htmlFor='sectionTitle'>
          <b>Phần mới</b>
        </label>
        <input
          type='text'
          id='sectionTitle'
          name='sectionName'
          placeholder='Nhập tiêu đề'
          value={formik.values.sectionName}
          onChange={formik.handleChange}
        />
      </div>
      <div className='create-section-btn'>
        <button type='submit' className='create-section-btn-add'>
          Thêm phần
        </button>
        <span onClick={() => closeCreateSection()}>Hủy</span>
      </div>
    </form>
  )
}

interface SectionProps {
  section: Section
}

const Section: React.FC<SectionProps> = ({ section }) => {
  const [isCreateLectureOpen, setIsCreateLectureOpen] = useState(false)
  return (
    <div className='cs-section'>
      <div className='cs-section-name'>
        <div>
          <b>Phần {section.sectionNumber}:</b>
        </div>
        <div>{section.name}</div>
      </div>
      <div className='cs-section-lecture-list'>
        {section.lectures.map((lecture, index) => {
          return <Lecture key={index} lecture={lecture} />
        })}
        {isCreateLectureOpen ? (
          <CreateLecture
            courseId={section.courseId}
            sectionId={section.id}
            closeCreateLecture={() => setIsCreateLectureOpen(false)}
          />
        ) : (
          <div className='add-btn' onClick={() => setIsCreateLectureOpen(true)}>
            <IoIosAdd size={20} />
            <span>Mục trong khung chương trình</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface CreateLectureProps {
  courseId: string
  sectionId: string
  closeCreateLecture: Function
}

const CreateLecture: React.FC<CreateLectureProps> = ({ courseId, sectionId, closeCreateLecture }) => {
  const dispatch: AppDispatch = useDispatch()
  const lectureFormik = useFormik({
    initialValues: {
      courseId: courseId,
      sectionId: sectionId,
      title: ''
    },
    validationSchema: Yup.object({
      courseId: Yup.string().required(),
      sectionId: Yup.string().required(),
      title: Yup.string().required('title is required!')
    }),
    onSubmit: (values) => {
      dispatch(createLecture(values))
        .unwrap()
        .then(() => {
          toast.success('Create lecture successfully')
        })
        .catch((err) => {
          toast.error(err)
        })
        .finally(() => closeCreateLecture())
    }
  })
  return (
    <form className='create-lecture' onSubmit={lectureFormik.handleSubmit}>
      <div className='create-lecture-body'>
        <label htmlFor='lectureTitle'>
          <b>Bài giảng mới</b>
        </label>
        <input
          type='text'
          id='lectureTitle'
          name='title'
          placeholder='Nhập tiêu đề'
          value={lectureFormik.values.title}
          onChange={lectureFormik.handleChange}
        />
        {lectureFormik.errors && lectureFormik.errors.title && <p>{lectureFormik.errors.title}</p>}
      </div>
      <div className='create-lecture-btn'>
        <button type='submit' className='create-lecture-btn-add'>
          Thêm bài giảng
        </button>
        <span onClick={() => closeCreateLecture()}>Hủy</span>
      </div>
    </form>
  )
}

interface LectureProps {
  lecture: Lecture
}

const Lecture: React.FC<LectureProps> = ({ lecture }) => {
  const dispatch: AppDispatch = useDispatch()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isAddDescriptionOpen, setIsAddDescriptionOpen] = useState(false)
  const [isAddContentOpen, setIsAddContentOpen] = useState(false)
  const [tab, setTab] = useState(1)
  const chooseVideoRef = useRef<HTMLInputElement>(null)
  const [video, setVideo] = useState<File | undefined>(undefined)
  const [progress, setProgress] = useState<number | string>('Process...')
  const isFetched = useFetchData(() => [dispatch(getUploadedListByUser())])
  const resource = useSelector((state: RootState) => state.resources.resources)
  const { courseId } = useParams()
  const [uploadVideoDisable, setUploadVideoDisabled] = useState(false)

  const descriptionFormik = useFormik({
    initialValues: {
      description: lecture.description ?? ''
    },
    validationSchema: Yup.object({
      description: Yup.string().required()
    }),
    onSubmit: (values) => {
      dispatch(
        addDescriptionForLecture({
          lectureId: lecture.id,
          courseId: courseId,
          description: values.description
        })
      )
        .unwrap()
        .then(() => {
          console.log('Add description success')
          setIsAddDescriptionOpen(false)
        })
        .catch((err) => console.log('add description failed', err))
    }
  })
  const handleSelectVideo = (videoId: string) => {
    setUploadVideoDisabled(true)
    dispatch(
      selectVideoForLecture({
        videoId: videoId,
        lectureId: lecture.id,
        courseId: courseId!
      })
    )
      .unwrap()
      .then(() => {
        console.log('select success')
      })
      .catch((err: any) => console.log('Select error: ', err))
      .finally(() => {
        setUploadVideoDisabled(false)
        window.location.reload()
      })
  }
  const handleVideoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return
    setVideo(file)
    const formData = new FormData()
    formData.append('file', file)
    setUploadVideoDisabled(true)
    // authAxios
    //   .post(`${SERVER}/video-manager/${lecture.id}`, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //     // onUploadProgress: (progressEvent: AxiosProgressEvent) => {
    //     //   if (progressEvent.total) {
    //     //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //     //     setProgress(percentCompleted)
    //     //   }
    //     // }
    //   })
    dispatch(
      uploadLectureVideo({
        formData: formData,
        lectureId: lecture.id
      })
    )
      .unwrap()
      .then((result) => {
        console.log('upload successfull', result)
        setProgress('Done')
      })
      .catch((err: Error) => {
        console.log('Error uploading file', err)
      })
      .finally(() => {
        setUploadVideoDisabled(false)
        // setIsDropdownOpen(false)
        // dispatch(getMyTeachingCourse())
        window.location.reload()
      })
  }
  return (
    <div className='cs-lecture-wrapper'>
      <div className='cs-lecture'>
        <div className='cs-lecture-body'>
          <FaCheckCircle />
          <p>
            Bài giảng {lecture.lectureNumber}: {lecture.name}
          </p>
          {lecture.lectureContentUrl === null && !isAddContentOpen && (
            <>
              <div
                className='add-btn'
                onClick={() => {
                  setIsAddContentOpen(true)
                  setIsDropdownOpen(false)
                }}
              >
                <IoIosAdd size={15} />
                <span>Nội dung</span>
              </div>
            </>
          )}
          {!isAddContentOpen &&
            (!isDropdownOpen ? (
              <IoIosArrowDown size={20} style={{ cursor: 'pointer' }} onClick={() => setIsDropdownOpen(true)} />
            ) : (
              <IoIosArrowUp size={20} style={{ cursor: 'pointer' }} onClick={() => setIsDropdownOpen(false)} />
            ))}
        </div>
      </div>
      {isDropdownOpen && (
        <div className='cs-lecture-dropdown'>
          {!isAddContentOpen && lecture.lectureContentUrl !== null && (
            <div className='cs-lecture-video-display'>
              <div className='cs-lecture-video-display-container'>
                <div className='cs-lecture-video-display-thumbnail'>
                  <img src={lecture.videoThumbnail ?? thumbnail_holder} className='img-cover' />
                </div>
                <div style={{ width: '100%' }}>
                  <div className='cs-lecture-video-display-info'>
                    <div>
                      <h4>{lecture.videoName ?? 'Undefined Name'}</h4>
                      <p>03:39</p>
                    </div>
                    <a href={`/learning/${courseId}?isPreviewing=${true}`} className='cs-lecture-video-display-preview'>
                      Xem trước
                    </a>
                  </div>
                  <div className='cs-lecture-video-display-btn'>
                    <span
                      onClick={() => {
                        setIsAddContentOpen(true)
                        setIsDropdownOpen(false)
                      }}
                    >
                      <MdModeEdit />
                      <span>Chỉnh sửa</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isAddDescriptionOpen ? (
            <form className='cs-lecture-description' onSubmit={descriptionFormik.handleSubmit}>
              <h4>Mô tả bài giảng</h4>
              <textarea
                name='description'
                id=''
                placeholder='Thêm mô tả, trình bày những việc học sinh có thể làm sau khi hoàn thành bài giảng'
                value={descriptionFormik.values.description}
                onChange={descriptionFormik.handleChange}
              />
              <div className='cs-group-btn'>
                <button type='submit' className='cs-group-btn-add'>
                  Lưu
                </button>
                <span onClick={() => setIsAddDescriptionOpen(false)}>Hủy</span>
              </div>
            </form>
          ) : lecture.description !== null ? (
            <div className='cs-lecture-description-container' onClick={() => setIsAddDescriptionOpen(true)}>
              <h4>Mô tả bài giảng</h4>
              <p>{lecture.description}</p>
            </div>
          ) : (
            <div className='add-btn' onClick={() => setIsAddDescriptionOpen(true)}>
              <IoIosAdd size={20} />
              <span>Mô tả</span>
            </div>
          )}
        </div>
      )}
      {isAddContentOpen && (
        <div className={`cs-lecture-add-content ${uploadVideoDisable && 'disabled-add-content'}`}>
          <div className='cs-lecture-add-content-video'>
            <h4>Thêm video</h4>
            <IoIosClose size={25} onClick={() => setIsAddContentOpen(false)} />
          </div>
          <div className='cs-lecture-add-content-tab'>
            <div
              className={`cs-lecture-add-content-tab-item ` + (tab === 1 ? 'tab-active' : '')}
              onClick={() => setTab(1)}
            >
              Tải video lên
            </div>
            <div
              className={`cs-lecture-add-content-tab-item ` + (tab === 2 ? 'tab-active' : '')}
              onClick={() => setTab(2)}
            >
              Thêm từ thư viện
            </div>
          </div>
          {tab === 1 ? (
            <div className='video-upload'>
              {video === undefined ? (
                <>
                  <input type='file' hidden ref={chooseVideoRef} onChange={handleVideoUpload} accept='video/*' />
                  <div className='video-upload-left'>Không có file nào được chọn</div>

                  <div className='video-upload-right' onClick={() => chooseVideoRef.current?.click()}>
                    Chọn video
                  </div>
                </>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Tên file</th>
                      <th>Loại</th>
                      <th>Trạng thái</th>
                      <th>Ngày</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{video?.name}</td>
                      <td>Video</td>
                      <td>{progress}</td>
                      <td>01/01/2024</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            // tab = thêm từ thư viện
            <div className='video-library'>
              <div className='video-library-search'>
                <IoIosSearch />
                <input type='text' placeholder='Tìm kiếm theo tên file' />
              </div>
              {isFetched && (
                <table>
                  <thead>
                    <tr>
                      <th>Tên file</th>
                      <th>Loại</th>
                      <th>Trạng thái</th>
                      <th>Ngày</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resource.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.fileName}</td>
                          <td>{item.type}</td>
                          <td>Thành công</td>
                          <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                          <td style={{ display: 'flex', alignItems: 'center', color: '#8710d8', cursor: 'pointer' }}>
                            <span onClick={() => handleSelectVideo(item.fileId)}>Chọn</span>
                            <span>
                              <MdDelete size={20} />
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CourseStructure
