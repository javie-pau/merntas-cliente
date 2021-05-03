import React,{useContext,useEffect} from 'react';
import Sidebar from '../layout/sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas';
import AuthContext from '../../context/autenticacion/authContext';


const Proyectos = () => {
    
    // Extraer la informació de autenticación 
    const authContext= useContext(AuthContext);
    const { usuarioAutenticado} = authContext;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[])



    return (  
        <div className="contenedor-app">
            <aside>
                <Sidebar/>
                
            </aside>

            <div className="seccion-principal">
                <Barra/>
                <main>
                    <FormTarea/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                        
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Proyectos;