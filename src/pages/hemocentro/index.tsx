import { Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Stack, useDisclosure } from "@chakra-ui/react"
import Layout from "../../components/Layout"
import { atualizarHemocentro, useHemocentro } from "../../hooks/hemocentroService"
import { MdCancel, MdCheckCircle, MdOutlineEdit } from "react-icons/md"
import styles from "../hemocentro/Hemocentro.module.css"
import React, { useEffect, useState } from "react"
import { Hemocentro } from "../../interfaces/hemocentro"
import Erro from "../../components/Erro"


export default function HemocentroPagina() {

  const { onClose } = useDisclosure()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [mensagemErro, setMensagemErro] = useState('')
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const { hemocentro, isLoading, isError, refetch } = useHemocentro()
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const handleButtonDisabled = () => setButtonDisabled(!buttonDisabled)



  const formatarTelefone = (value: string) => {
    return value
      .replace(/\D/g, '') 
      .replace(/^(\d{2})(\d)/g, '($1) $2') 
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  }
  
  const formatarCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '') 
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2') 
      .replace(/(-\d{2})\d+?$/, '$1')
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarTelefone(e.target.value)
    setEdicaoHemocentro({ ...edicaoHemocentro, telefone: valorFormatado })
  }
  
  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCNPJ(e.target.value)
    setEdicaoHemocentro({ ...edicaoHemocentro, cnpj: valorFormatado })
  }

  const [edicaoHemocentro, setEdicaoHemocentro] = useState<Hemocentro>({
    _id: '',
    cnpj: '',
    nome: '',
    estado: '',
    cidade: '',
    bairro: '',
    telefone: '',
    email: '',
    endereco: '',
    numero: '',
    ativo: false
  })

  useEffect(() => {
    if (hemocentro) {
      setEdicaoHemocentro(hemocentro)
    }
  }, [hemocentro])


  const handleSave = async () => {

    const result = await atualizarHemocentro(edicaoHemocentro)

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
  }

  const handleErrorModalClose = () => {
    setShowErrorModal(false)
    refetch()
  }



  return (
    <Layout>
      <div className={styles.title_container}>
        <Heading as='h3' size='lg'>Dados Cadastrais do Hemocentro</Heading>
        <button className={styles.icon_button} onClick={handleButtonDisabled}><MdOutlineEdit size={'24px'} /></button>
      </div>
      {isLoading && (
        <Stack className={styles.skeleton}>
          <Skeleton />
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
      {hemocentro && (
        <div>
          <div className={styles.container_dados_hemocentro}>
            <Heading as='h5' size='sm'>Nome
              <Input borderColor={'#000000'} required={true} value={edicaoHemocentro.nome} isDisabled={buttonDisabled} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, nome: e.target.value })}></Input>
            </Heading>
            <div className={styles.container_estado}>
            <Heading as='h5' size='sm'>Bairro
              <Input borderColor={'#000000'} isDisabled={buttonDisabled} value={edicaoHemocentro.bairro} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, bairro: e.target.value })}></Input>
            </Heading>
            <Heading as='h5' size='sm'>Número
              <Input borderColor={'#000000'} isDisabled={buttonDisabled} value={edicaoHemocentro.numero} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, numero: e.target.value })}></Input>
            </Heading>
            </div>
            <Heading as='h5' size='sm'>Endereço
              <Input borderColor={'#000000'} isDisabled={buttonDisabled} value={edicaoHemocentro.endereco} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, endereco: e.target.value })}></Input>
            </Heading>

           
            <Heading as='h5' size='sm'>Cidade
              <Input isDisabled={buttonDisabled} borderColor={'#000000'} value={edicaoHemocentro.cidade} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, cidade: e.target.value })}></Input>
            </Heading>
            <Heading as='h5' size='sm'>CNPJ
              <Input isDisabled={buttonDisabled} borderColor={'#000000'} value={edicaoHemocentro.cnpj} onChange={handleCNPJChange}></Input>
            </Heading>
            <Heading as='h5' size='sm'>E-mail
              <Input isDisabled={buttonDisabled} borderColor={'#000000'} value={edicaoHemocentro.email} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, email: e.target.value })}></Input>
            </Heading>
          </div>
          <div className={styles.container_estado}>
            <Heading as='h5' size='sm'>Estado
              <Select value={edicaoHemocentro.estado} borderColor={'#000000'} isDisabled={buttonDisabled} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, estado: e.target.value })}>
                <option value='AC'>AC</option>
                <option value='AL'>AL</option>
                <option value='AP'>AP</option>
                <option value="AM">AM</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="DF">DF</option>
                <option value="ES">ES</option>
                <option value="GO">GO</option>
                <option value="MA">MA</option>
                <option value="MT">MT</option>
                <option value="MS">MS</option>
                <option value="MG">MG</option>
                <option value="PA">PA</option>
                <option value="PB">PB</option>
                <option value="PR">PR</option>
                <option value="PE">PE</option>
                <option value="PI">PI</option>
                <option value="RJ">RJ</option>
                <option value="RN">RN</option>
                <option value="RS">RS</option>
                <option value="RO">RO</option>
                <option value="RR">RR</option>
                <option value="SC">SC</option>
                <option value="SP">SP</option>
                <option value="SE">SE</option>
                <option value="TO">TO</option>
              </Select>
            </Heading>
            <Heading as='h5' size='sm'>Telefone
              <Input isDisabled={buttonDisabled} borderColor={'#000000'} value={edicaoHemocentro.telefone} onChange={handleTelefoneChange}></Input>
            </Heading>
          </div>
          <div className={styles.botao_adicionar}>
            <button className={styles.primary_button} disabled={buttonDisabled} onClick={handleSave}>Salvar Alterações</button>
          </div>
        </div>
      )}

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


