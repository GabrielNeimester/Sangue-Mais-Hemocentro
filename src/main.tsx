import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react"// importando o tema do Chakra UI
import {theme} from "./theme"
import { RouterProvider } from "react-router-dom" // importando o provider do React Router

import routes from "./routes" // arquivo que contém as rotas da aplicação

import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)