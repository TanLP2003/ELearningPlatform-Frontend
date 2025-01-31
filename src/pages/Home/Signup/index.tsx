import { useFormik } from 'formik'
import login_image from '../../../assets/login_image.webp'
import './Signup.scss'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '~/redux'
import { useDispatch } from 'react-redux'
import { signup } from '~/redux/actions/auth-actions'
import { setLoading } from '~/redux/features/loadingSlice'
import { toast } from 'react-toastify'

const Signup: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const schema = Yup.object({
    email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu nhập lại không khớp')
      .required('Yêu cầu xác nhận mật khẩu'),
    userName: Yup.string().required('Tên đầy đủ là bắt buộc')
  })
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      retypePassword: ''
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatch(setLoading(true))
      dispatch(signup(values))
        .unwrap()
        .then(() => {
          toast.success('Đăng ký thành công')
          navigate('/auth')
        })
        .catch((err) => {
          toast.error('Đăng ký thất bại')
          console.log(err)
        })
        .finally(() => {
          resetForm()
          dispatch(setLoading(false))
        })
    }
  })
  return (
    <div className='signup'>
      <div className='signup-image'>
        <img src={login_image} alt='' className='img-cover' />
      </div>
      <div className='signup-content'>
        <p>Đăng ký và bắt đầu học</p>
        <form onSubmit={formik.handleSubmit} className='signup-form'>
          <label htmlFor='username'>Tên đầy đủ</label>
          <input
            type='text'
            name='userName'
            id='username'
            value={formik.values.userName}
            onChange={formik.handleChange}
            placeholder='Tên của bạn ...'
          />
          <label htmlFor='Email'>Email</label>
          <input
            type='text'
            name='email'
            id='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Email của bạn...'
          />
          <label htmlFor='Password'>Mật khẩu</label>
          <input
            type='password'
            name='password'
            id='Password'
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder='Mật khẩu của bạn ...'
          />
          <label htmlFor='PasswordConfirm'>Xác nhận mật khẩu</label>
          <input
            type='password'
            name='retypePassword'
            id='PasswordConfirm'
            value={formik.values.retypePassword}
            onChange={formik.handleChange}
            placeholder='Nhập lại mật khẩu...'
          />
          <div className='signup-form-checkbox'>
            <input type='checkbox' />
            <span>Gửi cho tôi các ưu đãi đặc biệt, đề xuất cá nhân hóa và bí quyết học tập</span>
          </div>
          <button type='submit' className='signup-form-btn'>
            Đăng ký
          </button>
          <div className='signup-form-rule'>
            Bằng việc đăng ký, bạn đồng ý với <span className='signup-link'>Điều khoản sử dụng</span> và{' '}
            <span className='signup-link'>Chính sách về quyền riêng tư</span>.
          </div>
        </form>
        <div className='signup-option-item-gray'>
          Bạn đã có tài khoản?{' '}
          <span className='signup-link' onClick={() => navigate('/auth')}>
            Đăng nhập
          </span>
        </div>
      </div>
    </div>
  )
}

export default Signup
