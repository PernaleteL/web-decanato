import './Login.css';
import logodeca from '../img/ucla3.png'
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2'

const Login = () => {

    const[usuario,setUsuario]= useState({
        email:'',
        password:''
    })

    const handleLogin = (event) => {
        setUsuario({
          ...usuario,
          [event.target.name]: event.target.value,
        })
    }

    const iniciarSesion = async()=>{
        console.log(usuario)
        
       try {
        const response = await axios.post('http://localhost:9000/login', usuario)

        const token= response.data.token;
        // Almacenar el token en localStorage
        if (token) {
          localStorage.setItem("token", token);
          
          window.location.reload();
        }else{
          Swal.fire({
            background:'rgba(0, 0, 0, 0.92)',
            color:'aliceblue',
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            confirmButtonColor:'#EB193C',
            confirmButtonText:'Aceptar'
          })
        }
        console.log("Sesión iniciada:", localStorage.token);
       } catch (error) {
        console.log(error)
       }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita que se envíe el formulario
        // Aquí puedes agregar tu código para procesar los datos del formulario
      };

  return (
    <div className='flex justify-center items-center cont-login'>
        <div className="container mx-auto p-4 bg-white">
  <div className="w-full md:w-1/2 lg:w-1/3 mx-auto mb-12 mt-6">
    <div className="div-login">
        <img src={logodeca} alt="" className='img-login'/>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col mt-4">
      <input
          type="email"
          name="email"
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
          placeholder="Correo"
          onChange={handleLogin}
      />
      <input
          type="password"
          name="password"
          className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-2 focus:outline-none focus:ring-cyan-500 text-sm"
          placeholder="Contraseña"
          onChange={handleLogin}
      />
      <button
        onClick={iniciarSesion}
          type="button"
          className="mt-4 w-full bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2"
      >
        Login
      </button>
      <div className="flex flex-col items-center mt-5">
        <p className="mt-1 text-xs font-light text-gray-500">
          New to Here?<a className="ml-1 font-medium text-blue-400">Sign up now</a>
          </p>
      </div>
    </form>
  </div>
</div>
    </div>
    
  )
}

export default Login