import { useEffect, useState } from "react"
import api from "../config/api"
import getToken from "../helpers/tokenUtil"
import axios, { AxiosError } from 'axios'
import { Data, ListarData, SalvarData } from "../interfaces/data"
import { DeleteResult, ErrorResponse, SaveResult } from "../interfaces/responses"


export const salvarData = async (data: SalvarData): Promise<SaveResult> => {
    try {
        const response = await api.post<Data>("/data/", data, {
            headers: {
                Authorization: getToken()
            }
        })

        if (response.status === 200 || response.status === 201) {
            return { sucesso: "Data salva com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao salvar a data." }
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


export function useData() {
    const [data, setData] = useState<ListarData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<boolean>(false)
  
    const fetchData = () => {
        setIsLoading(true)
        setIsError(false)
  
        api.get<ListarData[]>('/data/showByUser', {
            headers: {
                Authorization: getToken()
            }
        })
        .then((response) => {
            setData(response.data)
            setIsLoading(false)
        })
        .catch((error) => {
            setIsLoading(false)
            setIsError(true)
            console.error('Error fetching data:', error)
        })
    }
  
    useEffect(() => {
        fetchData()
    }, [])
  
    const refetch = () => {
        fetchData()
    }
  
    return { data, isLoading, isError, refetch }
  }


  export const deletarData = async (id: string): Promise<DeleteResult> => {
    try {
        const response = await api.delete(`/data/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        });

        if (response.status === 204) {
            return { sucesso: "Data deletada com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao deletar a data." }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorResponse>

            if (axiosError.response) {
                const errorMessage =
                    axiosError.response.data.error ||
                    axiosError.response.data.mensagem ||
                    "Erro desconhecido."

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