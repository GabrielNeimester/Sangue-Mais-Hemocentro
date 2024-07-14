import { useEffect, useState } from "react";
import api from "../../../config/api";
import { Hemocentro } from "../../../interfaces/hemocentro";
import getToken from "../../../helpers/tokenUtil";


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
