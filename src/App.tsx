
import './App.css'
import { createBrowserRouter, RouterProvider, useLocation, } from 'react-router-dom'
import Setting from './pages/Setting/Setting'
import ElectronicItems from './pages/Category/ElectronicCategory/ElectronicItems'
import Vechicle from './pages/Category/Vechicle/Data/Vechicle'
import Cakes from './pages/Category/Cakes/Cakes'
import Accessories from './pages/Category/Accessories/Accessories'
import EventPage from './pages/Event/EventPage'
import Message from './pages/Message/Message'
import MarketPlace from './pages/MarketPlace/MarketPlace'
import OtherPage from './pages/Category/Others/OtherPage'
import Property from './pages/Category/Property/Property'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AdminPage from './pages/Admin/AdminPage'
import SoldPage from './pages/Sold/SoldPage'
import { AuthProvider } from './Authentication/AuthContext'
import ProtectedRoute from './Authentication/ProtectedRoute'
import Layout from './Authentication/Layout'
import HomePage from './pages/Home/HomePage'
import HomeGarden from './pages/Category/HomeGarden/HomeGarden'
import OTPPage from './pages/Auth/OTPPage'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ActivateAccount from './pages/Auth/ActiveAccount'
import SearchPage from './pages/SearchPage/SearchPage'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import ForgotPassword from './pages/Auth/ForgotPw'
import ResetPassword from './pages/Auth/ResetPassword'
import PopupCard from './common/Component/Cards/PostCard/PopupCard'
import PostCards from './common/Component/Cards/PostCard/PostCards'
import ChatGPT from './pages/Message/ChatGPT'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <HomePage /> 
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/posts/:postId',
        element: (
          <ProtectedRoute>
            <PopupCard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/markets',
        element: (
          <ProtectedRoute>
            <MarketPlace />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/event',
        element: (
          <ProtectedRoute>
            <EventPage />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/setting',
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/messages',
        element: (
          <ProtectedRoute>
            <Message />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/chat',
        element: (
          <ProtectedRoute>
            <ChatGPT />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/all',
        element: (
          <ProtectedRoute>
            <MarketPlace />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/sold',
        element: (
          <ProtectedRoute>
            <SoldPage />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/electronic',
        element: (
          <ProtectedRoute>
            <ElectronicItems />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/vehicle',
        element: (
          <ProtectedRoute>
            <Vechicle />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/cake',
        element: (
          <ProtectedRoute>
            <Cakes />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/property',
        element: (
          <ProtectedRoute>
            <Property />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/fashion',
        element: (
          <ProtectedRoute>
            <Accessories />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/homeg',
        element: (
          <ProtectedRoute>
            <HomeGarden />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/other',
        element: (
          <ProtectedRoute>
            <OtherPage />
          </ProtectedRoute>
        ),
      },

      {
        path: '/home/search',
        element: (
          <ProtectedRoute>
            <SearchPage/>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/otp',
    element: <OTPPage />,
  },  
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/forgot',
    element: <ForgotPassword />,
  },
  {
    path: '/active',
    element: <ActivateAccount />,
  },
  
]);

function App() {
  
  return (
    
    <>


  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </LocalizationProvider>


  </>
    
  )
}

export default App



    