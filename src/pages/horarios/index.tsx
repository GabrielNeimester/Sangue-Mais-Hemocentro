import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { FormControl, FormErrorMessage, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import styles from "../horarios/Horarios.module.css"
import Erro from '../../components/Erro'
import { MdOutlineHistory, MdDeleteOutline, MdCancel, MdCheckCircle } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { Hora } from '../../interfaces/hora'
import { deletarHora, salvarHorario, useHora } from '../../hooks/horarioService'

export default function HoraPagina() {
    const { dataId } = useParams<{ dataId: string }>()

    const { hora, isLoading, isError, refetch } = useHora(String(dataId))

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [novaHora, setNovaHora] = useState('')
    const [quantidade, setQuantidade] = useState(0)


    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')
    const [error, setError] = useState('')

    const handleSave = async () => {
        if (!novaHora || !novaHora.trim()) {
            setError('Todos os campos são obrigatórios');
            return
        }

        if (!quantidade || quantidade <= 0 || quantidade > 100) {
            setError('Todos os campos são obrigatórios');
            return
        }

        const result = await salvarHorario({ horario: novaHora, dataId: String(dataId), quantidade: quantidade })

        if (result.sucesso) {
            onClose()
            setMensagemSucesso(result.sucesso)
            setShowSuccessModal(true)
        }
        if (result.erro) {
            onClose()
            setMensagemErro(result.erro)
            setShowErrorModal(true)
        }
    }

    const handleClose = () => {
        setError('')
        onClose()
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false)
        refetch()
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false)
        refetch()
    }

    const handleDeleteHora = async (id: string) => {
        console.log(id)
        const result = await deletarHora(id)

        if (result.sucesso) {
            onClose()
            setMensagemSucesso(result.sucesso)
            setShowSuccessModal(true)
        }
        if (result.erro) {
            onClose()
            setMensagemErro(result.erro)
            setShowErrorModal(true)
        }
    }


    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Horários Cadastrados</Heading>
            <div>
                {isLoading && (
                    <Stack className={styles.skeleton}>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </Stack>
                )}

                {isError && (
                    <Erro></Erro>
                )}
                {!isLoading && !isError && hora && (
                    <div className={styles.card_container}>
                        {hora.map((hora: Hora) => (
                            <div key={hora._id} className={styles.card}>
                                <div className={styles.card_content}>
                                    < MdOutlineHistory color='E31515' size={'48px'} />
                                    <div className={styles.horario}>
                                        <Heading as='h5' size='sm'>Horário</Heading>
                                        <p>{hora.horario}</p>
                                    </div>
                                    <div className={styles.horario}>
                                        <Heading as='h5' size='sm'>Vagas Disponíveis</Heading>
                                        <p>{hora.quantidade}</p>
                                    </div>
                                </div>

                                <button className={styles.icon_button} aria-label='Deletar' onClick={() => { handleDeleteHora(hora._id) }}> <MdDeleteOutline size={'24px'} /></button>

                            </div>
                        ))}
                        <div className={styles.botao_adicionar}>
                            <button onClick={onOpen} className={styles.primary_button}>Adicionar novo Horário</button>
                        </div>
                    </div>
                )}
            </div>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader><h1 className={styles.modal_header_text}>Adicionar um novo Horário</h1></ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody className={styles.modal_body} >
                        <FormControl isInvalid={!!error}>
                            <p className={styles.modal_text_details}>Informe o horário:</p>
                            <Input placeholder='Selecione uma data' size='md' type='time' onChange={(e) => setNovaHora(e.target.value)}
                                required></Input>
                            <p className={styles.modal_text_details}>Informe o número de vagas:</p>
                            <Input placeholder='informe o número de vagas' size='md' onChange={(e) => setQuantidade(Number(e.target.value))}
                                required></Input>
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <div className={styles.modal_footer}>
                            <button className={styles.primary_button} onClick={handleSave}>
                                Salvar
                            </button>
                            <button onClick={handleClose} className={styles.secondary_button}>Cancelar</button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={showSuccessModal} onClose={handleSuccessModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className={styles.modal_header}><h1 className={styles.modal_header_text}>Sucesso!</h1></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className={styles.modal_body}>
                        <MdCheckCircle size={'80px'} color='#4BB543' />
                        {mensagemSucesso}
                    </ModalBody>
                    <ModalFooter>
                        <div className={styles.modal_footer}>
                            <button className={styles.primary_button} onClick={handleSuccessModalClose}>
                                Continuar
                            </button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={showErrorModal} onClose={handleErrorModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader className={styles.modal_header}><h1 className={styles.modal_header_text}>Erro</h1></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className={styles.modal_body}>
                        <MdCancel size={'80px'} color='#E31515' />
                        {mensagemErro}
                    </ModalBody>
                    <ModalFooter>
                        <div className={styles.modal_footer}>
                            <button onClick={handleErrorModalClose} className={styles.primary_button}>
                                Continuar
                            </button>
                        </div>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    )
}
