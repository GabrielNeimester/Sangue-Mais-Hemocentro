import { useEffect, useState } from "react"
import api from "../config/api"
import getToken from "../helpers/tokenUtil"
import axios, { AxiosError } from 'axios'
import { DeleteResult, ErrorResponse, SaveResult } from "../interfaces/responses"
import { NovaOpcao, Opcao } from "../interfaces/opcao"

export const salvarOpcao = async (opcao:NovaOpcao): Promise<SaveResult> => {
    try {
        const response = await api.post("/opcoes/", opcao, {
            headers: {
                Authorization: getToken()
            }
        })

        if (response.status === 200 || response.status === 201) {
            return { sucesso: "Opção salva com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao salvar a opção" }
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


export function useOpcao(questaoId:string) {
    const [opcao, setOpcao] = useState<Opcao[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
  
    const fetchOpcao = () => {
        setIsLoading(true);
        setIsError(false);
  
        api.get<Opcao[]>(`/opcoes/${questaoId}`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((response) => {
            setOpcao(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.error('Error fetching Questões:', error);
        });
    };
  
    useEffect(() => {
        fetchOpcao();
    }, []);
  
    const refetch = () => {
        fetchOpcao();
    };
  
    return { opcao, isLoading, isError, refetch };
  }

  export const deletarOpcao = async (id: string): Promise<DeleteResult> => {
    try {
        const response = await api.delete(`/opcoes/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        });

        if (response.status === 204) {
            return { sucesso: "Opção deletada com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao deletar a questão." }
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
