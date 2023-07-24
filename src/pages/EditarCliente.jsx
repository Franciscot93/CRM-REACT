import {obtenerDatosCliente, editarCliente} from "../data/clientes"
import Formulario from "../components/Formulario";
import { Form, useNavigate, useLoaderData, useActionData,redirect} from "react-router-dom";
import Error from "../components/Error";

export async function loader({params}){
    const clientePorEditar=await obtenerDatosCliente(params.clienteId)
    console.log(clientePorEditar)

    if(Object.values(clientePorEditar).length===0){
        throw new Response('',{
            status:404,
            statusText:"No hay resultados"
        })
    }
    return clientePorEditar
}

export async function action({request,params}){

    const formData = await request.formData();
  const data = Object.fromEntries(formData);
  
  // validacion
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const email = formData.get("email");
 

  const errores = [];

  if(!regex.test(email)){
    errores.push('El Email no es valido')
  }
  if (Object.values(data).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }
  if (Object.keys(errores).length) {
    return errores;
  }

  //actualizo aqui
  await editarCliente(params.clienteId,data)
  return redirect('/')

}

function EditarCliente() {
    const navigate=useNavigate()
    const cliente=useLoaderData()
    const errores =useActionData()
  return (
    <div>
        <div>
        <h1 className="font-black  text-4xl text-sky-900"> Editar Cliente</h1>
        <p className="mt-3">
          Modifica los datos del cliente
        </p>
      </div>
      <div className="flex mb-5 justify-end">
        <button
          onClick={() => navigate(-1)}
          className="bg-sky-900 px-3 font-bold uppercase py-1 rounded-md text-slate-50 hover:bg-sky-600 duration-200"
        >
          VOLVER
        </button>
      </div>
      <h2 className="font-black  text-3xl text-center text-sky-900">
        Edita los campos
      </h2>
      <div className="bg-slate-200 rounded-md shadow md:w-3/4 mx-auto px-5 py-10 mt-10">
        { errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="put"
        noValidate>
          <Formulario cliente={cliente}/>
          <input
            type="submit"
            className="mt-5 w-full shadow bg-sky-800 uppercase font-bold py-2 hover:bg-sky-700 duration-100 text-slate-50 rounded-sm text-lg"
            value={"Guardar Cliente"}
          />
        </Form>
      </div>
    </div>
  )
}

export default EditarCliente