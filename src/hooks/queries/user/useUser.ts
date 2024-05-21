import { useEffect, useState } from "react";
import api from "../../../config/api";
import { User } from "../../../interfaces/user";
import getToken from "../../../helpers/tokenUtil";

export function useUsers(hemocentroId:string) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(true)

  useEffect(() => {
    
    setIsLoadingUsers(true)
    
    
    api.get<User[]>(`/user/getByHemocentro/${hemocentroId}`, {
        headers: {
            Authorization: getToken()
        }
    }).then((response) => {
      setUsers(response.data)
      console.log(hemocentroId)
      setIsLoadingUsers(false)
    })
  }, [])

  return { users, isLoadingUsers }
}