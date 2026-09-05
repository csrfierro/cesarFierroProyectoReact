import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemList from '../ItemList/ItemList'
import Loader from '../Loader/Loader'

const ItemListContainer = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)

    const productsCollection = collection(db, 'products')
    const productsQuery = categoryId
      ? query(productsCollection, where('category', '==', categoryId))
      : productsCollection

    getDocs(productsQuery)
      .then((snapshot) => {
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setProducts(productsList)
      })
      .catch((error) => console.error('Error al obtener los productos:', error))
      .finally(() => setLoading(false))
  }, [categoryId])

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-capitalize">{categoryId ? categoryId : 'Todos los productos'}</h2>
      {loading ? <Loader /> : <ItemList products={products} />}
    </div>
  )
}

export default ItemListContainer
