import {
  createHashRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import { CartProvider } from './context/CartContext.jsx'
import AboutPage from './pages/AboutPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import CartPage from './pages/CartPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import HomePage from './pages/HomePage.jsx'
import PolicyPage from './pages/PolicyPage.jsx'
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
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'policy',
        element: <PolicyPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App
