import { useLoaderData } from "react-router-dom";
import Cliente from "../components/Cliente";
import { obtenerDatosClientes } from "../data/clientes";

export function loader(){
 const clientes= obtenerDatosClientes()

  return clientes
}

function Inicio() {
  const datosDeClientes= useLoaderData()
  
  return (
    <div>
      <h1 className='font-black  text-4xl text-sky-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes</p>
    
      {datosDeClientes.length ? (
        <table className="w-full bg-slate-50 shadow mt-5 table-auto">
          <thead className="bg-sky-800 text-slate-100">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
            </thead>
            <tbody>
              {datosDeClientes.map(cliente=>(
                <Cliente key={cliente.id} cliente={cliente}/>
              ))}
            </tbody>
          
        </table>
      ): <p className="text-center mt-10">No hay clientes</p>}
    </div>
  )
}

export default Inicio