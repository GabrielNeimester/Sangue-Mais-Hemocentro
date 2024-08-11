import React, { useState } from 'react'
import Layout from '../../components/Layout'
import {ListarData } from '../../interfaces/data'
import { FormControl, FormErrorMessage, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styles from '../calendario/Calendario.module.css'
import { MdDeleteOutline, MdOutlineEdit, MdCalendarMonth, MdCheckCircle, MdCancel } from "react-icons/md"
import Erro from '../../components/Erro'
import { deletarData, salvarData, useData } from '../../hooks/dataService';

export default function Calendario() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const { data, isLoading, isError, refetch } = useData()
    const [novaData, setNovaData] = useState('')
    const [error, setError] = useState('')

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    const handleSave = async () => {
        if (!novaData) {
            setError('Por favor informe uma data')
            return
        }

        const result = await salvarData({ data: novaData })

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

    const handleDeleteData = async (id: string) => {
        const result = await deletarData(id)

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

    const dataFormatada = (dateString: string): string => {
        const [year, month, day] = dateString.split('-')
        return `${day}/${month}/${year}`
    }

    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Gerir Calendário</Heading>
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
                {!isLoading && !isError && data && (
                    <div className={styles.card_container}>
                        {data.map((data: ListarData) => (
                            <div key={data._id} className={styles.card}>
                                <div className={styles.card_content}>
                                    <MdCalendarMonth color='E31515' size={'48px'} />
                                    <div className={styles.agendamento}>
                                        <Heading as='h5' size='sm'>Agendamento</Heading>
                                        <p>{dataFormatada(data.data)}</p>
                                    </div>
                                </div>
                                <div>

                                    <button className={styles.icon_button} aria-label='Deletar' onClick={() => { handleDeleteData(data._id) }}> <MdDeleteOutline size={'24px'} /></button>
                                    <Link to={`/calendario/${data._id}`}>
                                        <button className={styles.icon_button} aria-label='Editar' ><MdOutlineEdit size={'24px'} /></button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <div className={styles.botao_adicionar}>
                            <button onClick={onOpen} className={styles.primary_button}>Adicionar nova Data</button>
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
                    <ModalHeader className={styles.modal_header}><h1 className={styles.modal_header_text}>Adicionar nova Data</h1></ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody className={styles.modal_body}>
                        <FormControl isInvalid={!!error}>
                            <p className={styles.modal_text_details}>Escolha uma data:</p>
                            <Input placeholder='Selecione uma data' size='md' type='date' onChange={(e) => setNovaData(e.target.value)}
                                required></Input>
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter >
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
