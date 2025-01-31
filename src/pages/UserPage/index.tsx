import './UserPage.scss'
import { IoLogoYoutube } from 'react-icons/io'
import { FaSquareXTwitter, FaSquareFacebook, FaLinkedin } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useFetchData from '~/components/hooks/useFetchData'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '~/redux'
import { setLoading } from '~/redux/features/loadingSlice'
import { getPublicProfile } from '~/redux/actions/user-actions'
import { getInitials } from '~/redux/config'
import { useSelector } from 'react-redux'

const UserPage: React.FC = () => {
  const { profileId } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const userProfile = useSelector((state: RootState) => state.profiles.publicProfile)
  const navigate = useNavigate()
  const [isFetched, setFetched] = useState(false)
  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(getPublicProfile(profileId!))
      .unwrap()
      .then(() => setFetched(true))
      .catch((err) => {
        console.log(err)
        navigate('/')
      })
      .finally(() => dispatch(setLoading(false)))
  }, [])

  console.log(isFetched)

  return (
    isFetched && (
      <div
        style={{
          height: '80vh'
        }}
      >
        <div className='fullname-headline'>
          <h1 className='fullname'>
            {userProfile?.firstName} {userProfile?.lastName}
          </h1>
          <h3>{userProfile?.headline}</h3>
        </div>
        <div className='avatar-description'>
          <div className='avatar'>
            <div className='avatar-image'>
              <div>{getInitials(userProfile!.firstName + userProfile!.lastName)}</div>
            </div>
            <div className='routes'>
              {userProfile?.twitter && (
                <div>
                  <FaSquareXTwitter size={24} />
                </div>
              )}
              {userProfile?.facebook && (
                <div>
                  <FaSquareFacebook size={24} />
                </div>
              )}
              {userProfile?.linkedin && (
                <div>
                  <FaLinkedin size={24} />
                </div>
              )}
              {userProfile?.youtube && (
                <div>
                  <IoLogoYoutube size={24} />
                </div>
              )}
            </div>
          </div>
          <div className='description'>
            <p>{userProfile?.description}</p>
          </div>
        </div>
      </div>
    )
  )
}

export default UserPage
