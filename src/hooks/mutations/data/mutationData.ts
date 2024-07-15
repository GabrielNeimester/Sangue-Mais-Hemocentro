import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { useMutation, useQueryClient } from 'react-query'


interface NovaData {
    data: string;
}

const salvarData = (data:NovaData) => api.post("/data/", data,{
    headers: {
        Authorization: getToken()
      }
      
})

export const useSalvarData = () => {
  const queryClient = useQueryClient()

  return useMutation((data:NovaData) => salvarData(data),
    {
        onSuccess: () => {
            queryClient.invalidateQueries('data')
        }
    })
}

const deleteData = async (id: string) => api.delete(`/data/${id}`, {
        headers: {
            Authorization: getToken()
        }
    })


export const useDeleteData = () => {
    const queryClient = useQueryClient()
  
    return useMutation((id: string) => deleteData(id), {
      onSuccess: () => {
        queryClient.invalidateQueries('data')
      }
    })
  }