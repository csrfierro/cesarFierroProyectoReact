import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useCart } from '../../context/CartContext'

const initialForm = { name: '', email: '', phone: '' }

const CheckoutForm = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio.'
    if (!form.email.trim()) {
      newErrors.email = 'El email es obligatorio.'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'El email no es válido.'
    }
    if (!form.phone.trim()) newErrors.phone = 'El teléfono es obligatorio.'
    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setLoading(true)

    const order = {
      buyer: form,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: getTotalPrice(),
      date: serverTimestamp(),
    }

    try {
      const ordersCollection = collection(db, 'orders')
      const newOrderRef = await addDoc(ordersCollection, order)
      setOrderId(newOrderRef.id)
      clearCart()
    } catch (error) {
      console.error('Error al generar la orden:', error)
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-success">¡Compra realizada con éxito!</h2>
        <p className="fs-5 mt-3">
          Tu número de orden es: <strong>{orderId}</strong>
        </p>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al catálogo
        </Link>
      </div>
    )
  }

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
    <div className="container py-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Datos de contacto</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <h5 className="mb-3">Total a pagar: ${getTotalPrice().toLocaleString('es-AR')}</h5>

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </form>
    </div>
  )
}

export default CheckoutForm
