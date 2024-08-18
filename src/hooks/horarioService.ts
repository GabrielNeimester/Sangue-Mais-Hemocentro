import { useEffect, useState } from "react"
import api from "../config/api"
import getToken from "../helpers/tokenUtil"
import axios, { AxiosError } from 'axios'
import { DeleteResult, ErrorResponse, SaveResult } from "../interfaces/responses"
import { Hora, NovaHora } from "../interfaces/hora"


export const salvarHorario = async (hora:NovaHora): Promise<SaveResult> => {
    try {
        const response = await api.post("/hora/", hora, {
            headers: {
                Authorization: getToken()
            }
        })

        if (response.status === 200 || response.status === 201) {
            return { sucesso: "Horário salvo com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao salvar o novo horário" }
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


export function useHora(dataId:string) {
    const [hora, setHora] = useState<Hora[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
  
    const fetchHora = () => {
        setIsLoading(true);
        setIsError(false);
  
        api.get<Hora[]>(`/hora/${dataId}`)
        .then((response) => {
            setHora(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.error('Error fetching Hora:', error);
        });
    };
  
    useEffect(() => {
        fetchHora();
    }, []);
  
    const refetch = () => {
        fetchHora();
    };
  
    return { hora, isLoading, isError, refetch };
  }

  export const deletarHora = async (id: string): Promise<DeleteResult> => {
    try {
        const response = await api.delete(`/hora/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        });

        if (response.status === 204) {
            return { sucesso: "Horário deletado com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao deletar o horário." }
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