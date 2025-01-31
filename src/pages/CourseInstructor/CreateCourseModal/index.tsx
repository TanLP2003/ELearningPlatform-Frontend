import { useFormik } from 'formik'
import './CreateCourseModal.scss'
import * as Yup from 'yup'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCourse, getAllCategories, getMyTeachingCourse } from '~/redux/actions/course-actions'
import { toast } from 'react-toastify'
import { setLoading } from '~/redux/features/loadingSlice'
import useFetchData from '~/components/hooks/useFetchData'
import { useSelector } from 'react-redux'

interface CreateCourseModalProps {
  closeModal: Function
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({ closeModal }) => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!) as User
  const schema = Yup.object({
    title: Yup.string().required('Tiêu đề là trường bắt buộc'),
    level: Yup.string().required('Trình độ là trường bắt buộc'),
    categoryId: Yup.string().required('Thể loại là trường bắt buộc')
  })
  const formik = useFormik({
    initialValues: {
      title: '',
      level: '',
      categoryId: '',
      instructorName: currentUser.userName
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(setLoading(true))
      dispatch(createCourse(values))
        .unwrap()
        .then(() => {
          toast.success('Create course successfully')
        })
        .catch((err) => {
          toast.error('Create course failed')
          console.log(err)
        })
        .finally(() => {
          dispatch(setLoading(false))
          dispatch(getMyTeachingCourse())
          closeModal()
        })
    },
    validateOnBlur: false,
    validateOnChange: false
  })
  const isFetched = useFetchData(() => [dispatch(getAllCategories())])
  const categories = useSelector((state: RootState) => {
    return state.courses.categories.map((category) => {
      return {
        id: category.id,
        name: category.name
      }
    })
  })
  return (
    <div className='modal-overlay'>
      <div className='modal ccm'>
        {isFetched && (
          <>
            <div className='ccm-header'>
              <h2>Tạo khóa học mới</h2>
              <div className='ccm-form-close' onClick={() => closeModal()}>
                X
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} className='ccm-form'>
              <label htmlFor='title'>Tiêu đề</label>
              <input
                type='text'
                id='title'
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder='Tiêu đề của khóa học'
              />
              {formik.errors && formik.errors.title ? <div>{formik.errors.title}</div> : null}
              <label htmlFor='level'>Trình độ</label>
              <select name='level' id='level' value={formik.values.level} onChange={formik.handleChange}>
                <option value='' disabled>
                  Chọn trình độ
                </option>
                <option value='Beginner'>Cơ bản</option>
                <option value='Intermediate'>Trung bình</option>
                <option value='Advance'>Nâng cao</option>
                <option value='All'>Tất cả</option>
              </select>
              {formik.errors && formik.errors.level ? <div>{formik.errors.level}</div> : null}
              <label htmlFor='categoryId'>Thể loại</label>
              <select name='categoryId' id='categoryId' value={formik.values.categoryId} onChange={formik.handleChange}>
                <option value='' disabled>
                  Chọn thể loại
                </option>
                {categories.map((category) => {
                  return <option value={category.id}>{category.name}</option>
                })}
              </select>
              {formik.errors && formik.errors.categoryId ? <div>{formik.errors.categoryId}</div> : null}
              <button className='ccm-form-btn' type='submit'>
                Tạo khóa học
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default CreateCourseModal
