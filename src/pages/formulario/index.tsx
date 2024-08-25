import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Questao } from '../../interfaces/questao'
import { Opcao } from '../../interfaces/opcao'
import styles from '../formulario/Formulario.module.css'
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import { MdCancel, MdCheckCircle, MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import Erro from '../../components/Erro'
import { atualizarQuestao, deletarQuestao, salvarQuestao, useQuestoes } from '../../hooks/questoesService'
import { deletarOpcao, salvarOpcao, useOpcao } from '../../hooks/opcoesService'

export default function Formulario() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const { questao, isLoading, isError, refetch: refetchQuestoes } = useQuestoes()
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')
    const [error, setError] = useState('')
    const [editarQuestao, setEditarQuestao] = useState('')
    const [idQuestao, setIdQuestao] = useState('')
    const [adicionarQuestao, setAdicionarQuestao] = useState('')

    const handleSave = async () => {
        if (!adicionarQuestao) {
            setError('Por favor informe uma descricao');
            return
        }
        const result = await salvarQuestao({ descricao: adicionarQuestao })

        if (result.sucesso) {
            onClose()
            setShowSaveModal(false)
            setMensagemSucesso(result.sucesso)
            setShowSuccessModal(true)
        }
        if (result.erro) {
            onClose()
            setShowSaveModal(false)
            setMensagemErro(result.erro)
            setShowErrorModal(true)
        }
    }

    const handleUpdate = async () => {
        if (!editarQuestao) {
            setError('Por favor informe uma descricao');
            return
        }
        const result = await atualizarQuestao({ _id: idQuestao, descricao: editarQuestao })

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

    const handleDeleteQuestao = async (id: string) => {
        const result = await deletarQuestao(id)

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

    const handleSaveModalOpen = () => {
        setShowSaveModal(true)
    }

    const handleSaveModalClose = () => {
        setShowSaveModal(false)
        refetchQuestoes()
    }

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false)
        refetchQuestoes()
    }

    const handleErrorModalClose = () => {
        setShowErrorModal(false)
        refetchQuestoes()
    }

    const handleClose = () => {
        setError('')
        onClose()
    }
    const handleOpen = (descricao: string, id: string) => {
        setIdQuestao(id)
        setEditarQuestao(descricao)
        onOpen()
    }

    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Gerir Formulário</Heading>
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
                {questao && (
                    <div className={styles.card_container}>
                        {questao.map((questao: Questao) => (
                            <div key={questao._id} className={styles.card}>
                                <div className={styles.card_header}>
                                    <Heading as='h4' size='md'>{questao.descricao}</Heading>
                                    <div>
                                        <button className={styles.icon_button} aria-label='Deletar' onClick={() => { handleDeleteQuestao(questao._id) }}> <MdDeleteOutline size={'24px'} /></button>
                                        <button className={styles.icon_button} aria-label='Editar' onClick={() => handleOpen(questao.descricao, questao._id)}><MdOutlineEdit size={'24px'} /></button>

                                    </div>
                                </div>
                                <Opcoes questaoId={questao._id} refetchQuestoes={refetchQuestoes} />
                            </div>
                        ))}
                    </div>

                )}
                <div className={styles.botao_adicionar}>
                    <button onClick={handleSaveModalOpen} className={styles.primary_button}>Adicionar questão</button >
                </div>

            </div>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={showSaveModal}
                onClose={handleSaveModalClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar Questão</ModalHeader>
                    <ModalCloseButton onClick={handleSaveModalClose} />
                    <ModalBody >
                        <FormControl isInvalid={!!error}>
                            <Input size='md' onChange={(e) => setAdicionarQuestao(e.target.value)}
                                required></Input>
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSave}>
                            Salvar
                        </Button>
                        <Button onClick={handleSaveModalClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Questão</ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody >
                        <FormControl isInvalid={!!error}>
                            <Input size='md' onChange={(e) => setEditarQuestao(e.target.value)}
                                required value={editarQuestao}></Input>
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleUpdate}>
                            Salvar
                        </Button>
                        <Button onClick={handleClose}>Cancelar</Button>
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

interface OpcoesProps {
    questaoId: string
    refetchQuestoes: () => void
}

export const Opcoes: React.FC<OpcoesProps> = ({ questaoId}) => {
    const { opcao, isLoading, refetch } = useOpcao(questaoId)

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    const [novaDescricao, setNovaDescricao] = useState('')
    const [diasImpedidos, setDiasImpedidos] = useState(0)
    const [questaoIdSelecionada, setQuestaoIdSelecionada] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [error, setError] = useState('')
    const [tipoImpedimento, setTipoImpedimento] = useState('')

    const handleAdicionarOpcao = (questaoId: string) => {
        setQuestaoIdSelecionada(questaoId)
        onOpen()
    }

    const handleTipoImpedimentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoImpedimento(event.target.value)
    }

    const handleClose = () => {
        setError('')
        setTipoImpedimento('')
        setDiasImpedidos(0)
        onClose()
    }

    const handleDeleteOpcao = async (id: string) => {

        const result = await deletarOpcao(id)

        if (result.sucesso) {
            setMensagemSucesso(result.sucesso)
            setShowSuccessModal(true)
        }
        if (result.erro) {
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

    const handleSave = async () => {
        if (!novaDescricao) {
            setError('Por favor informe uma descricao');
            return
        }
        if (tipoImpedimento === 'temporario' || tipoImpedimento === 'nenhum' || tipoImpedimento === 'definitivo') {
            if (tipoImpedimento === 'temporario') {
                if (!isNaN(diasImpedidos) && diasImpedidos > 0) {
                    const result = await salvarOpcao({
                        descricao: novaDescricao,
                        questaoId: questaoIdSelecionada,
                        impedimento: tipoImpedimento,
                        diasImpedidos: diasImpedidos
                    })

                    if (result.sucesso) {
                        handleClose()
                        setMensagemSucesso(result.sucesso)
                        setShowSuccessModal(true)
                    }


                    if (result.erro) {
                        handleClose()
                        setMensagemErro(result.erro)
                        setShowErrorModal(true)
                    }


                }
                else {
                    setError('Por favor informe uma quantidade de dias válidos')
                    return
                }

            }
            else {

                    const result = await salvarOpcao({
                        descricao: novaDescricao,
                        questaoId: questaoIdSelecionada,
                        impedimento: tipoImpedimento,
                        diasImpedidos: 0
                    })

                    if (result.sucesso) {
                        handleClose()
                        setMensagemSucesso(result.sucesso)
                        setShowSuccessModal(true)
                    }


                    if (result.erro) {
                        handleClose()
                        setMensagemErro(result.erro)
                        setShowErrorModal(true)
                    }

            }

        }
        else {
            setError('Por favor informe um tipo de impedimento')
            return
        }

    }

    return (
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
            {opcao && (
                <RadioGroup className={styles.radio_group}>
                    <Stack>
                        {opcao.map((opcao: Opcao) => (
                            <div key={opcao._id} className={styles.radio_button}>
                                <Radio value={opcao._id} >
                                    <div className={styles.radio_button_card}>
                                        <div>
                                            <p>{opcao.descricao}</p>
                                            <p><strong>Impedimento:</strong> {opcao.impedimento} <strong>Dias Impedidos:</strong> {opcao.diasImpedidos}</p>
                                        </div>
                                        <button className={styles.icon_button} aria-label='Deletar' onClick={() => { handleDeleteOpcao(opcao._id) }}> <MdDeleteOutline size={'24px'} /></button>

                                    </div>
                                </Radio>
                            </div>
                        ))}
                    </Stack>
                </RadioGroup>

            )}
            <div >
                <button onClick={() => handleAdicionarOpcao(questaoId)} className={styles.primary_button}>Adicionar nova Opção</button>
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
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar nova opção</ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody >
                        <FormControl isInvalid={!!error}>
                            <FormLabel as='legend'>Descrição</FormLabel>
                            <Input placeholder='Digite a descrição' size='md' onChange={(e) => setNovaDescricao(e.target.value)}></Input>
                            <FormLabel as='legend'>Tipo de impedimento</FormLabel>
                            <Select placeholder='Selecione uma opção' onChange={handleTipoImpedimentoChange}>
                                <option value='temporario'>Temporário</option>
                                <option value='definitivo'>Definitivo</option>
                                <option value='nenhum'>Nenhum</option>
                            </Select>
                            {tipoImpedimento === 'temporario' && (
                                <>
                                    <FormLabel as='legend'>Dias impedidos</FormLabel>
                                    <NumberInput size='sm' defaultValue={0} min={0} onChange={(valorString) => {
                                        const valorNumero = parseInt(valorString)
                                        setDiasImpedidos(valorNumero)
                                    }}>
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </>
                            )}
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
        </div>

    );
};