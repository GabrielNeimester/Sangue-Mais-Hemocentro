import { useEffect, useState } from "react"
import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { Agendamento } from "../../../interfaces/agendamento"


export function useAgendamento() {
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    api.get<Agendamento>('/agendamento/', {
        headers: {
          Authorization: getToken()
        }
      })
      .then((response) => {
        setAgendamento(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
        console.error('Error fetching hemocentro data:', error)
      })
  }, [])

  return { agendamento, isLoading, isError };
}
