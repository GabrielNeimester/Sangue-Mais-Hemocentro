import { useMutation, useQueryClient } from "react-query"
import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { Questao } from "../../../interfaces/questao"




const createQuestao = (questao: Questao) => {
  return api.post<Questao>("/questao", questao, {
    headers: {
      Authorization: getToken()
    }
  });
}

export const useCreateQuestao = () => {
  const queryClient = useQueryClient()

  return useMutation("createQuestao", (questao: Questao) => createQuestao(questao), {
    onSuccess: () => {
      queryClient.invalidateQueries('questao')
    }
  })
}

