import Navbar from "../pages/Navbar"
import Foo from "../pages/Foo"
import './Telematica.css'
import { useState, useEffect } from "react"
import axios from "axios"
import ModalMateriasTelematicas from "../pages/ModalMateriasTelematicas"
import ModalProfesorTelematica from "./ModalProfesorTelematica"
import Swal from 'sweetalert2'

const Telematica = () => {

  const [materias, setMaterias] = useState([]);
  const [autoridades, setAutoridades] = useState([]);
  const [openMaterias, setOpenMaterias] = useState(false);
  const [thisMaterias, setThisMaterias] = useState("");
  const [thisProfesor, setThisProfesor] = useState("");
  const [openProfesor, setOpenProfesor] = useState(false);

  const handleModalStop = (e) => e.stopPropagation();

const handleModalMaterias = (datosMateria) => {
  setOpenMaterias(true);
  setThisMaterias(datosMateria);
  console.log(thisMaterias);
}
const handleModalProfesor = (idProfesor) => {
  console.log(idProfesor);
  
  if (idProfesor) {
    setOpenProfesor(true);
  setThisProfesor(idProfesor);
  console.log("idProfesor es" +thisProfesor);
  }else{
    Swal.fire({
      title: "Actualmente no hay profesor para esta asignatura",
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: '#4CAF50', // Cambia el color del botón "OK" aquí
      confirmButtonText: 'OK'
    });
    
  }
}

    useEffect(() => {
        const fetchMaterias = async () => {
          try {
            const response = await axios.get('http://localhost:9000/materias-telematica');
            // Ordenar las materias por el número de semestre
            setMaterias([...response.data].sort((a, b) => a.data.semestre - b.data.semestre))
          } catch (error) {
            console.error('Error al obtener los materias:', error);
          }
        };
        const fetchAutoridades = async () => {
          try {
            const response = await axios.get('http://localhost:9000/autoridades');
            const autoridadesData = response.data;
            const director= autoridadesData.find(autoridad => autoridad.data.roll === 'Director');
            const subdirector = autoridadesData.find(autoridad => autoridad.data.roll === 'Subdirector');  
            setAutoridades([director, subdirector]);
          } catch (error) {
            console.error('Error al obtener los autoridades:', error);
          }
        };
        fetchMaterias();
        fetchAutoridades();
      }, []);

 
  return (
    <div>
        <Navbar />
        { openMaterias &&(
          <div className="cont-modal" onClick={()=> setOpenMaterias(false)}>
            <div className="modal w-full md:w-[500px] lg:w-[700px]" onClick={handleModalStop}>
              <ModalMateriasTelematicas datosMateria={thisMaterias} />
            </div>
          </div>
        )
        }
        { openProfesor &&(
          <div className="cont-modal" onClick={()=> setOpenProfesor(false)}>
            <div className="modal w-[430px] " onClick={handleModalStop}>
              <ModalProfesorTelematica idProfesor={thisProfesor}/>
            </div>
          </div>
        )
        }
        <main className="main-tele">
         <section className="sec-tele-banner">
            <div className="cont-h1-tele">
                <h1 className="h1-tele font-robot font-normal text-white ">Carrera de Ingeniería Telemática</h1>
            </div>
         </section>
        <div className="">
  <section className="sec-tele">
            <div className="cont-informacion">
           <div className="div-informacion">
           <p className="p-tele  ">Nuestra carrera de <strong>Ingeniería Telemática</strong> integra la ingeniería de <strong>telecomunicaciones</strong> y la ingeniería <strong>informática</strong> para formar profesionales capaces de diseñar, implementar y gestionar sistemas de comunicaciones y redes de información. </p>
             <p className="p-tele  ">Los estudiantes adquieren conocimientos fundamentales en áreas clave como el diseño y gestión de <strong>redes de comunicaciones</strong>, la <strong>seguridad de redes</strong>, el desarrollo de <strong>software y aplicaciones</strong> y la integración de <strong>tecnologías de la información y las comunicaciones</strong>. A través de un enfoque interdisciplinario, nuestros graduados están preparados para enfrentar los desafíos actuales y futuros en el campo de las telecomunicaciones y la informática, contribuyendo a soluciones innovadoras y eficientes en un entorno tecnológico en constante evolución.</p>
           </div>
            </div>
            </section>
        </div>
        <div>
          <div className="div-h2">
          <h2 className="h2-tele">Pensum de la Carrera de Ingeniería Telemática</h2>
          </div>
    <section className="sec-pensum">
    <div className=" rounded-md border border-gray-200 overflow-auto mb-8">
  <div className="overflow-x-auto rounded-t-lg">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead className="ltr:text-left rtl:text-right">
        <tr>
          <th className="whitespace-nowrap pr-1 pl-4 py-2 text-xs font-medium text-gray-900">Semestre</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">Asignatura</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">Código</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">U/C</th>
          <th className="whitespace-nowrap px-2 th-des py-2 text-xs font-medium text-gray-900">Descripción</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900 ">Profesor</th>
          <th className="whitespace-nowrap px-2 py-2 font-medium text-xs text-gray-900">Prelación</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {materias.length > 0 ?
        materias.map((materia) => (
          <tr key={materia.id} >
            <td onClick={()=>handleModalMaterias(materia)} className="whitespace-nowrap pr-1 pl-4 py-1 cursor-pointer  text-gray-900">{materia.data.semestre}</td>
            <td onClick={()=>handleModalMaterias(materia)} className="whitespace-nowrap px-2 py-1 cursor-pointer text-xs text-gray-700">{materia.data.asignatura}</td>
            <td onClick={()=>handleModalMaterias(materia)} className="whitespace-nowrap px-2 py-1 cursor-pointer text-xs text-gray-700">{materia.data.codigo}</td>
            <td onClick={()=>handleModalMaterias(materia)} className="whitespace-nowrap px-2 py-1 cursor-pointer text-xs text-gray-700">{materia.data.uc}</td>
            <td onClick={()=>handleModalMaterias(materia)} className=" td-des px-2 text-xs py-1 cursor-pointer text-gray-700">{materia.data.descripcion}</td>
            <td 
           // onClick={()=>handleModalMaterias(materia)} 
            className=" td-des px-2 text-xs py-1 cursor-pointer text-gray-700">
             <label htmlFor="selectProfesor">
               {materia.data.profesores.profesorSeccion1}
              <select name="selectProfesor" id="selectProfesor"  
              style={{appearance: "none",border: "none",outline: "none",background: "none"}}
              >
                {materia.data.profesores.profesorSeccion1 && (<option  value="">Seccion 1: {materia.data.profesores.profesorSeccion1}</option>)}
                {materia.data.profesores.profesorSeccion2 && (<option  value="">Seccion 2: {materia.data.profesores.profesorSeccion2}</option>)}
                {materia.data.profesores.profesorSeccion3 && (<option  value="">Seccion 3: {materia.data.profesores.profesorSeccion3}</option>)}
                {materia.data.profesores.profesorSeccion4 && (<option  value="">Seccion 4: {materia.data.profesores.profesorSeccion4}</option>)}
              </select>
             </label>
              </td>
            {/**<td onClick={() => handleModalProfesor(materia.data.idProfesores.idProfesorSeccion1)} className="td-des px-2 py-1 cursor-pointer text-xs text-gray-700 hover:text-cyan-500">{materia.data.profesores.profesorSeccion1}{materia.data.profesores.profesorSeccion2 ? ', ' + materia.data.profesores.profesorSeccion2 : ''}{materia.data.profesores.profesorSeccion3 ? ', ' + materia.data.profesores.profesorSeccion3 : ''}{materia.data.profesores.profesorSeccion4 ? ', ' + materia.data.profesores.profesorSeccion4 : ''}</td> */}
            <td onClick={()=>handleModalMaterias(materia)} className="whitespace-nowrap text-xs td-prela px-2 py-1 cursor-pointer text-gray-700">{materia.data.prelacion}</td>
          
          </tr>
        )) 
        :(
          <tr>
          <td colSpan="5" className="text-center py-4 ">
            <p className="text-gray-900 ">No se encontraron resultados</p>
          </td>
        </tr>
        )
        }
      </tbody>
    </table>
  </div>
  
</div>
            </section>
        </div>
        <div className="div-auto-tele">
        <div className="div-h2">
          <h2 className="h2-tele">Autoridades de la Carrera</h2>
          </div>
          <section className="sec-auto-tele">
          {
            autoridades.length > 0 ? (
              autoridades[0].data.roll === 'Director' ? (
                <div className="card-auto">
                 <div
  href="#"
  className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-4 lg:p-6"
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-300  to-red-600"
  ></span>

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
      {autoridades[0].data.nombre}
      </h3>

      <p className="mt-1 text-md font-medium text-gray-600">Director de la carrera de Ingeniería Telemática</p>
    </div>

    <div className="flex justify-center sm:block sm:shrink-0">
      <img
        alt=""
        src={autoridades[0].data.img}
        className=" rounded-lg object-cover shadow-sm auto-img"
      />
    </div>
  </div>

  <div className="mt-4">
    <p className="text-pretty text-sm text-gray-500">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
      maiores deleniti consectetur nobis et eaque.
    </p>
  </div>

  <dl className="mt-6 flex gap-4 sm:gap-6">
    <div className="flex flex-col">
      <p className="text-xs text-gray-500">Correo de contacto:</p>
      <p className="text-sm font-medium text-gray-600">{autoridades[0].data.correo}</p>
    </div>

    <div className="flex flex-col-reverse">
      <dt className="text-sm font-medium text-gray-600">Reading time</dt>
      <dd className="text-xs text-gray-500">3 minute</dd>
    </div>
  </dl>
</div>
                </div>
              ) : (
                <div>
                  <p>Cargando...</p>
                </div>
              )
            ) : (
              <div>
                <p>Cargando...</p>
              </div>
            )
          }
          {
            autoridades.length > 0 ? (
              autoridades[1].data.roll === 'Subdirector' ? (
                <div className="card-auto">
                 <div
  href="#"
  className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-4 lg:p-6"
>
  <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 via-blue-300  to-red-600"
  ></span>

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
      {autoridades[1].data.nombre}
      </h3>
      <p className="mt-1 text-md font-medium text-gray-600">Subdirector de la carrera de Ingeniería Telemática</p>
    </div>
    <div className="flex justify-center sm:block sm:shrink-0">
      <img
        alt=""
        src={autoridades[1].data.img}
        className=" rounded-lg object-cover shadow-sm auto-img"
      />
    </div>
  </div>
  <div className="mt-4">
    <p className="text-pretty text-sm text-gray-500">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
      maiores deleniti consectetur nobis et eaque.
    </p>
  </div>

  <dl className="mt-6 flex gap-4 sm:gap-6">
    <div className="flex flex-col">
      <p className="text-xs text-gray-500">Correo de contacto:</p>
      <p className="text-sm font-medium text-gray-600">{autoridades[1].data.correo}</p>
    </div>

    <div className="flex flex-col-reverse">
      <dt className="text-sm font-medium text-gray-600">Reading time</dt>
      <dd className="text-xs text-gray-500">3 minute</dd>
    </div>
  </dl>
</div>
                </div>
              ) : (
                <div>
                  <p>Cargando...</p>
                </div>
              )
            ) : (
              <div>
                <p>Cargando...</p>
              </div>
            )
          }

          </section>
        </div>
        </main>
        <Foo />
    </div>
  )
}

export default Telematica