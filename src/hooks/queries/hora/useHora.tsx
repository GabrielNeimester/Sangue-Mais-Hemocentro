import { useEffect, useState } from "react"
import api from "../../../config/api"
import { Hora } from "../../../interfaces/hora";

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
  
