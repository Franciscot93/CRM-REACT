import { Form, useNavigate, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({ request }) {
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
  await agregarCliente(data)
  return redirect('/')
}

function NuevoCliente() {
  const errores = useActionData();

  console.log(errores);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1 className="font-black  text-4xl text-sky-900">Clientes</h1>
        <p className="mt-3">
          Completa los campos para registrar un nuevo cliente
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
        Formulario de registro para nuevos clientes
      </h2>
      <div className="bg-slate-200 rounded-md shadow md:w-3/4 mx-auto px-5 py-10 mt-10">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post"
        noValidate>
          <Formulario />
          <input
            type="submit"
            className="mt-5 w-full shadow bg-sky-800 uppercase font-bold py-2 hover:bg-sky-700 duration-100 text-slate-50 rounded-sm text-lg"
            value={"registrar cliente"}
          />
        </Form>
      </div>
    </>
  );
}

export default NuevoCliente;
