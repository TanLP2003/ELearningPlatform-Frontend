import './Login.scss'
import login_image from '../../../assets/login_image.webp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { FaApple } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '~/redux'
import { useDispatch } from 'react-redux'
import { googleLogin } from '~/redux/actions/auth-actions'
import { setLoading } from '~/redux/features/loadingSlice'
import { toast } from 'react-toastify'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

// const Login: React.FC = () => {
//   const navigate = useNavigate()
//   const dispatch: AppDispatch = useDispatch()
//   const handleRegister = () => {
//     console.log('click')
//     navigate('/auth/register')
//   }
//   const schema = Yup.object({
//     email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
//     password: Yup.string().required('Mật khẩu là bắt buộc')
//   })
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: ''
//     },
//     validationSchema: schema,
//     onSubmit: (values, { resetForm }) => {
//       console.log('submit login')
//       dispatch(setLoading(true))
//       dispatch(login(values))
//         .unwrap()
//         .then((result) => {
//           console.log(result)
//           toast.success('Đăng nhập thành công')
//           navigate('/')
//         })
//         .catch((err) => {
//           toast.error('Đăng nhập thất bại')
//           console.log('Error', err)
//         })
//         .finally(() => {
//           resetForm()
//           dispatch(setLoading(false))
//         })
//     }
//   })
//   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <div className='login'>
//         <div className='login-image'>
//           <img src={login_image} alt='' className='img-cover' />
//         </div>
//         <div className='login-content'>
//           <p>Đăng nhập vào tài khoản Elearning của bạn</p>
//           <form onSubmit={formik.handleSubmit} className='login-form'>
//             <label htmlFor='Email'>Email</label>
//             <input
//               type='text'
//               name='email'
//               id='Email'
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               placeholder='Email của bạn...'
//             />
//             <label htmlFor='Password'>Mật khẩu</label>
//             <input
//               type='password'
//               name='password'
//               id='Password'
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               placeholder='Mật khẩu của bạn'
//             />
//             <button type='submit' className='login-form-btn'>
//               Đăng nhập
//             </button>
//           </form>
// <div className='login-option'>
//   <div className='login-option-item'>
//     hoặc <span className='login-link'>Quên mật khẩu</span>
//   </div>
//   <div className='login-option-other login-option-item'>Các tùy chọn đăng nhập khác</div>
//   <div className='login-option-method login-option-item'>
//     <div className='login-option-method-icon' onClick={() => console.log('Login with google')}>
//       <FcGoogle size={24} />
//     </div>
//     <div className='login-option-method-icon'>
//       <FaFacebook size={24} />
//     </div>
//     <div className='login-option-method-icon'>
//       <FaApple size={24} />
//     </div>
//   </div>
//   <div className='login-option-item-gray login-option-signup'>
//     Bạn không có tài khoản?{' '}
//     <span className='login-link' onClick={handleRegister}>
//       Đăng ký
//     </span>
//   </div>
//   <div className='login-option-item-gray login-link'>Đăng nhập bằng tên tổ chức của bạn</div>
// </div>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   )
// }

const GoogleLogin: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        // const response = await axios.post<AuthResponse>('http://localhost:5101/api/auth/google-login', {
        //   code: credentialResponse.code
        // })
        // console.log(response)
        dispatch(setLoading(true))
        dispatch(googleLogin(credentialResponse.code))
          .unwrap()
          .then((result) => {
            console.log(result)
            toast.success('Đăng nhập thành công')
            navigate('/')
          })
          .finally(() => {
            dispatch(setLoading(false))
          })
      } catch (error) {}
    },
    onError: () => {
      console.log('Login Failed')
    },
    flow: 'auth-code'
  })
  return (
    <div className='login-option-method-icon' onClick={() => handleGoogleLogin()}>
      <FcGoogle size={24} />
      <span>Đăng nhập bằng google</span>
    </div>
  )
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const handleRegister = () => {
    navigate('/auth/register')
  }
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className='login'>
        <div className='login-image'>
          <img src={login_image} alt='' className='img-cover' />
        </div>
        <div className='login-content'>
          <p>Đăng nhập vào tài khoản Elearning của bạn</p>
          <div className='login-option'>
            <div className='login-option-method login-option-item'>
              <GoogleLogin />
            </div>
            <div className='login-option-item-gray login-option-signup'>
              Bạn không có tài khoản?{' '}
              <span className='login-link' onClick={handleRegister}>
                Đăng ký
              </span>
            </div>
            <div className='login-option-item-gray login-link'>Đăng nhập bằng tên tổ chức của bạn</div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default Login
