import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'

const Cart = () => {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <p className="fs-4 text-muted">Tu carrito está vacío.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Ir al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Carrito de compras</h2>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio unitario</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeItem} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Vaciar carrito
        </button>

        <div className="text-end">
          <h4>Total: ${getTotalPrice().toLocaleString('es-AR')}</h4>
          <Link to="/checkout" className="btn btn-success mt-2">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
