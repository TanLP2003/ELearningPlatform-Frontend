import home_ad from '../../assets/home_ad.jpg'
import './Home.scss'
import cisco_logo from '../../assets/cisco_logo.svg'
import citi_logo from '../../assets/citi_logo.svg'
import ericsson_logo from '../../assets/ericsson_logo.svg'
import hewlett_logo from '../../assets/hewlett_packard_enterprise_logo.svg'
import procter_logo from '../../assets/procter_gamble_logo.svg'
import samsung_logo from '../../assets/samsung_logo.svg'
import vimeo_logo from '../../assets/vimeo_logo.svg'
import volkswagen_logo from '../../assets/volkswagen_logo.svg'
import design_category from '../../assets/lohp-category-design-v2.jpg'
import development_category from '../../assets/lohp-category-development-v2.jpg'
import marketing_category from '../../assets/lohp-category-marketing-v2.jpg'
import it_category from '../../assets/lohp-category-it-and-software-v2.jpg'
import personal_category from '../../assets/lohp-category-personal-development-v2.jpg'
import business_category from '../../assets/lohp-category-business-v2.jpg'
import photograph_category from '../../assets/lohp-category-photography-v2.jpg'
import music_category from '../../assets/lohp-category-music-v2.jpg'
import eb1 from '../../assets/EB1_800x800.jpg'
import eb2 from '../../assets/EB2_800x800.jpg'

const Home: React.FC = () => {
  return (
    <div className='home'>
      <div className='home-ad'>
        <div className='home-ad-img'>
          <img src={home_ad} alt='' className='img-cover' />
        </div>
        <div className='home-ad-content'>
          <p className='home-ad-content-heading'>Giải pháp học tập lâu dài</p>
          <p>Đầu tư vào bản thân. Ưu đãi các khóa học có giá thấp chỉ từ 249.000đ đến hết ngày 27/8.</p>
        </div>
      </div>
      <div className='home-intro'>
        <div className='home-intro-content'>
          <div className='home-intro-text'>
            Được hơn 15.000 công ty và hàng triệu học viên trên khắp thế giới tin dùng
          </div>
          <div className='home-intro-logo'>
            <div className='home-intro-logo-img'>
              <img src={volkswagen_logo} className='img-contain' />
            </div>
            <div className='home-intro-logo-img'>
              <img src={samsung_logo} className='img-contain' />
            </div>
            <div>
              <img src={cisco_logo} className='img-contain' />
            </div>
            <div className='home-intro-logo-img'>
              <img src={vimeo_logo} className='img-contain' />
            </div>
            <div className='home-intro-logo-img'>
              <img src={procter_logo} className='img-contain' />
            </div>
            <div className='home-intro-logo-img'>
              <img src={hewlett_logo} className='img-contain' />
            </div>
            <div className='home-intro-logo-img'>
              <img src={citi_logo} className='img-contain' />
            </div>
            <div className='home-intro-logo-img'>
              <img src={ericsson_logo} className='img-contain' />
            </div>
          </div>
        </div>
      </div>

      <div className='home-main'>
        <div className='home-main-categories'>
          <h2>Các thể loại hàng đầu</h2>
          <div className='home-main-categories-list'>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={design_category} alt='' className='img-cover' />
              </div>
              <p>Thiết kế</p>
            </div>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={development_category} alt='' className='img-cover' />
              </div>
              <p>Phát triển</p>
            </div>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={marketing_category} alt='' className='img-cover' />
              </div>
              <p>Marketing</p>
            </div>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={it_category} alt='' className='img-cover' />
              </div>
              <p>CNTT và Phần mềm</p>
            </div>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={personal_category} alt='' className='img-cover' />
              </div>
              <p>Phát triển cá nhân</p>
            </div>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={business_category} alt='' className='img-cover' />
              </div>
              <p>Kinh doanh</p>
            </div>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={photograph_category} alt='' className='img-cover' />
              </div>
              <p>Nhiếp ảnh</p>
            </div>
            <div className='home-main-categories-item'>
              <div className='img-wrapper'>
                <img src={music_category} alt='' className='img-cover' />
              </div>
              <p>Âm nhạc</p>
            </div>
          </div>
        </div>
      </div>
      <div className='home-topic'>
        <div className='home-topic-wrapper'>
          <h2>Chủ đề nổi bật theo thể loại</h2>
          <div className='home-topic-list'>
            <div className='home-topic-sublist'>
              <h3>Development</h3>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Python</p>
                <p className='home-topic-learners'>36,354,994 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Web Development</p>
                <p className='home-topic-learners'>11,415,615 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Machine Learning</p>
                <p className='home-topic-learners'>7,070,015 learners</p>
              </div>
            </div>
            <div className='home-topic-sublist'>
              <h3>Business</h3>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Financial Analysis</p>
                <p className='home-topic-learners'>1,195,282 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>SQL</p>
                <p className='home-topic-learners'>5,977,561 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>PMP</p>
                <p className='home-topic-learners'>1,733,398 learners</p>
              </div>
            </div>
            <div className='home-topic-sublist'>
              <h3>IT and Software</h3>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Amazon AWS</p>
                <p className='home-topic-learners'>6,123,456 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Ethical Hacking</p>
                <p className='home-topic-learners'>10,931,066 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Cyber Security</p>
                <p className='home-topic-learners'>3,998,037 learners</p>
              </div>
            </div>
            <div className='home-topic-sublist'>
              <h3>Design</h3>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Photoshop</p>
                <p className='home-topic-learners'>10,909,736 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Graphic Design</p>
                <p className='home-topic-learners'>3,381,052 learners</p>
              </div>
              <div className='home-topic-item'>
                <p className='home-topic-link'>Drawing</p>
                <p className='home-topic-learners'>2,410,849 learners</p>
              </div>
            </div>
          </div>
          <span style={{ padding: '10px 10px', border: '1px solid #000', fontWeight: 'bold', marginTop: '10px' }}>
            Khám phá thêm chủ đề
          </span>
        </div>
      </div>
      <div className='home-business'>
        <div className='home-business-container'>
          <div className='home-business-content'>
            <p className='home-business-header'>
              <b>ELearning </b>
              <span>business</span>
            </p>
            <p className='home-business-text'>Nâng cao kỹ năng cho đội ngũ nhân viên của bạn với ELearning Business</p>
            <ul>
              <li>Truy cập không giới hạn hơn 26000 khóa học hàng đầu của Udemy, ở mọi nơi và mọi lúc</li>
              <li>Tuyển tập khóa học quốc tế bằng 14 ngôn ngữ</li>
              <li>Các chứng chỉ hàng đầu về công nghệ và kinh doanh</li>
            </ul>
            <div className='home-business-btn'>
              <span className='home-business-btn-join'>Hãy tham gia ELearning Business</span>
              <span className='home-business-btn-more'>Tìm hiểu thêm</span>
            </div>
          </div>
          <div style={{ width: '400px' }}>
            <img src={eb1} className='img-contain' />
          </div>
        </div>
        <div className='home-business-container'>
          <div style={{ width: '400px' }}>
            <img src={eb2} className='img-contain' />
          </div>
          <div className='home-business-teacher'>
            <div className='home-business-teacher-content'>
              <p className='home-business-text'>Trở thành giảng viên</p>
              <p className='home-business-teacher-intro'>
                Giảng viên trên khắp thế giới giảng dạy hàng triệu học viên trên ELearning. Chúng tôi cung cấp công cụ và
                kỹ năng để dạy những gì bạn yêu thích.
              </p>
              <div className='home-business-btn'>
                <span className='home-business-btn-join'>Bắt đầu học ngay hôm nay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
