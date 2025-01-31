import './Cart.scss'
import empty_cart from '../../assets/empty-shopping-cart-v2.jpg'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import useFetchData from '~/components/hooks/useFetchData'
import { checkoutBasket, getBasket, removeCartItem } from '~/redux/actions/basket-actions'
import { useSelector } from 'react-redux'
import img_default from '../../assets/course_image_default.jpg'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const isFetched = useFetchData(() => [dispatch(getBasket())])
  const { items, totalPrice } = useSelector((state: RootState) => {
    return {
      items: state.basket.items,
      totalPrice: state.basket.totalPrice
    }
  })
  const handleRemoveItem = (itemId: string) => {
    dispatch(removeCartItem(itemId))
      .unwrap()
      .then(() => toast.success('Thành công'))
      .catch(() => toast.error('Thất bại'))
  }
  const handleCheckout = () => {
    dispatch(checkoutBasket())
      .unwrap()
      .then((result) => {
        window.location.replace(result.redirectUrl)
      })
      .catch((err) => {
        console.log('Checkout error', err)
      })
  }
  return (
    <div className='cart'>
      {isFetched && (
        <div className='cart-body'>
          <h1 className='cart-title'>Giỏ hàng</h1>
          <p className='cart-quantity'>{items.length} khóa học trong giỏ hàng</p>
          {items.length > 0 ? (
            <div className='cart-shopping'>
              <div className='cart-shopping-list'>
                {items.map((item, index) => {
                  return (
                    <div className='cart-shopping-item' key={index}>
                      <div style={{ width: '120px', overflow: 'hidden' }}>
                        <img src={img_default} className='img-contain' />
                      </div>
                      <div className='cart-shopping-item-body' onClick={() => navigate(`/course/${item.courseId}`)}>
                        <h3>{item.courseName}</h3>
                        <p>{item.authorName}</p>
                      </div>
                      <div onClick={() => handleRemoveItem(item.courseId!)}>
                        <p className='text-purple cart-shopping-item-btn'>
                          <b>Xóa</b>
                        </p>
                      </div>
                      <div style={{ paddingLeft: '48px', minWidth: '120px' }}>
                        <h3 className='text-purple'>
                          <b>{item.price.toLocaleString('vi-VN')} đ</b>
                        </h3>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='cart-shopping-checkout'>
                <p>
                  <big>Tổng tiền</big>
                </p>
                <h1 style={{ marginTop: '20px' }}>đ {totalPrice?.toLocaleString('vi-VN')}</h1>
                <div className='cart-shopping-checkout-btn' onClick={() => handleCheckout()}>
                  Thanh toán
                </div>
              </div>
            </div>
          ) : (
            <div className='cart-empty'>
              <div className='cart-empty-img'>
                <img src={empty_cart} className='img-contain' />
              </div>
              <p className='cart-empty-text'>Giỏ hàng của bạn đang trống. Hãy tiếp tục mua sắm để tìm một khóa học!</p>
              <div className='cart-empty-btn' onClick={() => navigate('/')}>
                Tiếp tục mua sắm
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Cart
