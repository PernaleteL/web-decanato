import './ContenidoPrincipal.css'
import '@fontsource-variable/onest';
import telematica from '../img/telematica.jpg'
import informatica from '../img/informatica.jpg'
import produccion from '../img/produccion.jpg'
import analisis from '../img/analisis.jpg'
import matematica from '../img/matematica.jpg'
import fisica from '../img/fisica.jpg'
import { Link } from 'react-router-dom';

import GraficoCarreras from './GraficoCarreras';


const ContenidoPrincipal = () => {
  return (
    <>
        <main className="main">
          <div className="contenedor-main">
            <div className="div-cont-1">
              <section className="section sec-1">
                <h2 className="h2-intro">Estudia en nuestro Decanato</h2>
                <p className='p-intro'>Nuestro Decanato es el pilar fundamental de nuestra institución educativa, encargado de guiar y supervisar las carreras universitarias enfocadas en el apasionante mundo de la ciencia y la tecnología. <strong>Nuestro compromiso es impulsar la excelencia académica, la investigación innovadora y el desarrollo profesional de nuestros estudiantes.</strong></p>
                <p className='p-intro'>En el Decanato, contamos con una <a href="#"><strong>oferta académica diversa que abarca 6 carreras universitarias</strong></a> especializadas en áreas clave de la ciencia y la tecnología. Nuestros programas están diseñados para brindar a los estudiantes los conocimientos, habilidades y herramientas necesarias para destacarse en un entorno cada vez más dinámico y competitivo.</p>
                <p className='p-intro'>Además, contamos con una trayectoria de excelencia educativa y un cuerpo docente altamente calificado, estamos dedicados a preparar a nuestros estudiantes para enfrentar los desafíos del mundo actual y contribuir positivamente a la sociedad.</p>
              </section>
            </div>
            <div className="div-cont-2">
              <section className="section sec-2">
                <h2 className="h2-">Estudia en nuestro Decanato</h2>
                <p className='p-sec-2'>Nuestro Decanato es el pilar fundamental de nuestra institución educativa, encargado de guiar y supervisar las carreras universitarias enfocadas en el apasionante mundo de la ciencia y la tecnología. Nuestro compromiso es impulsar la excelencia académica, la investigación innovadora y el desarrollo profesional de nuestros estudiantes.</p>
                <p className='p-sec-2'>En el Decanato, contamos con una oferta académica diversa que abarca 6 carreras universitarias especializadas en áreas clave de la ciencia y la tecnología. Nuestros programas están diseñados para brindar a los estudiantes los conocimientos, habilidades y herramientas necesarias para destacarse en un entorno cada vez más dinámico y competitivo.</p>
                <p className='p-sec-2'>Además, contamos con una trayectoria de excelencia educativa y un cuerpo docente altamente calificado, estamos dedicados a preparar a nuestros estudiantes para enfrentar los desafíos del mundo actual y contribuir positivamente a la sociedad.</p>
              </section>
            </div>
            <div className="div-cont-3">
            <section className='section sec-3'>
              <h2 className='h2-carreras'>Carreras universitarias</h2>
              <div className=" relative px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
                <div className="relative mx-auto max-w-7xl">
                  <div className="grid max-w-lg gap-5 mx-auto lg:grid-cols-3 lg:max-w-none">
                    <Link to="/telematica" >
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg 
                    transform transition duration-300 hover:scale-105">
                      <div className="flex-shrink-0">
                        <img src={telematica} alt="" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                        <div className="flex-1">
                          <a href="#" className="block mt-2">
                            <p className="text-xl font-semibold text-neutral-600">Ingeniería Telemática</p>
                            <p className="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.</p>
                          </a>
                        </div>
                        
                      </div>
                    </div>
                    </Link>
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <div className="flex-shrink-0">
                        <img src={informatica} alt="" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                        <div className="flex-1">
                          <a href="#" className="block mt-2">
                            <p className="text-xl font-semibold text-neutral-600">Ingeniería Informática</p>
                            <p className="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.</p>
                          </a>
                        </div>
                      
                      </div>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <div className="flex-shrink-0">
                        <img src={produccion} alt="" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                        <div className="flex-1">
                          <a href="#" className="block mt-2">
                            <p className="text-xl font-semibold text-neutral-600">Ingeniería de Producción</p>
                            <p className="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <div className="flex-shrink-0">
                        <img src={matematica} alt="" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                        <div className="flex-1">
                          <a href="#" className="block mt-2">
                            <p className="text-xl font-semibold text-neutral-600">Licenciatura en Matemáticas</p>
                            <p className="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <div className="flex-shrink-0">
                        <img src={fisica} alt="" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                        <div className="flex-1">
                          <a href="#" className="block mt-2">
                            <p className="text-xl font-semibold text-neutral-600">Licenciatura en Físicas</p>
                            <p className="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.</p>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                      <div className="flex-shrink-0">
                        <img src={analisis} alt="" />
                      </div>
                      <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                        <div className="flex-1">
                          <a href="#" className="block mt-2">
                            <p className="text-xl font-semibold text-neutral-600">Análisis de Sistemas</p>
                            <p className="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            </div>
            <div className="div-cont-4">
              <section className='section sec-4'>
                    <GraficoCarreras />
                <div className="contenedor-4">
                  <div className="graficas">
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
    </>
  )
}

export default ContenidoPrincipal