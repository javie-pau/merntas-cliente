import React,{Fragment,useContext} from 'react';
import Tarea from './Tarea';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const Listadotarea = () => {

      // Obtener el state de proyecto
      const proyectosContext = useContext(proyectoContext);
      const { proyecto, eliminarProyecto} = proyectosContext;

        // Obtener las tareas del proyectos 
        const tareasContext = useContext(tareaContext);
        const { tareasproyecto} = tareasContext;

      // Si no hay proyectos seleccionado
      if(!proyecto) return <h2>Selecciona un proyecto</h2>

      // Array destructuring para extraer el proyecto actual
      const [proyectoAtual] = proyecto;
 

    // Eliminar un proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoAtual._id)
    }
    
    return ( 
        <Fragment>
            <h2>Proyecto:{proyectoAtual.nombre}</h2>
        <ul className="listado-tareas">
             {tareasproyecto.length === 0
                ? (<li className="tarea"><p>No hay tareas</p></li>)
            : 
            <TransitionGroup>
                {tareasproyecto.map(tarea=>(
                 <CSSTransition
                    key={tarea.id}
                    timeout ={150}
                    className="tarea"
                 >
                  <Tarea
                    tarea={tarea}
                />
                 </CSSTransition>
                 ))}
            </TransitionGroup>
            
        }
        </ul>
        <button
         type="button"
         className="btn btn-eliminar"
         onClick={onClickEliminar}
        >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default Listadotarea;