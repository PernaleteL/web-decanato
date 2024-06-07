import './Foo.css'
import logo from '../img/ucla3.png'
import pin from '../img/pin.svg'
import phone from '../img/phone.svg'
import mail from '../img/mail.svg'
import face from '../img/facebook.svg'
import twitter from '../img/x-twitter.svg'
import insta from '../img/instagram.svg'

const Foo = () => {
  return (
    <>
    <footer>
        <div className="main-content">
            <div className="left box">
                <div className="logo-f">
                    <img className='logo-img' src={logo} alt="" />
                </div>
                <p className='lema'>"Lux Et Veritas"</p>
            </div>

            <div className="center box">
            <h2>Nosotros</h2>
            <div className="content">
                <p>Somos una institución comprometida con la excelencia académica, la innovación y el desarrollo integral de nuestros estudiantes. En nuestra universidad, fomentamos un ambiente inclusivo que promueve el aprendizaje, la investigación y la formación de líderes del mañana. </p>
                <div className="social">
                    <a target="_blank" href="#"><img className='ico-social' src={face} alt="" /></a>
                    <a target="_blank" href="#"><span className="fab "><img className='ico-social' src={twitter} alt="" /></span></a>
                    <a target="_blank" href="#"><span className="fab "></span><img className='ico-social' src={insta} alt="" /></a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCodSpPp_r_QnYIQYCjlyVGA"><span className="fab fa-youtube"></span></a>
                </div>
            </div>
            </div>

            <div className="right box">
            <h2>Ubicación</h2>
            <div className="content">
                <div className="ubi">
                <span className="fas "><img className='pin' src={pin} alt="" /></span>
                <span className="text">Avenida las Industrias, Barquisimeto 3001, Lara</span>
                </div>
                <div className="phone">
                <span className="fas "><img className='pin' src={phone} alt="" /></span>
                <span className="text">+58 412-387-2648</span>
                </div>
                <div className="email">
                <span className="fas "><img className='pin' src={mail} alt="" /></span>
                <span className="text">1005.25653055.ucla@gmail.com</span>
                </div>
            </div>
            </div>
        </div>
        <div className="bottom">
            <center>
            <span className="credit">Desarrollado por Luis Pernalete
                | </span>
            <span className="far fa-copyright"></span><span> 2024.</span>
            </center>
        </div>
    </footer>
    </>
  )
}

export default Foo