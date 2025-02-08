import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Setting from './pages/Setting/Setting'
import EventPage from './pages/Event/EventPage'
import Message from './pages/Message/Message'
import MarketPlace from './pages/MarketPlace/MarketPlace'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AdminPage from './pages/Admin/AdminPage'
import { AuthProvider } from './Authentication/AuthContext'
import ProtectedRoute from './Authentication/ProtectedRoute'
import Layout from './Authentication/Layout'
import OTPPage from './pages/Auth/OTPPage'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import ActivateAccount from './pages/Auth/ActiveAccount'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import ForgotPassword from './pages/Auth/ForgotPw'
import ResetPassword from './pages/Auth/ResetPassword'
import "./hero-section.css";
import Finance from './pages/Finances/Finance'
import Dashboard from './pages/Finances/content/dashboard'
import Order from './pages/Finances/content/Order'
import Finances from './pages/Finances/content/Finances'
import Reports from './pages/Finances/content/reports'
import Issue from './pages/Finances/content/Issue/Issue'
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
        path: '/home/finance',
        element: (
          <ProtectedRoute>
            <Finance />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/finance/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/finance/order',
        element: (
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/finance/finances',
        element: (
          <ProtectedRoute>
            <Finances />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/finance/reports',
        element: (
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: '/home/finance/issue',
        element: (
          <ProtectedRoute>
            <Issue />
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
            {/* <SearchPage/> */}
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
])

function App() {
  return (
    <>
      {/* <div className="hero-section">
        <div className="gradient-bg"></div>
        <div className="radial-gradient-bg"></div>
        <div className="grid-overlay"></div>
        
 
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        
  
        <div className="light-beam beam-1"></div>
        <div className="light-beam beam-2"></div>
        <div className="light-beam beam-3"></div>
        <div className="light-beam beam-4"></div>
        

        <div className="ripple ripple-1"></div>
        <div className="ripple ripple-2"></div>
        <div className="ripple ripple-3"></div>
        

        <div className="particles">
          <div className="particle" style={{"--tx": "100px", "--ty": "-150px"} as React.CSSProperties}></div>
          <div className="particle" style={{"--tx": "-120px", "--ty": "-100px"} as React.CSSProperties}></div>
          <div className="particle" style={{"--tx": "150px", "--ty": "120px"} as React.CSSProperties}></div>
          <div className="particle" style={{"--tx": "-100px", "--ty": "150px"} as React.CSSProperties}></div>
          <div className="particle" style={{"--tx": "120px", "--ty": "-100px"} as React.CSSProperties}></div>
        </div>
      </div> */}
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </LocalizationProvider>
    </>
  )
}

export default App



    