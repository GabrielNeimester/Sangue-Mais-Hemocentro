
import { useMutation, useQueryClient } from "react-query"
import api from "../../../config/api"
import getToken from "../../../helpers/tokenUtil"
import { Hemocentro } from "../../../interfaces/hemocentro"

const updateHemocentro = (hemocentro: Hemocentro) => api.put<Hemocentro>(`/hemocentro/${hemocentro._id}`, hemocentro, {
    headers: {
        Authorization: getToken()
      }
})

export const useUpdateHemocentro = () => {


  const queryClient = useQueryClient()

  return useMutation((hemocentro: Hemocentro) => updateHemocentro(hemocentro), {
    onSuccess: () => {
      queryClient.invalidateQueries('hemocentro');
    },

  })
}