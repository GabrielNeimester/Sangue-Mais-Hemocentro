import {createBrowserRouter} from "react-router-dom"
import Login from "../pages/login"
import Home from "../pages/home"
import HemocentroPagina from "../pages/hemocentro"
import Formulario from "../pages/formulario"
import React from "react"
import Calendario from "../pages/calendario"
import Agendamentos from "../pages/agendamento"
import HoraPagina from "../pages/horarios"
import DetalhesAgendamento from "../pages/detalhesAgendamento"
import FormularioQuestoes from "../pages/formularioQuestoes"
import FormularioPadrao from "../pages/formularioPadrao"



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
    path:"cadastro",
    element:<HemocentroPagina/>
  },
  {
    path:"/formulario",
    element: <Formulario/>
  },
  {
    path:"/calendario",
    element: <Calendario/>
  },
  {
    path:"/agendamentos",
    element: <Agendamentos/>
  },
  {
    path:"/calendario/:dataId",
    element: <HoraPagina/>
  },
  {
    path:"/detalheAgendamento/:agendamentoId",
    element: <DetalhesAgendamento/>
  },
  {
    path:"/formulario/personalizado",
    element: <FormularioQuestoes/>
  },
  {
    path:"/formulario/padrao",
    element: <FormularioPadrao/>
  }
])

export default routes