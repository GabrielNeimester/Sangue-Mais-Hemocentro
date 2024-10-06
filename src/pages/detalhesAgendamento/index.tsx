import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Box, Card, CardBody, CardHeader, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, StackDivider, useDisclosure } from '@chakra-ui/react'
import Erro from '../../components/Erro'
import { useParams } from 'react-router-dom'
import { cancelarAgendamento, finalizarAgendamento, useAgendamentoById } from '../../hooks/agendamentoService'
import styles from './DetalhesAgendamento.module.css'
import { MdCancel, MdError, MdCheckCircle } from "react-icons/md"

export default function DetalhesAgendamento() {
    const { agendamentoId } = useParams<{ agendamentoId: string }>()

    const { agendamento, isLoading, isError, refetch  } = useAgendamentoById(String(agendamentoId))

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'liberado':
                return styles.statusLiberado
            case 'concluida':
                return styles.statusConcluido
            case 'nenhum':
                return styles.status_nenhum
            case 'temporario':
                return styles.status_temporario
            case 'definitivo':
                return styles.status_definitivo
            case 'bloqueado':
            case 'cancelada':
                return styles.statusBloqueado
            default:
                return ''
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'liberado':
            case 'concluida':
                return <MdCheckCircle className={styles.statusIcon} size={'24px'} />
            case 'nenhum':
                return <MdCheckCircle className={styles.statusIcon} size={'24px'} />
            case 'bloqueado':
            case 'cancelada':
                return <MdCancel className={styles.statusIcon} size={'24px'} />
            default:
                return <MdError className={styles.statusIcon} size={'24px'} />
        }
    }


    const formatarData = (data: string) => {
        const [year, month, day] = data.split('T')[0].split('-')
        return `${day}/${month}/${year}`
    }

    const handleFinalizarAgendamento= async (id: string) => {
        const result = await finalizarAgendamento(id)

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

    const handleCancelarAgendamento= async (id: string) => {
        const result = await cancelarAgendamento(id)

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

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false)
        refetch()
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false)
        refetch()
    }

    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Detalhes da doação</Heading>
            <div>
                {isLoading && (
                    <Stack className={styles.skeleton}>
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                    </Stack>
                )}

                {isError && (
                    <Erro />
                )}
                {!isLoading && !isError && agendamento !== null && (
                    <div key={agendamento._id}>
                        <Card className={styles.card}>
                            <CardHeader>
                                <Heading size='md'>AGENDAMENTO ID {agendamento._id}</Heading>
                            </CardHeader>

                            <CardBody >
                                <Stack divider={<StackDivider />} spacing='4' borderBottomColor={'#CACACA'} className={styles.internal_border}>
                                    <Box>
                                        <Heading size='xs'>
                                            Nome Completo
                                        </Heading>
                                        <p>{agendamento.nomeCompleto}</p>
                                    </Box>
                                    <Box display='flex' justifyContent='space-around'>
                                        <Heading size='md'>Data do Agendamento: {formatarData(agendamento.dataAgendamento)}</Heading>
                                        <Heading size='md'>Horário: {agendamento.horario} </Heading>
                                    </Box>
                                    <Box>
                                        <Heading size='xs'>
                                            Data de Nascimento do doador:
                                        </Heading>
                                        <p>{formatarData(agendamento.dataNascimento)}</p>
                                    </Box>
                                    <Box display='flex' justifyContent='space-around'>
                                        <Box>
                                            <Heading size='xs'>Status da Doação:</Heading>
                                            <p className={getStatusClass(agendamento.statusDoacao)}>
                                                {getStatusIcon(agendamento.statusDoacao)} {agendamento.statusDoacao}
                                            </p>
                                        </Box>
                                        <Box>
                                            <Heading size='xs'>Impedimento:</Heading>
                                            <p className={getStatusClass(agendamento.impedimento)}>
                                                {getStatusIcon(agendamento.impedimento)} {agendamento.impedimento}  {agendamento.impedimento === 'temporario' && ` ${agendamento.diasImpedidos} dia(s)`}</p>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Heading size='xs'>
                                            E-mail do Doador:
                                        </Heading>
                                        <p>{agendamento.email}</p>
                                    </Box>
                                    {agendamento.statusDoacao === 'liberado' && (
                                        <Box display='flex' justifyContent='center'>
                                            <button className={styles.primary_button} onClick={() => { handleFinalizarAgendamento(agendamento._id) }}>Confirmar</button>
                                            <button className={styles.secondary_button} onClick={() => { handleCancelarAgendamento(agendamento._id) }}>Cancelar</button>
                                        </Box>
                                    )}
                                </Stack>
                            </CardBody>
                        </Card>

                    </div>

                )}

            </div>
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