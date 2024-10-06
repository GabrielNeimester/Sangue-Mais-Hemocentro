import api from "../config/api"


export const fazerLogin = async (nome: string, senha: string) => {
        try {
            const response = await api.post('/auth/login', {
                nome,
                senha
            })

            const { token} = response.data
            
            document.cookie = `token=${encodeURIComponent(token)}`

            return response.status
        } catch (error) {
            console.error('Erro ao fazer login:', error)
        }
    }
