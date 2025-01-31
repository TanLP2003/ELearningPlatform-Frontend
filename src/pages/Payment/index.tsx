import { useFormik } from 'formik'
import * as Yup from 'yup'
import './Payment.scss'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { buyNow, checkoutBasket, getBasket } from '~/redux/actions/basket-actions'
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchData from '~/components/hooks/useFetchData'
import img_default from '../../assets/course_image_default.jpg'
import { getCourseForViewing } from '~/redux/actions/course-actions'

interface PaymentWrapperProps {
  paymentType: 'buynow' | 'basket'
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ paymentType }) => {
  const dispatch: AppDispatch = useDispatch()
  const { courseId } = useParams()
  const isFetched = useFetchData(() => [dispatch(getBasket()), dispatch(getCourseForViewing(courseId!))])

  const orders = useSelector((state: RootState) => {
    if (paymentType == 'basket') {
      return state.basket.items
    } else {
      let t = state.courses.courseViewing
      let result: BasketItem[] = [
        {
          courseId: courseId,
          courseImage: t?.courseImage,
          courseName: t?.title,
          authorId: t?.instructorId,
          authorName: t?.instructorName,
          price: t?.price!
        }
      ]
      return result
    }
  })
  const price = useSelector((state: RootState) => {
    if (paymentType == 'basket') {
      return state.basket.totalPrice
    } else {
      let t = state.courses.courseViewing
      return t?.price
    }
  })
  console.log(orders)
  const checkoutFunc = async (): Promise<string> => {
    const resultAction = await dispatch(checkoutBasket())
    unwrapResult(resultAction)
    return resultAction.payload.redirectUrl
    // toast.success('Thanh toán thành công')
  }
  const buyNowFunc = async (values: CheckoutBasketParams): Promise<string> => {
    const resultAction = await dispatch(
      buyNow({
        courseId: courseId!
      })
    )
    unwrapResult(resultAction)
    // toast.success('Thanh toán thành công')
    return ''
  }
  return (
    <>
      {isFetched &&
        (paymentType === 'basket' ? (
          <Payment orders={orders} checkoutFunc={checkoutFunc} price={price!} />
        ) : (
          <Payment orders={orders} checkoutFunc={buyNowFunc} price={price!} />
        ))}
    </>
  )
}

interface PaymentProps {
  orders: BasketItem[]
  checkoutFunc: (values: CheckoutBasketParams) => Promise<string>
  price: number
}

const Payment: React.FC<PaymentProps> = ({ orders, checkoutFunc, price }) => {
  const navigate = useNavigate()
  // const items = useSelector((state: RootState) => state.basket.items)
  // const totalPrice = useSelector((state: RootState) => state.basket.totalPrice)
  const btnRef = useRef<HTMLButtonElement>(null)
  const handleSubmit = () => {
    if (btnRef.current) {
      btnRef.current.click()
    }
  }
  const currentUser = useSelector((state: RootState) => state.users.currentUser)
  const schema = Yup.object({
    cardName: Yup.string().required(),
    cardNumber: Yup.string().required(),
    expiration: Yup.string().required(),
    cvv: Yup.string().required(),
    userName: Yup.string().required()
  })
  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
      userName: currentUser?.userName ?? ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('Submitted')
      checkoutFunc(values)
        .then((result) => {
          toast.success('Thanh toán thành công')
          // navigate('/payment/success')
          console.log(result)
          window.location.replace(result)
        })
        .catch(() => toast.error('Thanh toán thất bại'))
      // console.log(val ues)
    }
  })
  return (
    <div className='payment'>
      <div className='payment-header'>
        <h2>
          <span className='text-purple'>E</span>Learning
        </h2>
        <p className='text-purple' onClick={() => navigate(-1)}>
          <b>Hủy</b>
        </p>
      </div>
      <div className='payment-body'>
        <div className='payment-body-left'>
          <h1 style={{ fontSize: '2.2rem' }}>Thanh toán</h1>
          <h2>Thông tin thẻ tín dụng</h2>
          <form onSubmit={formik.handleSubmit} className='payment-form'>
            <input hidden type='text' id='userName' name='userName' value={formik.values.userName} />
            <label htmlFor='cardName'>
              <span>
                <b>Tên trên thẻ</b>
              </span>
              <span>Bắt buộc</span>
            </label>
            <input
              type='text'
              id='cardName'
              name='cardName'
              onChange={formik.handleChange}
              value={formik.values.cardName}
              placeholder='Tên trên thẻ'
            />
            <label htmlFor='cardNumber'>
              <span>
                <b>Số thẻ</b>
              </span>
              <span>Bắt buộc</span>
            </label>
            <input
              type='text'
              id='cardNumber'
              name='cardNumber'
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
              placeholder='1234 5678 9012 3456'
            />
            <label htmlFor='expiration'>
              <span>
                <b>Ngày hết hạn</b>
              </span>
              <span>Bắt buộc</span>
            </label>
            <input
              type='text'
              id='expiration'
              name='expiration'
              onChange={formik.handleChange}
              value={formik.values.expiration}
              placeholder='MM/YYYY'
            />
            <label htmlFor='cvv'>
              {' '}
              <span>
                <b>CVC/CVV</b>
              </span>
              <span>Bắt buộc</span>
            </label>
            <input
              type='text'
              id='cvv'
              name='cvv'
              onChange={formik.handleChange}
              value={formik.values.cvv}
              placeholder='CVC'
            />
            <button ref={btnRef} type='submit' hidden />
          </form>
          <div className='payment-order'>
            <h2>Thông tin đơn đặt hàng</h2>
            <div className='payment-order-list'>
              {orders.map((item, index) => {
                return (
                  <div key={index} className='payment-order-item'>
                    <div style={{ width: '120px' }}>
                      <img src={item.courseImage ?? img_default} className='img-cover' />
                    </div>
                    <div className='payment-order-item-body'>
                      <p style={{ flexGrow: '1' }}>
                        <b>{item.courseName}</b>
                      </p>
                      <p>đ {item.price.toLocaleString('vi-VN')}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='payment-body-right'>
          <h2>Tóm tắt</h2>
          <p style={{ borderBottom: '0.8px solid #ccc' }}>
            <span>Giá gốc</span>
            <span>₫ {price.toLocaleString('vi-VN')}</span>
          </p>
          <p>
            <span>
              <b>Tổng</b>
            </span>
            <span>
              <b>{price?.toLocaleString('vi-VN')}</b>
            </span>
          </p>
          <span style={{ display: 'block', wordWrap: 'break-word', fontSize: '0.9rem' }}>
            Bằng việc hoàn tất giao dịch mua, bạn đồng ý với <span className='text-purple'>Điều khoản dịch vụ này</span>
          </span>
          <div className='payment-complete' onClick={handleSubmit}>
            Hoàn tất thanh toán
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentWrapper
