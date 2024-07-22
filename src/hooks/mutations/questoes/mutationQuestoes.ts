import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { useMutation, useQueryClient } from 'react-query'


interface NovaQuestao {
    descricao: string
}

interface EditarQuestao{
  id:string
  descricao: string
}

const salvarQuestao = (questao:NovaQuestao) => api.post("/questoes/", questao,{
    headers: {
        Authorization: getToken()
      }
      
})

export const useSalvarQuestao = () => {
  const queryClient = useQueryClient()

  return useMutation((questao:NovaQuestao) => salvarQuestao(questao),
    {
        onSuccess: () => {
            queryClient.invalidateQueries('data')
        }
    })
}

const deleteQuestao = async (id: string) => api.delete(`/questoes/${id}`, {
        headers: {
            Authorization: getToken()
        }
    })


export const useDeleteQuestao = () => {
    const queryClient = useQueryClient()
  
    return useMutation((id: string) => deleteQuestao(id), {
      onSuccess: () => {
        queryClient.invalidateQueries('data')
      }
    })
  }


const updateQuestao = (questao:EditarQuestao) => api.put(`/questoes/${questao.id}`, {descricao: questao.descricao}, {
  headers: {
      Authorization: getToken()
  }
})


export const useUpdateQuestao = () => {
  const queryClient = useQueryClient()

  return useMutation((questao:EditarQuestao) => updateQuestao(questao),
    {
        onSuccess: () => {
            queryClient.invalidateQueries('questoes')
        }
    })
}
