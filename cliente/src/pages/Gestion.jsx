
import logodeca from '../img/ucla3.png'
import { Link } from 'react-router-dom'

const Gestion = () => {

  const cerrarSesion=()=>{
    localStorage.removeItem('token')
    console.log(localStorage)
    window.location.reload();
  }

  return (
    <div className='flex justify-center items-center cont-login'>
    <div className="container mx-auto p-4 bg-white">
<div className="w-full md:w-1/2 lg:w-1/3 mx-auto mb-12 mt-6">
<div className="div-login">
    <img src={logodeca} alt="" className='img-login'/>
</div>
<div className="div-btn mb-20">
<Link to="/gestion/profesores/telematica">
<button
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
>
  Gestión de Profesores
</button>
</Link>
<Link to="/gestion/carreras/telematica">
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
>
  Gestión de Carreras
</button>
</Link>
<button
  
    type="button"
    className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-lg font-medium hover:text-gray-100 text-white py-4 rounded-lg mx-auto block  "
>
  Gestión de...
</button>
</div>
  <button
    onClick={cerrarSesion}
      type="button"
      className="mt-4 px-4 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white text-lg font-medium hover:text-gray-100 py-2 rounded-lg mx-auto block "
  >
    Cerrar sesión
  </button>
</div>
</div>
</div>
  )
}

export default Gestion