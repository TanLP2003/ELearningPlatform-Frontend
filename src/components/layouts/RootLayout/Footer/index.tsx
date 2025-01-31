import './Footer.scss'
import { MdLanguage } from 'react-icons/md'

const Footer: React.FC = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-link'>
          <ul className='footer-list'>
            <li>ELearning Business</li>
            <li>Giảng dạy trên ELearning</li>
            <li>Tải ứng dụng</li>
            <li>Giới thiệu</li>
            <li>Hãy liên hệ với chúng tôi</li>
          </ul>
          <ul className='footer-list'>
            <li>Nghề nghiệp</li>
            <li>Blog</li>
            <li>Trợ giúp và hỗ trợ</li>
            <li>Đơn vị liên kết</li>
            <li>Nhà đầu tư</li>
          </ul>
          <ul className='footer-list'>
            <li>Nghề nghiệp</li>
            <li>Blog</li>
            <li>Trợ giúp và hỗ trợ</li>
            <li>Đơn vị liên kết</li>
            <li>Nhà đầu tư</li>
          </ul>
          <div className='footer-language-container'>
            <div className='footer-language-selector'>
              <MdLanguage size={20} color='white' />
              <span>Tiếng việt</span>
            </div>
          </div>
        </div>
        <div className='logo-copyright'>
          <div className='logo'>ELearning</div>
          <div>
            <small>&copy; 2024 ELearning, Inc </small>
          </div>
        </div>
      </div>
      {/* <div className='parent'>
        <div className='child1'></div>
        <div className='child2'></div>
        <div className='child3'></div>
      </div> */}
    </div>
  )
}

export default Footer
