import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Button, FormControl, FormErrorMessage, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import styles from "../horarios/Horarios.module.css"
import Erro from '../../components/Erro'
import {  MdOutlineHistory, MdDeleteOutline} from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useHora } from '../../hooks/queries/hora/useHora'
import { Hora } from '../../interfaces/hora'
import { useDeleteHora, useSalvarHora } from '../../hooks/mutations/hora/mutationHora'

export default function HoraPagina() {
    const { dataId } = useParams<{ dataId: string }>()

    const { hora, isLoading, isError, refetch } = useHora(String(dataId))

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    
    const [novaHora, setNovaHora] = useState('')

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')
    const [error, setError] = useState('')


    const mutate = useSalvarHora()

    const mutateDelete = useDeleteHora()

    const handleSave = async () => {
        if (!novaHora || !novaHora.trim()) {
            setError('Por favor informe um horário');
            return
       }
        try {
            await mutate.mutateAsync({     
                horario: novaHora,
                dataId: String(dataId) })
            onClose()
            setMensagemSucesso("Novo horário salvo com sucesso!")
            setShowSuccessModal(true)

        } catch (error) {
            onClose()
            setMensagemErro("Ocorreu um erro ao tentar salvar o novo horário. Por favor, tente novamente mais tarde.")
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
        try {
            await mutateDelete.mutateAsync(id)
            onClose()
            setMensagemSucesso("Data foi deletada com sucesso")
            setShowSuccessModal(true)

        } catch (error) {
            onClose()
            setMensagemErro("Ocorreu um erro ao deletar a data. Por favor, tente novamente mais tarde.")
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
                                </div>
                                <div>

                                    <IconButton icon={<MdDeleteOutline size={'24px'} />} className={styles.icon_button} aria-label='Deletar'  onClick={() => { handleDeleteHora(hora._id) }} />
                                </div>
                            </div>
                        ))}
                        <Button onClick={onOpen} className={styles.botao_adicionar}>Adicionar novo Horário</Button>
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
                    <ModalHeader>Adicionar novo Horário</ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody >
                        <FormControl isInvalid={!!error}>
                            <Input placeholder='Selecione uma data' size='md' type='time' onChange={(e) => setNovaHora(e.target.value)}
                                required></Input>
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button onClick={handleClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={showSuccessModal} onClose={handleSuccessModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sucesso!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       {mensagemSucesso}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSuccessModalClose}>
                            Continuar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={showErrorModal} onClose={handleErrorModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Erro</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       {mensagemErro}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={handleErrorModalClose}>
                            Continuar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    )
}
