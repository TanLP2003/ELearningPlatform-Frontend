import { useFormik } from 'formik'
import * as Yup from 'yup'
import './OverviewCourse.scss'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch, RootState } from '~/redux'
import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCourseInfo } from '~/redux/actions/course-actions'
import { toast } from 'react-toastify'
import { setLoading } from '~/redux/features/loadingSlice'

const OverviewCourse: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const [isUpdating, setIsUpdating] = useState(false)
  const { courseId } = useParams()
  const course = useSelector((state: RootState) => state.courses.instructorList.filter((c) => c.id === courseId)[0])
  const categories = useSelector((state: RootState) => {
    return state.courses.categories.map((category) => {
      return {
        id: category.id,
        name: category.name
      }
    })
  })
  const schema = Yup.object({
    title: Yup.string().required('Tiêu đề là bắt buộc'),
    description: Yup.string(),
    level: Yup.string(),
    price: Yup.number(),
    category: Yup.string(),
    language: Yup.string()
  })
  const formik = useFormik({
    initialValues: {
      title: course.title,
      description: course.description ?? '',
      price: course.price ?? 0,
      level: course.level.toString() ?? '',
      categoryId: course.categoryId ?? '',
      language: course.language ?? ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(setLoading(true))
      dispatch(
        updateCourseInfo({
          data: values,
          courseId: courseId!
        })
      )
        .unwrap()
        .then(() => toast.success('Cập nhật thành công'))
        .catch((err) => toast.error('Cập nhật thất bại'))
        .finally(() => {
          dispatch(setLoading(false))
          setIsUpdating(false)
        })
    }
  })
  const btnRef = useRef<HTMLButtonElement>(null)
  const handleSaveChange = () => {
    if (btnRef.current) {
      btnRef.current.click()
    }
  }
  const handleCancel = () => {
    setIsUpdating(false)
    formik.resetForm({ values: formik.initialValues })
  }
  return (
    <div className='ovc'>
      <div className='ovc-header'>
        <h2>Tổng quan khóa học</h2>
      </div>
      <div className='ovc-body'>
        <p className='ovc-body-intro'>
          Trang tổng quan khóa học của bạn rất quan trọng đối với thành công của bạn trên Udemy. Nếu được thực hiện
          đúng, trang này cũng có thể giúp bạn hiển thị trong các công cụ tìm kiếm như Google. Khi bạn hoàn thành phần
          này, hãy nghĩ đến việc tạo Trang tổng quan khóa học hấp dẫn thể hiện lý do ai đó muốn ghi danh khóa học của
          bạn. Tìm hiểu thêm về cách tạo trang tổng quan khóa học của bạn và các tiêu chuẩn tiêu đề khóa học.
        </p>
        <form onSubmit={formik.handleSubmit} className={'ovc-form ' + (!isUpdating && 'disabled-form')}>
          <label htmlFor='title'>Tiêu đề</label>
          <input type='text' id='title' name='title' onChange={formik.handleChange} value={formik.values.title} />
          <label htmlFor='description'>Mô tả khóa học</label>
          <textarea
            name='description'
            id='description'
            placeholder='Mô tả khóa học của bạn ...'
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <label htmlFor='level'>Trình độ</label>
          <select name='level' id='level' value={formik.values.level} onChange={formik.handleChange}>
            <option value='0'>Cơ bản</option>
            <option value='1'>Trung bình</option>
            <option value='2'>Nâng cao</option>
            <option value='3'>Tất cả</option>
          </select>
          <label htmlFor='price'>Giá tiền</label>
          <input type='number' id='price' name='price' value={formik.values.price} onChange={formik.handleChange} />
          <label htmlFor='categoryId'>Thể loại</label>
          <select name='categoryId' id='categoryId' value={formik.values.categoryId} onChange={formik.handleChange}>
            {categories.map((category) => {
              return <option value={category.id}>{category.name}</option>
            })}
          </select>
          <label htmlFor='language'>Ngôn ngữ</label>
          <input
            type='text'
            id='language'
            name='language'
            value={formik.values.language}
            onChange={formik.handleChange}
            placeholder='Chọn ngôn ngữ cho khóa học của bạn...'
          />
          <label htmlFor='visuability'>Trạng thái</label>
          <input disabled type='text' id='visuability' value={course.visuability == '0' ? 'Bản nháp' : 'Công khai'} />
          <button type='submit' hidden ref={btnRef}></button>
        </form>
        <div className='ovc-btns'>
          {isUpdating ? (
            <>
              <div className='ovc-btn' onClick={handleSaveChange}>
                Lưu thay đổi
              </div>
              <div className='ovc-btn ovc-btn-cancel' onClick={handleCancel}>
                Huỷ
              </div>
            </>
          ) : (
            <div className='ovc-btn' onClick={() => setIsUpdating(true)}>
              Cập nhật
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverviewCourse
