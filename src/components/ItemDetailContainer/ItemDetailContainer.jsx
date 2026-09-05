import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loader from '../Loader/Loader'

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { itemId } = useParams()

  useEffect(() => {
    setLoading(true)
    setProduct(null)

    const productRef = doc(db, 'products', itemId)

    getDoc(productRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() })
        }
      })
      .catch((error) => console.error('Error al obtener el producto:', error))
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) return <Loader />

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <p className="fs-5 text-muted">El producto solicitado no existe.</p>
      </div>
    )
  }

  return <ItemDetail product={product} />
}

export default ItemDetailContainer
