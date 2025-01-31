import { useNavigate } from 'react-router-dom'
import './PaymentSuccess.scss'

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='p-success'>
      <h1>Thanh toán thành công!</h1>
      <h1>Chúc bạn có thời gian học tập vui vẻ.</h1>
      <div onClick={() => navigate('/my-courses')}>Danh sách học tập của bạn</div>
    </div>
  )
}

export default PaymentSuccess
