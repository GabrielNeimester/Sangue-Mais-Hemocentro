import { useEffect, useState } from "react"
import api from "../config/api"
import getToken from "../helpers/tokenUtil"
import axios, { AxiosError } from 'axios'
import { DeleteResult, ErrorResponse, SaveResult } from "../interfaces/responses"
import { NovaQuestao, Questao } from "../interfaces/questao"

export const salvarQuestao = async (questao:NovaQuestao): Promise<SaveResult> => {
    try {
        const response = await api.post("/questoes/", questao, {
            headers: {
                Authorization: getToken()
            }
        })

        if (response.status === 200 || response.status === 201) {
            return { sucesso: "Questão salva com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao salvar a questão" }
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


export function useQuestoes() {
    const [questao, setQuestao] = useState<Questao[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
  
    const fetchQuestao = () => {
        setIsLoading(true);
        setIsError(false);
  
        api.get<Questao[]>(`/questoes/showByUser`, {
            headers: {
                Authorization: getToken()
            }
        })
        .then((response) => {
            setQuestao(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.error('Error fetching Questões:', error);
        });
    };
  
    useEffect(() => {
        fetchQuestao();
    }, []);
  
    const refetch = () => {
        fetchQuestao();
    };
  
    return { questao, isLoading, isError, refetch };
  }

  export const deletarQuestao = async (id: string): Promise<DeleteResult> => {
    try {
        const response = await api.delete(`/questoes/${id}`, {
            headers: {
                Authorization: getToken(),
            },
        });

        if (response.status === 204) {
            return { sucesso: "Questão deletada com sucesso!" }
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

export const atualizarQuestao = async (questao : Questao): Promise<SaveResult> => {
    try {
        const response = await api.put<Questao>(`/questoes/${questao._id}`, {descricao: questao.descricao}, {
            headers: {
                Authorization: getToken()
            }
        })

        if (response.status === 200 || response.status === 201) {
            return { sucesso: "Alterações salvas com sucesso!" }
        } else {
            return { erro: "Erro desconhecido ao salvar alterações." }
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