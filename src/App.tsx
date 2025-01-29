
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Setting from './pages/Setting/Setting'
import EventPage from './pages/Event/EventPage'
import Message from './pages/Message/Message'
import MarketPlace from './pages/MarketPlace/MarketPlace'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import AdminPage from './pages/Admin/AdminPage'
import { AuthProvider } from './Authentication/AuthContext'
import ProtectedRoute from './Authentication/ProtectedRoute'
import Layout from './Authentication/Layout'
import OTPPage from './pages/Auth/OTPPage'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ActivateAccount from './pages/Auth/ActiveAccount'
import SearchPage from './pages/SearchPage/SearchPage'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import ForgotPassword from './pages/Auth/ForgotPw'
import ResetPassword from './pages/Auth/ResetPassword'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Layout />,
    children: [
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
        path: '/home/all',
        element: (
          <ProtectedRoute>
            <MarketPlace />
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



    