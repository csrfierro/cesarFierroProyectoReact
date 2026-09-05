import { useState } from 'react'

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial)

  const handleIncrement = () => {
    if (count < stock) setCount(count + 1)
  }

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1)
  }

  const handleAdd = () => {
    if (count < 1 || count > stock) return
    onAdd(count)
  }

  return (
    <div className="d-flex flex-column align-items-start gap-2">
      <div className="input-group" style={{ maxWidth: '150px' }}>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleDecrement}
          disabled={count <= 1}
        >
          -
        </button>
        <span className="form-control text-center">{count}</span>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleIncrement}
          disabled={count >= stock}
        >
          +
        </button>
      </div>
      <button className="btn btn-primary" onClick={handleAdd} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount
