import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { useMutation, useQueryClient } from 'react-query'


interface NovaOpcao {
    descricao: string
    questaoId: string
    impedimento: string
    diasImpedidos: number
}

const salvarOpcao = (opcao:NovaOpcao) => api.post("/opcoes/", opcao,{
    headers: {
        Authorization: getToken()
      }
      
})

export const useSalvarOpcao = () => {
  const queryClient = useQueryClient()

  return useMutation((opcao:NovaOpcao) => salvarOpcao(opcao),
    {
        onSuccess: () => {
            queryClient.invalidateQueries('data')
        }
    })
}

const deleteOpcao = async (id: string) => api.delete(`/opcoes/${id}`, {
        headers: {
            Authorization: getToken()
        }
    })


export const useDeleteOpcao = () => {
    const queryClient = useQueryClient()
  
    return useMutation((id: string) => deleteOpcao(id), {
      onSuccess: () => {
        queryClient.invalidateQueries('data')
      }
    })
  }