import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useQuestoes } from '../../hooks/queries/questoes/useQuestao'
import { Questao } from '../../interfaces/questao'
import { useOpcao } from '../../hooks/queries/opcoes/useOpcoes'
import { Opcao } from '../../interfaces/opcao'
import styles from '../formulario/Formulario.module.css'
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Skeleton, Stack, useDisclosure } from '@chakra-ui/react'
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import Erro from '../../components/Erro'
import { useDeleteOpcao, useSalvarOpcao } from '../../hooks/mutations/opcoes/mutationOpcoes'
import { useDeleteQuestao, useSalvarQuestao, useUpdateQuestao } from '../../hooks/mutations/questoes/mutationQuestoes'

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

    const mutate = useUpdateQuestao()
    const mutateDeleteQuestao = useDeleteQuestao()
    const mutateSalvar = useSalvarQuestao()

    const handleSave = async () => {
        if (!adicionarQuestao) {
            setError('Por favor informe uma descricao');
            return
        }
        try {
            mutateSalvar.mutateAsync({ descricao: adicionarQuestao })
            handleSaveModalClose()
            setMensagemSucesso("A nova questao foi salva com sucesso.")
            setShowSuccessModal(true)

        } catch (error) {
            handleSaveModalClose()
            setMensagemErro("Ocorreu um erro ao tentar salvar a questão. Por favor, tente novamente mais tarde.")
            setShowErrorModal(true)
        }
    }

    const handleUpdate = async () => {
        if (!editarQuestao) {
            setError('Por favor informe uma descricao');
            return
        }
        try {
            mutate.mutateAsync({ id: idQuestao, descricao: editarQuestao })
            onClose()
            setMensagemSucesso("Alteração salva com sucesso")
            setShowSuccessModal(true)

        } catch (error) {
            onClose()
            setMensagemErro("Ocorreu um erro ao salvar alteração. Por favor, tente novamente mais tarde.")
            setShowErrorModal(true)
        }
    }

    const handleDeleteQuestao = async (id: string) => {
        try {
            await mutateDeleteQuestao.mutateAsync(id)
            setMensagemSucesso("A questão foi deletada com sucesso")
            setShowSuccessModal(true)
            refetchQuestoes()

        } catch (error) {
            setMensagemErro("Ocorreu um erro ao deletar a questão. Por favor, tente novamente mais tarde.")
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
    const handleOpen = (descricao: string, id:string) => {
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
                                        <IconButton icon={<MdDeleteOutline size={'24px'} />} className={styles.icon_button} aria-label='Deletar' onClick={() => { handleDeleteQuestao(questao._id) }}/>
                                        <IconButton icon={<MdOutlineEdit size={'24px'} />} className={styles.icon_button} aria-label='Editar' onClick={() => handleOpen(questao.descricao, questao._id)} />
                                    </div>
                                </div>
                                <Opcoes questaoId={questao._id} refetchQuestoes={refetchQuestoes} />
                            </div>
                        ))}
                    </div>

                )}
                    <Button onClick={handleSaveModalOpen}>Adicionar questão</Button>
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

interface OpcoesProps {
    questaoId: string
    refetchQuestoes: () => void
}

export const Opcoes: React.FC<OpcoesProps> = ({ questaoId, refetchQuestoes }) => {
    const { opcao, isLoading, refetch } = useOpcao(questaoId)

    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')
    const mutateDeleteOpcao = useDeleteOpcao()

    const [novaDescricao, setNovaDescricao] = useState('')
    const [diasImpedidos, setDiasImpedidos] = useState(0)
    const [questaoIdSelecionada, setQuestaoIdSelecionada] = useState('')

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [error, setError] = useState('')
    const [tipoImpedimento, setTipoImpedimento] = useState('')

    const mutate = useSalvarOpcao()

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
        try {
            await mutateDeleteOpcao.mutateAsync(id)
            setMensagemSucesso("A opção foi deletada com sucesso")
            setShowSuccessModal(true)
            refetchQuestoes()

        } catch (error) {
            setMensagemErro("Ocorreu um erro ao deletar a opção. Por favor, tente novamente mais tarde.")
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
                    try {
                        mutate.mutateAsync({
                            descricao: novaDescricao,
                            questaoId: questaoIdSelecionada,
                            impedimento: tipoImpedimento,
                            diasImpedidos: diasImpedidos
                        })
                        handleClose()
                        setMensagemSucesso("A nova opção foi salva com sucesso.")
                        setShowSuccessModal(true)

                    } catch (error) {
                        handleClose()
                        setMensagemErro("Ocorreu um erro ao tentar salvar a opção. Por favor, tente novamente mais tarde.")
                        setShowErrorModal(true)
                    }
                }
                else {
                    console.log(diasImpedidos)
                    setError('Por favor informe uma quantidade de dias válidos')
                    return
                }

            }
            else {
                try {
                    mutate.mutateAsync({
                        descricao: novaDescricao,
                        questaoId: questaoIdSelecionada,
                        impedimento: tipoImpedimento,
                        diasImpedidos: 0
                    })
                    handleClose()
                    setMensagemSucesso("A nova opção foi salva com sucesso.")
                    setShowSuccessModal(true)

                } catch (error) {
                    handleClose()
                    setMensagemErro("Ocorreu um erro ao tentar salvar a opção. Por favor, tente novamente mais tarde.")
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
                                        <IconButton icon={<MdDeleteOutline size={'24px'} />} className={styles.icon_button} aria-label='Deletar' onClick={() => { handleDeleteOpcao(opcao._id) }} />

                                    </div>
                                </Radio>
                            </div>
                        ))}
                    </Stack>
                </RadioGroup>

            )}
            <Button onClick={() => handleAdicionarOpcao(questaoId)}>Adicionar nova Opção</Button>
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