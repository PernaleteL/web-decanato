import './App.css'
import TableCarreras from './pages/TableCarreras.jsx'
import PagPrincipal from './pages/PagPrincipal'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import GestionarCarreras from './pages/GestionarCarreras.jsx'
import Profesores from './pages/Profesores.jsx'
import Login from './pages/Login.jsx'
import Telematica from './pages/Telematica.jsx'
import TableProfesores from './pages/TableProfesores.jsx'
import Gestion from './pages/Gestion.jsx'

function App() {
  const isAuth = localStorage.getItem('token')

  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route path='/' element={<PagPrincipal />} />
      <Route path='/gestion/carreras' element={<GestionarCarreras />} />
      <Route path='/profesores' element={<Profesores />} />
      <Route path='/telematica' element={<Telematica />} />
      <Route path='//gestion/profesores/telematica' element={isAuth ? <TableProfesores/> : <Navigate to='/login'/>} />
      <Route path='//gestion/carreras/telematica' element={isAuth ? <TableCarreras/> : <Navigate to='/login'/>} />
      <Route path='/login' element={isAuth ? <Navigate to='/gestion'/> : <Login/>}  />
      <Route path='/gestion' element={isAuth ? <Gestion/> : <Navigate to='/login'/>} />
    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
