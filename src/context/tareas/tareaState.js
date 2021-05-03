import React,{useReducer} from 'react';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';


import {TAREAS_PROYECTO, 
        AGREGAR_TAREA, 
        VALIDAR_TAREA, 
        ELIMINAR_TAREA,  
        TAREA_ACTUAL, 
        ACTUALIZAR_TAREA, 
        LIMPIAR_TAREA} from '../../types/index';

import clienteAxios from'../../config/axios';

const TareaState = props =>{
    const initialState = {
       tareasproyecto: [],
       errortarea:false,
       tareaSeleccionada: null
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    // Crear las funciones 

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto=>{

        console.log(proyecto);
        try {
            const resultado = await clienteAxios.get('/api/tareas',{params:{proyecto}});
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
                
            })
            
        } catch (error) {
            console.log(error);
            
        }     
    }
    
    // Agragar una tarea al proyecto seleccionado
    const agregarTarea = async tarea =>{
        console.log(tarea);
       try {
        const resultado = await clienteAxios.post('/api/tareas', tarea);
        console.log(resultado);
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea

        })
           
       } catch (error) {
           console.log(error);
           
       }
    }

    // Valida y muestra un error en caso de que sea necesario
    const validaTarea = ()=>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por su id
    const eliminarTarea = async (id, proyecto) =>{
       try {
           await clienteAxios.delete(`/api/tareas/${id}`, {params:{proyecto}});
        dispatch({
            type:ELIMINAR_TAREA,
            payload: id
        })
           
       } catch (error) {
           console.log(error)
           
       }
    }

     // Edita o modifica un tarea 
     const actualizarTarea = async tarea =>{
       try {
           const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
           console.log(resultado);
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tarea
        })
           
       } catch (error) {
           console.log(error);        
       }
    }

    // Extrae una tarea para editar
    const guardarTareaActual = tarea =>{
        dispatch({
            type:TAREA_ACTUAL,
            payload: tarea
        })
    }


    // Limpiar la tarea seleccionaa
    const limpiarTarea = ()=>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <tareaContext.Provider
           value={{
               tareasproyecto: state.tareasproyecto,
               errortarea: state.errortarea,
               tareaSeleccionada: state. tareaSeleccionada,
               obtenerTareas,
               agregarTarea,
               validaTarea,
               eliminarTarea,
               guardarTareaActual,
               actualizarTarea, 
               limpiarTarea
           }}
        
        >
            {props.children}
        </tareaContext.Provider>
    )

}

export default TareaState;