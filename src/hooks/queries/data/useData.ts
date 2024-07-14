import { useEffect, useState } from "react"
import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { Data } from "../../../interfaces/data";




export function useData() {
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
  
    useEffect(() => {
      setIsLoading(true)
      setIsError(false)
  
      api.get<Data>('/data/showByUser', {
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
          console.error('Error fetching hemocentro data:', error)
        })
    }, [])
  
    return { data, isLoading, isError };
  }
  