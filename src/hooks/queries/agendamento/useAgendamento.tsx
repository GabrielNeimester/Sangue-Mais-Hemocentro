import { useEffect, useState } from "react"
import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { Agendamento } from "../../../interfaces/agendamento"


export function useAgendamento() {
  const [agendamento, setAgendamento] = useState<Agendamento[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchAgendamento = () => {
      setIsLoading(true)
      setIsError(false)

      api.get<Agendamento[]>('/agendamento/', {
          headers: {
              Authorization: getToken()
          }
      })
      .then((response) => {
          setAgendamento(response.data);
          setIsLoading(false);
      })
      .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.error('Error fetching data:', error);
      })
  }

  useEffect(() => {
      fetchAgendamento()
  }, [])

  const refetch = () => {
      fetchAgendamento()
  }

  return { agendamento, isLoading, isError, refetch };
}

export function useAgendamentoById(id:string) {
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchAgendamentoById = () => {
      setIsLoading(true)
      setIsError(false)

      api.get<Agendamento>(`/agendamento/${id}`, {
          headers: {
              Authorization: getToken()
          }
      })
      .then((response) => {
        console.log('API Response:', response.data);
          setAgendamento(response.data);
          setIsLoading(false);
      })
      .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.error('Error fetching data:', error);
      })
  }

  useEffect(() => {
    fetchAgendamentoById()
  }, [])

  const refetch = () => {
    fetchAgendamentoById()
  }

  return { agendamento, isLoading, isError, refetch };
}
  

