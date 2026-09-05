const CartItem = ({ item, onRemove }) => {
  const { id, name, image, price, quantity } = item
  const subtotal = price * quantity

  return (
    <tr>
      <td className="d-flex align-items-center gap-3">
        <img src={image} alt={name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="rounded" />
        <span>{name}</span>
      </td>
      <td>${price.toLocaleString('es-AR')}</td>
      <td>{quantity}</td>
      <td className="fw-bold">${subtotal.toLocaleString('es-AR')}</td>
      <td>
        <button className="btn btn-sm btn-outline-danger" onClick={() => onRemove(id)}>
          Quitar
        </button>
      </td>
    </tr>
  )
}

export default CartItem
