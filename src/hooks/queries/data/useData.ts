import { useEffect, useState } from "react"
import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { Data } from "../../../interfaces/data";

export function useData() {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = () => {
      setIsLoading(true);
      setIsError(false);

      api.get<Data[]>('/data/showByUser', {
          headers: {
              Authorization: getToken()
          }
      })
      .then((response) => {
          setData(response.data);
          setIsLoading(false);
      })
      .catch((error) => {
          setIsLoading(false);
          setIsError(true);
          console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
      fetchData();
  }, []);

  const refetch = () => {
      fetchData();
  };

  return { data, isLoading, isError, refetch };
}
  