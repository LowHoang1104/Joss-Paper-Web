import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import AboutPage from './pages/AboutPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProductsPage from './pages/ProductsPage.jsx'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
