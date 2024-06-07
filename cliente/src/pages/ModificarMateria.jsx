import {  useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

const ModificarMateria = (datosMaterias) => {

    const [modificarMateria, setModificarMateria] = useState({
        datosMaterias:{
          data:{
            semestre: '',
            asignatura: '',
            codigo: '',
            uc: '',
            descripcion: '',
            prelacion: '',
            profesores: {
              profesorSeccion1: '',
              profesorSeccion2: '',
              profesorSeccion3: '',
              profesorSeccion4: '',
            },
            idProfesores: {
              idProfesorSeccion1: '',
              idProfesorSeccion2: '',
              idProfesorSeccion3: '',
              idProfesorSeccion4: '',
            },
          }
        }
    })
    const [sec2Enabled, setSec2Enabled] = useState(false);
    const [sec3Enabled, setSec3Enabled] = useState(false);
    const [sec4Enabled, setSec4Enabled] = useState(false);
    
    const profesorSec1Ref= useRef(null)
    const profesorSec2Ref= useRef(null)
    const profesorSec3Ref= useRef(null)
    const profesorSec4Ref= useRef(null)
    const idProfesorSec1Ref= useRef(null)
    const idProfesorSec2Ref= useRef(null)
    const idProfesorSec3Ref= useRef(null)
    const idProfesorSec4Ref= useRef(null)

    useEffect(() => {
        const cargarMateria = async () => {
          setModificarMateria(datosMaterias)
        };
        cargarMateria();
      }, []);

    useEffect(() => {
        if (modificarMateria.datosMaterias.data.profesores.profesorSeccion2) {
          setSec2Enabled(true);
        }
        if (modificarMateria.datosMaterias.data.profesores.profesorSeccion3) {
          setSec3Enabled(true);
        }
        if (modificarMateria.datosMaterias.data.profesores.profesorSeccion4) {
          setSec4Enabled(true);
        }
      }, [modificarMateria.datosMaterias.data.profesores]);


    const handleSubmit = (e) => e.stopPropagation();

    const confirmarModificar = () => {
        if (!modificarMateria.datosMaterias.data.semestre || !modificarMateria.datosMaterias.data.asignatura|| !modificarMateria.datosMaterias.data.codigo || !modificarMateria.datosMaterias.data.uc  ){
          Swal.fire({
              title: "Campos incompletos",
              text: "Por favor llene todos los campos",
              icon: "warning",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
              customClass: {
                container: 'custom-swal-container' // Agrega una clase personalizada al contenedor de la alerta
              }
            });
            return
      }else{
        Swal.fire({
          title: "Estas seguro de modificarlo?",
          text: "Modificaras permanentemente esta materia!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, modificar!",
          customClass: {
            container: 'custom-swal-container' // Agrega una clase personalizada al contenedor de la alerta
          }
        }).then((result) => {
          if (result.isConfirmed) {
            modificarEstadoMateria();
        //    handleModalModificar()
            Swal.fire({
              title: "Modificado!",
              text: "La materia ha sido modificado.",
              icon: "success",
              customClass: {
                container: 'custom-swal-container' // Agrega una clase personalizada al contenedor de la alerta
              }
            });
          }
        });
      }
      }

    const modificarEstadoMateria = async () => {
        console.log(modificarMateria.datosMaterias.data)
        console.log(modificarMateria.datosMaterias.id)

        try {
              const response = await axios.put(`http://localhost:9000/edit-materia-telematica/${modificarMateria.datosMaterias.id}`, modificarMateria.datosMaterias.data)
              console.log('Materia actualizado correctamente:', response.data);
          } catch (error) {
              console.error('Error al actualizar la materia:', error);
          }
    }


    const handleCheckChangeSec2 = () => {
      if (!sec2Enabled) {
        setSec2Enabled(true); 
      profesorSec2Ref.current.disabled = !sec2Enabled; 
      } else {
        setSec2Enabled(false); 
      profesorSec2Ref.current.disabled = !sec2Enabled; 
      }
    };
    const handleCheckChangeSec3 = () => {
      if (!sec3Enabled) {
        setSec3Enabled(true); 
      profesorSec3Ref.current.disabled = !sec3Enabled; 
      } else {
        setSec3Enabled(false); 
      profesorSec3Ref.current.disabled = !sec3Enabled; 
      }
    };
    const handleCheckChangeSec4 = () => {
      if (!sec4Enabled) {
        setSec4Enabled(true); 
      profesorSec4Ref.current.disabled = !sec4Enabled; 
      } else {
        setSec4Enabled(false); 
      profesorSec4Ref.current.disabled = !sec4Enabled; 
      }
    };

  return (
    <div>
      <div className="contenedor ">
        <div className="w-full p-2 bg-white rounded-lg shadow-lg">
        <h3 className="text-3xl font-semibold text-center text-gray-500 mt-3 mb-1">Modificar Materia</h3>
        <form 
        onSubmit={handleSubmit} 
        className="pl-8 pr-8">
            <div className="mb-2 flex gap-4">
            <div className="w-[50%]">
            <label htmlFor="semestre" className="block mb-1 text-sm text-gray-600">
               Semestre
            </label>
            <input
           value={modificarMateria.datosMaterias.data.semestre}
           onChange={(event) => setModificarMateria(prevState => ({
                ...prevState,
                datosMaterias: {
                  ...prevState.datosMaterias,
                  data: {
                    ...prevState.datosMaterias.data,
                    semestre: event.target.value,
                  },
                },
              }))} 
                type="text"
                id="semestre"
                name="semestre"
                className="class-input text-sm w-full px-4 py-1 border border-gray-600 rounded-lg focus:outline-none focus:border-cyan-500"
            />
            </div>
            <div className="w-[50%]">
            <label htmlFor="codigo" className="block mb-2 text-sm text-gray-600">
                Código
            </label>
            <input
               value={modificarMateria.datosMaterias.data.codigo}
             onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        codigo: event.target.value,
                      },
                    },
                  }))}  
                type="text"
                id="codigo"
                name="codigo"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            </div>
            </div>
            <div className="mb-2">
            <label htmlFor="asignatura" className="block mb-1 text-sm text-gray-600">
                Asignatura
            </label>
            <input
              value={modificarMateria.datosMaterias.data.asignatura}
              onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        asignatura: event.target.value,
                      },
                    },
                  }))}  
                type="text"
                id="asignatura"
                name="asignatura"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:border-cyan-500"
                
            />
            </div>
            <div className="mb-1 flex gap-4">
           <div className="w-[50%]">
           <label htmlFor="uc" className="block mb-2 text-sm text-gray-600">
                U/C
            </label>
            <input
               value={modificarMateria.datosMaterias.data.uc}
              onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        uc: event.target.value,
                      },
                    },
                  }))}
                type="text"
                id="uc"
                name="uc"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
           </div>
            <div className="w-[50%]">
            <div className="mb-1">
            <label htmlFor="prelacion" className="block mb-2 text-sm text-gray-600">
                Prelación
            </label>
            <input
                value={modificarMateria.datosMaterias.data.prelacion}
                onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        prelacion: event.target.value,
                      },
                    },
                  }))}  
                type="text"
                id="prelacion"
                name="prelacion"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            </div>
            </div>
            </div>
            <div className="mb-1">
            <label htmlFor="descripcion" className="block mb-2 text-sm text-gray-600">
                Descripción
            </label>
            <textarea
               value={modificarMateria.datosMaterias.data.descripcion}
               onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        descripcion: event.target.value,
                      },
                    },
                  }))}  
                type="text"
                id="descripcion"
                name="descripcion"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:border-cyan-500"
            />
            </div>
            <div className="mb-1 flex gap-4">
            <div className='w-[50%]'>
            <label htmlFor="profesorSeccion1" className="block  text-sm text-gray-600">
                Profesor de la sección 1
            <input
                ref={profesorSec1Ref}
                type="text"
                id="profesorSeccion1"
                name="profesorSeccion1"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
               value={modificarMateria.datosMaterias.data.profesores.profesorSeccion1}
               onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        profesores:{
                          ...prevState.datosMaterias.data.profesores,
                          profesorSeccion1: event.target.value
                        }
                      },
                    },
                  }))} 
            />
            </label>
            </div>
           <div className='w-[50%]'>
           <label htmlFor="profesorSeccion2" className="block  text-sm text-gray-600">
                Profesor de la sección 2
            <input
                disabled={!sec2Enabled}
                ref={profesorSec2Ref}
                type="text"
                id="profesorSeccion2"
                name="profesorSeccion2"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
               value={modificarMateria.datosMaterias.data.profesores.profesorSeccion2}
             onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        profesores:{
                          ...prevState.datosMaterias.data.profesores,
                          profesorSeccion2: event.target.value
                        }
                      },
                    },
                  }))} 
            />
             <label  className="text-xs hover:text-cyan-700 text-gray-600">
                  Habilitar sección 2
                <input
                className='ml-2 mt-2'
                  type="checkbox"
                  id="seccion2"
                  name="seccion2"
                  checked={sec2Enabled}
                  onChange={handleCheckChangeSec2}
                />
                </label>
            </label>
           </div>
            </div>
            <div className="mb-1 flex gap-4">
            <div className='w-[50%]'>
            <label htmlFor="profesorSeccion3" className="block  text-sm text-gray-600">
                Profesor de la sección 3
            <input
                disabled={!sec3Enabled}
                ref={profesorSec3Ref}
                type="text"
                id="profesorSeccion3"
                name="profesorSeccion3"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={modificarMateria.datosMaterias.data.profesores.profesorSeccion3}
               onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        profesores:{
                          ...prevState.datosMaterias.data.profesores,
                          profesorSeccion3: event.target.value
                        }
                      },
                    },
                  }))} 
            />
             <label  className="text-xs hover:text-cyan-700 text-gray-600">
                  Habilitar sección 3
                <input
                className='ml-2 mt-2'
                  type="checkbox"
                  id="seccion3"
                  name="seccion3"
                  checked={sec3Enabled}
                  onChange={handleCheckChangeSec3}
                />
                </label>
            </label>
            </div>
           <div className='w-[50%]'>
           <label htmlFor="profesorSeccion4" className="block  text-sm text-gray-600">
                Profesor de la sección 4
            <input
                disabled={!sec4Enabled}
                ref={profesorSec4Ref}
                type="text"
                id="profesorSeccion4"
                name="profesorSeccion4"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={modificarMateria.datosMaterias.data.profesores.profesorSeccion4}
               onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        profesores:{
                          ...prevState.datosMaterias.data.profesores,
                          profesorSeccion4: event.target.value
                }}}}))} 
            />
             <label  className="text-xs hover:text-cyan-700 text-gray-600">
                  Habilitar sección 4
                <input
                className='ml-2 mt-2'
                  type="checkbox"
                  id="seccion4"
                  name="seccion4"
                  checked={sec4Enabled}
                  onChange={handleCheckChangeSec4}
                />
                </label>
            </label>
           </div>
            </div>
            <div className="mb-1 flex gap-4">
            <div className='w-[50%]'>
            <label htmlFor="idProfesorSeccion1" className="block  text-sm text-gray-600">
                ID del profesor de la sección 1
            <input
                ref={idProfesorSec1Ref}
                type="text"
                id="idProfesorSeccion1"
                name="idProfesorSeccion1"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={modificarMateria.datosMaterias.data.idProfesores.idProfesorSeccion1}
              
                onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        idProfesores:{
                          ...prevState.datosMaterias.data.idProfesores,
                          idProfesorSeccion1: event.target.value
                }}}}))} 
            />
            </label>
            </div>
           <div className='w-[50%]'>
           <label htmlFor="idProfesorSeccion2" className="block  text-sm text-gray-600">
                ID del profesor de la sección 2
            <input
                disabled={!sec2Enabled}
                ref={idProfesorSec2Ref}
                type="text"
                id="idProfesorSeccion2"
                name="idProfesorSeccion2"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={modificarMateria.datosMaterias.data.idProfesores.idProfesorSeccion2}
              
                onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        idProfesores:{
                          ...prevState.datosMaterias.data.idProfesores,
                          idProfesorSeccion2: event.target.value
                }}}}))} 
            />
            </label>
           </div>
            </div>
            <div className="mb-1 flex gap-4">
            <div className='w-[50%]'>
            <label htmlFor="idProfesorSeccion3" className="block  text-sm text-gray-600">
                ID del profesor de la sección 3
            <input
                disabled={!sec3Enabled}
                ref={idProfesorSec3Ref}
                type="text"
                id="idProfesorSeccion3"
                name="idProfesorSeccion3"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
             value={modificarMateria.datosMaterias.data.idProfesores.idProfesorSeccion3}
               onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        idProfesores:{
                          ...prevState.datosMaterias.data.idProfesores,
                          idProfesorSeccion3: event.target.value
                }}}}))} 
            />
            </label>
            </div>
           <div className='w-[50%]'>
           <label htmlFor="idProfesorSeccion4" className="block  text-sm text-gray-600">
                ID del profesor de la sección 4
            <input
                disabled={!sec4Enabled}
                ref={idProfesorSec4Ref}
                type="text"
                id="idProfesorSeccion4"
                name="idProfesorSeccion4"
                className="class-input text-sm w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={modificarMateria.datosMaterias.data.idProfesores.idProfesorSeccion4}
                
                onChange={(event) => setModificarMateria(prevState => ({
                    ...prevState,
                    datosMaterias: {
                      ...prevState.datosMaterias,
                      data: {
                        ...prevState.datosMaterias.data,
                        idProfesores:{
                          ...prevState.datosMaterias.data.idProfesores,
                          idProfesorSeccion4: event.target.value
                }}}}))} 
            />
            </label>
           </div>
            </div>
            <button
            type="button"
            onClick={confirmarModificar}
            className=" w-32 bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mb-2 mt-3"
            >
            Modificar
            </button>
        </form>
        </div>
        </div>
    </div>
  )
}

export default ModificarMateria