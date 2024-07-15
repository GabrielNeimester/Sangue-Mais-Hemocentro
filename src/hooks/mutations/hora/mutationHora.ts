import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { useMutation, useQueryClient } from 'react-query'


interface NovaHora {
    horario: string
    dataId: string
}

const salvarHora = (hora:NovaHora) => api.post("/hora/", hora,{
    headers: {
        Authorization: getToken()
      }
      
})

export const useSalvarHora = () => {
  const queryClient = useQueryClient()

  return useMutation((hora:NovaHora) => salvarHora(hora),
    {
        onSuccess: () => {
            queryClient.invalidateQueries('data')
        }
    })
}

const deleteHora = async (id: string) => api.delete(`/hora/${id}`, {
        headers: {
            Authorization: getToken()
        }
    })


export const useDeleteHora = () => {
    const queryClient = useQueryClient()
  
    return useMutation((id: string) => deleteHora(id), {
      onSuccess: () => {
        queryClient.invalidateQueries('data')
      }
    })
  }