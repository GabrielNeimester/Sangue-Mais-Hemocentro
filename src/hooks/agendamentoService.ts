import { useEffect, useState } from "react"
import { Agendamento } from "../interfaces/agendamento"
import api from "../config/api"
import getToken from "../helpers/tokenUtil"
import { ErrorResponse, SaveResult } from "../interfaces/responses"
import axios, { AxiosError } from 'axios'



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

export function useAgendamentoById(id: string) {
    const [agendamento, setAgendamento] = useState<Agendamento | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
  

    const fetchAgendamentoById = () => {
      setIsLoading(true)
      setIsError(false)
  
      api
        .get<Agendamento>(`/agendamento/${id}`, {
          headers: {
            Authorization: getToken(), 
          },
        })
        .then((response) => {
          setAgendamento(response.data)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error('Erro ao buscar agendamento:', error)
          setIsLoading(false)
          setIsError(true)
        })
    }
  
    
    useEffect(() => {
      fetchAgendamentoById()
    }, [id])

    const refetch = () => {
      fetchAgendamentoById()
    }
  
    return { agendamento, isLoading, isError, refetch }
  }

  
export const finalizarAgendamento = async (id:string): Promise<SaveResult> => {
    try {
        const response = await api.put(`/agendamento/finish/${id}`, id, {
            headers: {
                Authorization: getToken()
            },
        })

        if (response.status === 200 || response.status === 201) {
            return { sucesso: "Agendamento Finalizado com sucesso" }
        } else {
            return { erro: "Erro desconhecido ao finalizar agendamento." }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>

            if (axiosError.response) {
                const errorMessage = axiosError.response.data.error || axiosError.response.data.mensagem || "Erro desconhecido."

                switch (axiosError.response.status) {
                    case 400:
                        return { erro: `${errorMessage}` }

                    case 401:
                        return { erro: `${errorMessage}` }

                    case 404:
                        return { erro: `${errorMessage}` }

                    case 500:
                        return { erro: `${errorMessage}` }

                    default:
                        return { erro: `${errorMessage}` }
                }
            } else {
                return { erro: "Sem resposta. Por favor tente novamente mais tarde." }
            }
        } else if (error instanceof Error) {
            return { erro: "Erro inesperado. Por favor tente novamente mais tarde." }
        } else {
            return { erro: "Erro desconhecido. Por favor tente novamente mais tarde." }
        }
    }
}


export const cancelarAgendamento = async (id:string): Promise<SaveResult> => {
    try {
        const response = await api.put(`/agendamento/cancel/${id}`, id, {
            headers: {
                Authorization: getToken()
            },
        })

        if (response.status === 200 || response.status === 201) {
            return { sucesso: "Agendamento cancelado com sucesso" }
        } else {
            return { erro: "Erro desconhecido ao cancelar agendamento." }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>

            if (axiosError.response) {
                const errorMessage = axiosError.response.data.error || axiosError.response.data.mensagem || "Erro desconhecido."

                switch (axiosError.response.status) {
                    case 400:
                        return { erro: `${errorMessage}` }

                    case 401:
                        return { erro: `${errorMessage}` }

                    case 404:
                        return { erro: `${errorMessage}` }

                    case 500:
                        return { erro: `${errorMessage}` }

                    default:
                        return { erro: `${errorMessage}` }
                }
            } else {
                return { erro: "Sem resposta. Por favor tente novamente mais tarde." }
            }
        } else if (error instanceof Error) {
            return { erro: "Erro inesperado. Por favor tente novamente mais tarde." }
        } else {
            return { erro: "Erro desconhecido. Por favor tente novamente mais tarde." }
        }
    }
}