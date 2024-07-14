import { useEffect, useState } from "react";
import api from "../../../config/api";
import getToken from "../../../helpers/tokenUtil";
import { Opcao } from "../../../interfaces/opcao";

export function useOpcao(questaoId:string) {
  const [opcao, setOpcao] = useState<Opcao| null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    api.get<Opcao>(`/opcoes/${questaoId}`, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((response) => {
        setOpcao(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
        console.error('Error fetching hemocentro data:', error)
      })
  }, [])

  return { opcao, isLoading, isError };
}