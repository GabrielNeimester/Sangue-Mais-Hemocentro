import { useEffect, useState } from "react";
import api from "../config/api";
import { Hemocentro } from "../interfaces/hemocentro";
import getToken from "../helpers/tokenUtil"
import axios, { AxiosError } from "axios";

interface ErrorResponse {
    error?: string
    mensagem?: string
}

interface SaveResult {
    sucesso?: string
    erro?: string
}

interface DeleteResult {
    sucesso?: string
    erro?: string
}

export const salvarData = async (hemocentro: Hemocentro): Promise<SaveResult> => {
    try {
        const response = await api.put<Hemocentro>(`/hemocentro/${hemocentro._id}`, hemocentro, {
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

export function useHemocentro() {
  const [hemocentro, setHemocentro] = useState<Hemocentro | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    api.get<Hemocentro>('/hemocentro/userShow', {
        headers: {
          Authorization: getToken()
        }
      })
      .then((response) => {
        setHemocentro(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
        console.error('Error fetching hemocentro data:', error)
      })
  }, [])

  return { hemocentro, isLoading, isError };
}