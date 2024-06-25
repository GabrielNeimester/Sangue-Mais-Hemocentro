import {createBrowserRouter} from "react-router-dom"
import Login from "../pages/login"
import Home from "../pages/home"
import HemocentroPagina from "../pages/hemocentro"
import Formulario from "../pages/formulario"
import NotFound from "../pages/notFound"


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path:"/home",
    element: <Home/>
  },
  {
    path:"hemocentro/:id",
    element:<HemocentroPagina/>
  },
  {
    path:"/formulario",
    element: <Formulario/>
  },
  {
    path: "*",
    element: <NotFound />
  }
])

export default routes