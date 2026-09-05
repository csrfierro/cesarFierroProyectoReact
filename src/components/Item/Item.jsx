import { Link } from 'react-router-dom'

const Item = ({ product }) => {
  const { id, name, price, image, stock } = product

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src={image} className="card-img-top" alt={name} style={{ objectFit: 'cover', height: '220px' }} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text fw-bold">${price.toLocaleString('es-AR')}</p>
          {stock === 0 ? (
            <span className="badge bg-secondary mb-2">Sin stock</span>
          ) : (
            <span className="badge bg-success mb-2">Stock: {stock}</span>
          )}
          <Link to={`/item/${id}`} className="btn btn-primary mt-auto">
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Item
