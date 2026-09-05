import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container py-5 text-center">
      <h2>404 - Página no encontrada</h2>
      <Link to="/" className="btn btn-primary mt-3">
        Volver al catálogo
      </Link>
    </div>
  )
}

export default NotFound
