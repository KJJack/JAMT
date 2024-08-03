import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import { UserProvider } from './util/UserContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
    errorElement: <NotFound/>
  },
  {
    path: "/home",
    element: <Home/>,
    errorElement: <NotFound/>
  },
  {
    path:"/calendar",
    element: <CalendarPage/>,
    errorElement: <NotFound/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>,
)
