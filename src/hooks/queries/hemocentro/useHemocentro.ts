import { useEffect, useState } from "react";
import api from "../../../config/api";
import { Hemocentro } from "../../../interfaces/hemocentro";
import getToken from "../../../helpers/tokenUtil";

export function useHemocentros() {
  const [hemocentros, setHemocentros] = useState<Hemocentro[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {

    setIsLoading(true)

    api.get<Hemocentro[]>("/hemocentro").then((response) => {
      setHemocentros(response.data)

      setIsLoading(false)
    })
  }, [])

  return { hemocentros, isLoading }
}


export function useHemocentro() {
  const [hemocentro, setHemocentro] = useState<Hemocentro | null>(null)

  useEffect(() => {


    api.get<Hemocentro>('/hemocentro/userShow',
      {
        headers: {
          Authorization: getToken()
        }
      }).then((response) => {
        setHemocentro(response.data)

      })

      console.log(getToken())
  })

  return { hemocentro }
}
