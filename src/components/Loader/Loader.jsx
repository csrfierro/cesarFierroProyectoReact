const Loader = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3 text-muted">Cargando...</p>
    </div>
  )
}

export default Loader
