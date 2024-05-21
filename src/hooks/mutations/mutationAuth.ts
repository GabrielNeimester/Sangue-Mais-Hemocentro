import api from "../../config/api"


export const fazerLogin = async (nome: string, senha: string) => {
        try {
            const response = await api.post('/auth/login', {
                nome,
                senha
            })

            const { token, expiresAt, refreshToken } = response.data;

            console.log(token, expiresAt, refreshToken)
            document.cookie = `token=${encodeURIComponent(token)}`

            return response.status; // Retorna o código de resposta da API
        } catch (error) {
            console.error('Erro ao fazer login:', error)
        }
    }
