import { useMutation, useQueryClient } from "react-query"
import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { Opcao } from "../../../interfaces/opcao"

const createOpcao = (opcoes: Opcao) => {
  return api.post<Opcao>("/questao", opcoes, {
    headers: {
      Authorization: getToken()
    }
  });
}

export const useCreateOpcao = () => {
  const queryClient = useQueryClient()

  return useMutation("createOpcao", (opcao: Opcao) => createOpcao(opcao), {
    onSuccess: () => {
      queryClient.invalidateQueries('opcao')
    }
  })
}

