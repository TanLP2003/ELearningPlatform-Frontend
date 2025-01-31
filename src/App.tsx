import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import RootLayout from './components/layouts/RootLayout'
import Login from './pages/Home/Login'
import Signup from './pages/Home/Signup'
import { useSelector } from 'react-redux'
import { RootState } from './redux'
import Loading from './components/common/Loading'
import MyCourse from './pages/MyCourses'
import Learning from './pages/MyCourses/Learning'
import WishList from './pages/MyCourses/WishList'
import InstructorLayout from './components/layouts/IntructorLayout'
import VideoPlayer from './components/common/VideoPlayer'
import Cart from './pages/Cart'
import CourseInstructor from './pages/CourseInstructor'
import CourseManagementLayout from './components/layouts/CourseManagementLayout'
import OverviewCourse from './pages/CourseManagement/OverviewCourse'
import CourseStructure from './pages/CourseManagement/CourseStructure'
import CourseLearning from './pages/CourseLearning'
import CourseViewing from './pages/CoursesViewing'
import ProtectedRoute from './components/common/ProtectedRoute'
import PaymentWrapper from './pages/Payment'
import NotFound from './pages/NotFound'
import SearchPage from './pages/SearchPage'
import PaymentSuccess from './pages/Payment/PaymentSuccess'
import ArchievedList from './pages/MyCourses/ArchievedList'
import ProfileSettings from './pages/ProfileSettings'
import UserPage from './pages/UserPage'
function App() {
  const isLoading = useSelector((state: RootState) => state.loading.loading)
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
        style={{ zIndex: 99999999999999 }}
      />
      <Router>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path='auth' element={<Login />} />
            <Route path='auth/register' element={<Signup />} />
            <Route path='my-courses' element={<ProtectedRoute element={<MyCourse />} />}>
              <Route index element={<ProtectedRoute element={<Learning />} />} />
              <Route path='wishlist' element={<ProtectedRoute element={<WishList />} />} />
              <Route path='archieved' element={<ProtectedRoute element={<ArchievedList />} />} />
            </Route>
            <Route path='cart' element={<ProtectedRoute element={<Cart />} />} />
            <Route path='course/:courseId' element={<CourseViewing />} />
            <Route path='search' element={<SearchPage />} />
            <Route path='/payment/success' element={<ProtectedRoute element={<PaymentSuccess />} />} />
            <Route path='user/:profileId' element={<ProtectedRoute element={<UserPage />} />} />
          </Route>
          <Route path='/instructor' element={<ProtectedRoute element={<InstructorLayout />} />}>
            <Route index element={<CourseInstructor />} />
            <Route path='profile' element={<ProfileSettings />} />
          </Route>
          <Route path='/instructor/:courseId/manage' element={<ProtectedRoute element={<CourseManagementLayout />} />}>
            <Route index element={<OverviewCourse />} />
            <Route path='structure' element={<CourseStructure />} />
          </Route>
          <Route path='learning/:courseId' element={<ProtectedRoute element={<CourseLearning />} />} />
          <Route
            path='/payment/checkout'
            element={<ProtectedRoute element={<PaymentWrapper paymentType='basket' />} />}
          />
          <Route
            path='/payment/course/:courseId'
            element={<ProtectedRoute element={<PaymentWrapper paymentType='buynow' />} />}
          />

          <Route path='*' element={<NotFound />} />
          {/* <Route path='video' element={<VideoPlayer />} /> */}
        </Routes>
      </Router>
      {isLoading && <Loading />}
    </>
  )
}

export default App
