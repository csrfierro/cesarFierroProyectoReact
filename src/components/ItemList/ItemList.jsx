import Item from '../Item/Item'

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted fs-5">No hay productos disponibles en esta categoría.</p>
      </div>
    )
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ItemList
