import { number } from 'yup'
import './ProfileSettings.scss'
import { ChangeEvent, useRef, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import useFetchData from '~/components/hooks/useFetchData'
import { AppDispatch, RootState } from '~/redux'
import { useDispatch } from 'react-redux'
import { getUserProfile, updateBasicInfo, updatePrivacySetting } from '~/redux/actions/user-actions'
import { useSelector } from 'react-redux'
import { setLoading } from '~/redux/features/loadingSlice'
import { toast } from 'react-toastify'

const ProfileSettings: React.FC = () => {
  const [section, setSection] = useState<number>(1)
  const dispatch: AppDispatch = useDispatch()
  const isFetched = useFetchData(() => [dispatch(getUserProfile())])
  const profile = useSelector((state: RootState) => state.profiles)
  return (
    <div className='ps'>
      <h1>Hồ sơ & cài đặt</h1>
      <ul className='ps-nav'>
        <li className={'ps-nav-item' + (section == 1 ? ' ps-nav-item-active' : '')} onClick={() => setSection(1)}>
          Hồ sơ ELearning
        </li>
        <li className={'ps-nav-item' + (section == 2 ? ' ps-nav-item-active' : '')} onClick={() => setSection(2)}>
          Ảnh hồ sơ
        </li>
        <li className={'ps-nav-item' + (section == 3 ? ' ps-nav-item-active' : '')} onClick={() => setSection(3)}>
          Cài đặt bảo mật
        </li>
      </ul>

      {isFetched && (
        <div className='ps-main'>
          {section == 1 && <ProfileSection basicInfo={profile.basicInfo} />}
          {section == 2 && <AvatarSection />}
          {section == 3 && <PrivacySection privacySetting={profile.privacySetting} />}
        </div>
      )}
    </div>
  )
}

interface ProfileSectionProps {
  basicInfo: ProfileBasicInfo
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ basicInfo }) => {
  const schema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    headline: Yup.string(),
    description: Yup.string(),
    language: Yup.string(),
    website: Yup.string(),
    twitter: Yup.string(),
    facebook: Yup.string(),
    linkedin: Yup.string(),
    youtube: Yup.string()
  })
  const dispatch: AppDispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      firstName: basicInfo.firstName ?? '',
      lastName: basicInfo.lastName ?? '',
      headline: basicInfo.headline ?? '',
      description: basicInfo.description ?? '',
      website: basicInfo.website ?? '',
      twitter: basicInfo.twitter ?? '',
      facebook: basicInfo.facebook ?? '',
      linkedin: basicInfo.linkedin ?? '',
      youtube: basicInfo.youtube ?? '',
      language: basicInfo.language ?? ''
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      dispatch(setLoading(true))
      dispatch(updateBasicInfo(values))
        .unwrap()
        .then(() => {
          toast.success('Cập nhật thành công')
        })
        .catch((err) => {
          console.log(err)
          toast.error('Cập nhật thất bại')
        })
        .finally(() => {
          dispatch(setLoading(false))
        })
    }
  })
  const handleSaveChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    formik.handleSubmit()
  }
  return (
    <div className='profile-wrapper'>
      <form className='profile-form'>
        <div className='profile-form-section'>
          <div className='profile-input'>
            <label htmlFor='firstName'>Tên</label>
            <input
              type='text'
              placeholder='Tên'
              id='firstname'
              name='firstName'
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </div>
          <div className='profile-input'>
            <label htmlFor='lastName'>Họ</label>
            <input
              type='text'
              placeholder='Họ'
              id='lastName'
              name='lastName'
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
          <div className='profile-input'>
            <label htmlFor='headline'>Headline</label>
            <input
              type='text'
              placeholder='Headline'
              id='headline'
              name='headline'
              value={formik.values.headline}
              onChange={formik.handleChange}
            />
          </div>
          <div className='profile-input'>
            <label htmlFor='description'>Tiểu sử</label>
            <textarea
              placeholder='Tên'
              id='description'
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              rows={5}
            />
          </div>
          <div className='profile-input'>
            <label htmlFor=''>Ngôn ngữ</label>
            <input
              type='text'
              placeholder='Ngôn ngữ'
              id='language'
              name='language'
              value={formik.values.language}
              onChange={formik.handleChange}
            />
          </div>
          <div
            className={'profile-save-btn' + (formik.dirty ? ' form-changed' : ' form-not-changed')}
            onClick={handleSaveChange}
          >
            Lưu
          </div>
        </div>
        <div className='profile-form-section'>
          <div className='profile-input'>
            <label htmlFor='website'>URL</label>
            <input
              type='text'
              placeholder='Trang web'
              id='website'
              name='website'
              value={formik.values.website}
              onChange={formik.handleChange}
            />
          </div>
          <div className='profile-input'>
            <label htmlFor='twitter'>X</label>
            <div className='input-group'>
              <div>http://www.x.com/</div>
              <input
                type='text'
                id='twitter'
                name='twitter'
                value={formik.values.twitter}
                onChange={formik.handleChange}
                placeholder='Tên người dùng'
              />
            </div>
          </div>
          <div className='profile-input'>
            <label htmlFor='facebook'>Facebook</label>
            <div className='input-group'>
              <div>http://www.facebook.com/</div>
              <input
                type='text'
                id='facebook'
                name='facebook'
                value={formik.values.facebook}
                onChange={formik.handleChange}
                placeholder='Tên người dùng'
              />
            </div>
          </div>
          <div className='profile-input'>
            <label htmlFor='linkedin'>Linkedin</label>
            <div className='input-group'>
              <div>http://www.linkedin.com/</div>
              <input
                type='text'
                id='linkedin'
                name='linkedin'
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                placeholder='ID tài nguyên'
              />
            </div>
          </div>
          <div className='profile-input'>
            <label htmlFor='youtube'>Youtube</label>
            <div className='input-group'>
              <div>http://www.youtube.com/</div>
              <input
                type='text'
                id='youtube'
                name='youtube'
                value={formik.values.youtube}
                onChange={formik.handleChange}
                placeholder='Tên người dùng'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const AvatarSection: React.FC = () => {
  return <div></div>
}

interface PrivacySectionProps {
  privacySetting: ProfilePrivacySetting
}

const PrivacySection: React.FC<PrivacySectionProps> = ({ privacySetting }) => {
  const dispatch: AppDispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      showProfile: privacySetting.showProfile,
      showParticipatedCourses: privacySetting.showParticipatedCourses
    },
    onSubmit: (values) => {
      dispatch(setLoading(true))
      dispatch(updatePrivacySetting(values))
        .unwrap()
        .then(() => toast.success('Cập nhật thành công'))
        .catch((err) => {
          console.log(err)
          toast.error('Cập nhật thất bại')
        })
        .finally(() => {
          dispatch(setLoading(false))
        })
    }
  })
  const handleSaveChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    formik.handleSubmit()
  }
  return (
    <div className='privacy-wrapper'>
      <form className='privacy-form'>
        <div className='checkbox-wrapper'>
          <input
            type='checkbox'
            id='showProfile'
            name='showProfile'
            className='custom-checkbox'
            checked={formik.values.showProfile}
            onChange={formik.handleChange}
          />
          <label htmlFor='showProfile' className='checkbox-label'>
            <span className='checkbox-custom'></span>
            Hiển thị hồ sơ của bạn cho người dùng đã đăng nhập
          </label>
        </div>
        <div className='checkbox-wrapper'>
          <input
            type='checkbox'
            id='showParticipatedCourses'
            name='showParticipatedCourses'
            className='custom-checkbox'
            checked={formik.values.showParticipatedCourses}
            onChange={formik.handleChange}
          />
          <label htmlFor='showParticipatedCourses' className='checkbox-label'>
            <span className='checkbox-custom'></span>
            Hiển thị các khóa học bạn đang tham gia trên trang hồ sơ của bạn
          </label>
        </div>
        <div
          className={'profile-save-btn' + (formik.dirty ? ' form-changed' : ' form-not-changed')}
          onClick={handleSaveChange}
          style={{ marginTop: '20px' }}
        >
          Lưu
        </div>
      </form>
    </div>
  )
}

export default ProfileSettings
