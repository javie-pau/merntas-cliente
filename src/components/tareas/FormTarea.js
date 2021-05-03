import React,{useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

     // Extraer su un proyecto esta activo
     const proyectosContext = useContext(proyectoContext);
     const { proyecto} = proyectosContext;

    // Obtener el state de proyectos 
    const tareasContext = useContext(tareaContext);
    const {tareaSeleccionada , errortarea ,agregarTarea, validaTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    // Effect que detecta si hay una tarea seleccionda
    useEffect(() =>{
          if(tareaSeleccionada !== null){
              guardarTarea(tareaSeleccionada)
          } else{
              guardarTarea({
                  nombre:''
              })
          }  
    },[tareaSeleccionada])

    // Iniciar el State de fromulario
    const [tarea, guardarTarea] = useState({
        nombre:'',
    })
     
    // Extraer el nombre del proyecto
    const {nombre} = tarea;

     // Si no hay proyectos seleccionado
     if(!proyecto) return null

     // Array destructuring para extraer el proyecto actual
     const [proyectoAtual] = proyecto;

     // Leer lo valores del formulario
     const handleChange = e =>{
         guardarTarea({
             ...tarea,
             [e.target.name]: e.target.value
         })

     }

     const onSubmit = e =>{
         e.preventDefault();

         //Validar
         if(nombre.trim() === ''){
             validaTarea();
             return;
         }

         // Si es edición o si es nueva tarea
         if(tareaSeleccionada === null){

             // Agregar la nueva tarea al state de tareas
             tarea.proyecto = proyectoAtual._id;
             agregarTarea(tarea);

         }else{
             // Actualizar tarea existente
             actualizarTarea(tarea);

             // Elimina tarea seleccionada de state
             limpiarTarea();
         }

         // Obtener y filtrar las tareas del proyecto actual 
         obtenerTareas(proyectoAtual._id);

         // Reiniciar el form
         guardarTarea({
             nombre:''
         })
     }

    return ( 
           <div className="formulario">
               <form
                 onSubmit={onSubmit}
               >
                   <div className="contenedor-input">
                       <input
                          type="text"
                          className="input-text"
                          placeholder="Nombre Tarea..."
                          name="nombre"
                          value={nombre}
                          onChange={handleChange}
                        />
                   </div>
                   <div>
                       <input
                          type="submit"
                          className="btn btn-primario btn-submit btn-block"
                          value={tareaSeleccionada ? 'Editar tarea': 'Agregar tarea'}
                       />
                   </div>
               </form>
               {errortarea ?<p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
           </div>
     );
}
 
export default FormTarea;