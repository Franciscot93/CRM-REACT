import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import NuevoCliente,{action as nuevoClienteAction} from './pages/NuevoCliente'
import Inicio,{loader as clientesLoader} from './pages/Inicio'
import ErrorPage from './pages/ErrorPage'
import EditarCliente,{loader as editarClienteLoader, action as editarClienteAction} from './pages/EditarCliente'
import {action as eliminarClienteAction} from './components/Cliente'


const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    
    children:[
      {
        index:true,
        element: <Inicio/>,
        errorElement:<ErrorPage/>,
        loader:clientesLoader
      },
      {
        path:'/clientes/nuevo',
        element:<NuevoCliente/>,
        errorElement:<ErrorPage/>,
        action:nuevoClienteAction
      },
      {
        path:'/clientes/:clienteId/editar',
        element:<EditarCliente/>,
        errorElement:<ErrorPage/>,
        loader:editarClienteLoader,
        action:editarClienteAction
      },
      {
        path:'/clientes/:clienteId/eliminar',
        action:eliminarClienteAction

      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
