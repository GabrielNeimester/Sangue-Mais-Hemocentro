import SenhaInput from '../../components/inputSenha'
import styles from './Login.module.css'
import { Button, Heading, Input } from "@chakra-ui/react"
import { fazerLogin } from '../../hooks/mutations/mutationAuth'
import { useState } from 'react'




export default function Login() {


    const [inputUsuario, setInputUsuario] = useState('')
    const [inputSenha, setInputSenha] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')

    const handleLogin = async () => {
            const resposta = await fazerLogin(inputUsuario, inputSenha)
            if (resposta === 200) {
                window.location.href = '/home'
            } else {
                setMensagemErro('Credenciais inválidas')
                console.error('Erro ao fazer login')
            }
    }

    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    <img src="src\assets\logoLogin.svg" alt="" />
                    <Heading as='h4' size='md'>Usuário</Heading>
                    <Input background={"#FFFFFF"} placeholder='Digite seu usuário' onChange={(e) => setInputUsuario(e.target.value)}></Input>
                    <Heading as='h4' size='md'>Senha</Heading>
                    <SenhaInput onChange={(e) => setInputSenha(e.target.value)}></SenhaInput>
                    <Button className='botao_primario' onClick={handleLogin}>Login</Button>
                    {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
                </div>
            </div>

        </>
    )
}