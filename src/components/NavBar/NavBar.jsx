import { NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'

const categories = [
  { slug: 'remeras', label: 'Remeras' },
  { slug: 'pantalones', label: 'Pantalones' },
  { slug: 'calzado', label: 'Calzado' },
  { slug: 'accesorios', label: 'Accesorios' },
]

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold">
          CF Store
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Catálogo
              </NavLink>
            </li>
            {categories.map((category) => (
              <li className="nav-item" key={category.slug}>
                <NavLink to={`/category/${category.slug}`} className="nav-link">
                  {category.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <CartWidget />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
