import { useEffect, useState } from "react";
import api from "../../../config/api";
import { Hemocentro } from "../../../interfaces/hemocentro";

export function useQuestoes() {
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


export function useHemocentro(id:string) {
  const [hemocentro, setHemocentro] = useState<Hemocentro | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    
    setIsLoading(true)
    
    api.get<Hemocentro>(`/hemocentro/${id}`).then((response) => {
      setHemocentro(response.data)
      
      setIsLoading(false)
    })
  }, [])

  return { hemocentro, isLoading }
}
