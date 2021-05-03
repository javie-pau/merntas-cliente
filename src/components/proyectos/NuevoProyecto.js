import React,{Fragment, useContext, useState} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    // Obtener el state del formulario 
    const proyectosContext = useContext(proyectoContext);
    const {formulario,  errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;

    //state para Poryecto
    const [proyecto, guardarProyecto]= useState({
        nombre:''
    })

    // Extraer el proyecto
    const {nombre} = proyecto;

    const onChangeProyecto = e =>{
        guardarProyecto({
            ...proyecto,
           [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario envia un proyecto
    const onSubmitProyecto = e =>{
        e.preventDefault();

        // Validar el proyecto
        if(nombre === ''){
            mostrarError()
            return;
        }

        // Agregar al state 
        agregarProyecto(proyecto)

        // Reiniciar el form
        guardarProyecto({
            nombre:''
        })
    }
    
    // Mostrar el formulario
    const onClickFormulario = () =>{
        mostrarFormulario();
    }

    return ( 
        <Fragment>
           <button 
           type="button"
           className="btn btn-block btn-primario"
           onClick={ onClickFormulario}>
               Nuevo Proyecto
           </button>
        {
          formulario
          ? (
            <form 
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProyecto}
          >
              <input
                 type="text"
                 className="input-text"
                 placeholder="Nombre proyecto"
                 name="nombre"
                 value={nombre}
                 onChange={onChangeProyecto}
              />
              <input
                 type="submit"
                 className=" btn btn-primario btn-block"
                 value="Agregar Proyecto"
              />
          </form>
          )
          : null
        }
        {errorformulario ? 
        <p className="mensaje error"> El nombre del proyecto es obligatorio</p> 
        :null
        }
        </Fragment>
      );
}
 
export default NuevoProyecto;