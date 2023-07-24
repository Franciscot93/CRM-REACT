import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 px-5 py-10 bg-sky-900">
        <h2 className="text-4xl font-black text-center text-slate-50">
          CRM-REACT Clientes
        </h2>

        <nav className="mt-10">
          <Link
            className={`${
              location.pathname === "/" ? "text-blue-300" : " text-slate-100 "
            } text-2xl block mt-2 hover:text-sky-400 duration-150`}
            to={`/`}
          >
            Clientes
          </Link>
          <Link
            className={`${
              location.pathname === "/clientes/nuevo"
                ? "text-blue-300"
                : " text-slate-100 "
            } text-2xl block mt-2 hover:text-sky-400 duration-150`}
            to={`/clientes/nuevo`}
          >
            Nuevo cliente
          </Link>
        </nav>
      </aside>

      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
