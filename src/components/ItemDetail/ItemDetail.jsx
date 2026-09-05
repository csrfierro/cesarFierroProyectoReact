import { useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from '../ItemCount/ItemCount'
import { useCart } from '../../context/CartContext'

const ItemDetail = ({ product }) => {
  const { id, name, description, price, image, stock, category } = product
  const { addItem } = useCart()
  const [addedQuantity, setAddedQuantity] = useState(0)

  const handleAdd = (quantity) => {
    addItem({ id, name, price, image }, quantity)
    setAddedQuantity(quantity)
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-5">
          <img src={image} alt={name} className="img-fluid rounded shadow-sm" />
        </div>
        <div className="col-md-7">
          <span className="badge bg-info text-dark mb-2 text-capitalize">{category}</span>
          <h2>{name}</h2>
          <p className="text-muted">{description}</p>
          <h3 className="fw-bold mb-3">${price.toLocaleString('es-AR')}</h3>

          {stock === 0 && <p className="text-danger fw-bold">Producto sin stock</p>}

          {addedQuantity === 0 && stock > 0 && (
            <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
          )}

          {addedQuantity > 0 && (
            <div className="alert alert-success mt-3">
              Agregaste {addedQuantity} unidad(es) al carrito.
              <div className="mt-2 d-flex gap-2">
                <Link to="/cart" className="btn btn-sm btn-success">
                  Ir al carrito
                </Link>
                <Link to="/" className="btn btn-sm btn-outline-secondary">
                  Seguir comprando
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemDetail
