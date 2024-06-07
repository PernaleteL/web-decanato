import './Navbar.css'
import ucla3 from '../img/ucla3.png'
import menuico from '../img/menu.png'
import flechab from '../img/down.svg'
import flechaa from '../img/up.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const useMenu = () => {

    const [isOpen, setIsOpen] = useState("menu close");

    const toggleMenu =()=>{
    setIsOpen(isOpen==="menu close submenu-decanato" ? "menu open submenu-decanato" : "menu close submenu-decanato");
    setDesplegar(null); // Resetear el estado del primer submenú
    setDesplegarSubmenu(null);
  }

    const [desplegar, setDesplegar] = useState(null);

    const handleDesplegar = (index) => {
      setDesplegar(desplegar === index ? null : index);
      setDesplegarSubmenu(null);
    };

    const [desplegarSubmenu, setDesplegarSubmenu] = useState(null);

    const handleDesplegarDos = (index) => {
      setDesplegarSubmenu(desplegarSubmenu === index ? null : index);
    };
    

    return {isOpen, toggleMenu, desplegar, handleDesplegar, desplegarSubmenu, handleDesplegarDos };
  
};

function Navbar() {

    const { isOpen, toggleMenu,desplegar, handleDesplegar, desplegarSubmenu, handleDesplegarDos } = useMenu();

  return (
    <>
        <header className="header ">
            <div className='div-img'>
                <img src={ucla3} className='logo-deca' alt="" />
                <img src={menuico} onClick={toggleMenu} className='menu-ico' id='menu-ico' alt="" />
            </div>
        <nav className="nav ">
            <ul className={isOpen} id='menu'>
                <li className="menu-item"><Link to='/' ><a className="menu-link">Inicio</a></Link></li>
                
                <li  className="menu-item container-submenu">
                    <a onClick={() => handleDesplegar(1)} href="#" className="menu-link ">Decanato
                        <img className='flecha-ico' src={desplegar===1 ? flechaa : flechab} alt="" />
                    </a>
                        <ul className={desplegar===1 ? "submenu-deca sub-open" : "submenu-deca"}>
                            <li  className="menu-item container-submenu"><a onClick={() => handleDesplegarDos(1)} href="#" className="menu-link">Segundo desplegable
                               <img className='flecha-ico' src={desplegarSubmenu===1 ? flechaa : flechab} alt="" /> 
                            </a>
                                <ul className={desplegarSubmenu===1 ? "submenu-deca sub-open" : "submenu-deca"}>
                                    <li className="menu-item"><a href="#" className="menu-link a-decanato">Esto</a>
                                    </li>
                                    <li className="menu-item"><a href="#" className="menu-link">Quiza</a></li>
                                    <li className="menu-item"><a href="#" className="menu-link">Ayer</a></li>
                                </ul>
                            </li>
                            <li className="menu-item"><Link to="/profesores#inicio"><a  className="menu-link">Profesores</a></Link></li>
                            <li className="menu-item"><a href="#" className="menu-link">Ayer</a></li>
                        </ul>
                    </li>
                <li  className="menu-item container-submenu"><a onClick={() => handleDesplegar(2)} href="#" className="menu-link">Pensum
                    <img className='flecha-ico' src={desplegar===2 ? flechaa : flechab} alt="" />
                </a>
                    <ul className={desplegar===2 ? "sub-pensum submenu-deca sub-open" : "submenu-deca"}>
                        <li className="menu-item"><a href="#" className="menu-link">Pensum de Ingeniería Telemática</a></li>
                        <li className="menu-item"><a href="#" className="menu-link">Pensum de Ingeniería Informática</a>
                        </li>
                        <li className="menu-item"><a href="#" className="menu-link">Pensum de Ingeniería de Producción</a></li>
                        <li className="menu-item"><a href="#" className="menu-link">Pensum de Licenciatura en Matemáticas</a></li>
                        <li className="menu-item"><a href="#" className="menu-link">Pensum de Licenciatura en Física</a></li>
                        <li className="menu-item"><a href="#" className="menu-link">Pensum de Análisis de Sistemas</a></li>
                    </ul>
                </li>
                <li className="menu-item"><a href="#" className="menu-link">Contacto</a></li>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default Navbar