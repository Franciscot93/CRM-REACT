import { Form, useNavigate,redirect } from "react-router-dom"
import { eliminarCliente } from "../data/clientes"

export async function action({params}){
 
 await eliminarCliente(params.clienteId)
  return redirect('/')
}

function Cliente({cliente}) {
  const navigate=useNavigate()
  return (
    <tr className="border-b">
                  <td className=" p-6 text-center space-y-2">
                    <p className="text-2xl text-gray-800">{cliente.nombre}</p>
                    <p>{cliente.empresa}</p>
                  </td>

                  <td className="p-6 text-center">
                    <p className=" text-gray-800"><span className=" text-gray-800 uppercase font-bold">email: </span>{cliente.email}</p>
                    <p className=" text-gray-800"><span className=" text-gray-800 uppercase font-bold">telefono: </span>{cliente.telefono}</p>
                  </td>
                  <td className="p-6 text-center flex gap-3 justify-center ">
                    <button onClick={()=>navigate(`/clientes/${cliente.id}/editar`)} type="button" className="text-sky-600 hover:text-sky-700 font-bold text-xs uppercase">EDITAR</button>
                    
                    <Form
                    method="post"
                    action={`/clientes/${cliente.id}/eliminar`}
                    onSubmit={(e)=>{if(!confirm('Deseas eliminar los datos de este cliente')){
                      e.preventDefault()
                    }}}
                    >
                    <button type="submit" className="text-red-600 hover:text-red-700 font-bold text-xs uppercase">Eliminar</button>
                    </Form>
                    
                  </td>
                </tr>
  )
}

export default Cliente