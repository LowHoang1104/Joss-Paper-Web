import { NavLink } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

function CartLink({ mobile = false, onClick }) {
  const { itemCount } = useCart()

  return (
    <NavLink
      to="/cart"
      onClick={onClick}
      className={({ isActive }) =>
        `cart-nav-link ${mobile ? 'cart-nav-link-mobile' : ''} ${isActive ? 'active' : ''}`.trim()
      }
    >
      <span className="cart-icon" aria-hidden="true">
        🛒
      </span>
      <span>Giỏ hàng</span>
      {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
    </NavLink>
  )
}

export default CartLink
