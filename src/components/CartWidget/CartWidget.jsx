import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const CartWidget = () => {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Link to="/cart" className="btn btn-outline-light position-relative d-flex align-items-center">
      <i className="bi bi-cart3 fs-5"></i>
      {totalItems > 0 && (
        <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
          {totalItems}
        </span>
      )}
    </Link>
  )
}

export default CartWidget
