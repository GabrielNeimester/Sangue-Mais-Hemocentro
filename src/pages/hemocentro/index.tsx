import { Button, Card, CardBody, Heading, IconButton, Input, Select, Switch, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useHemocentro } from "../../hooks/queries/hemocentro/useHemocentro";
import { useUsers } from "../../hooks/queries/user/useUser";
import { User } from "../../interfaces/user";
import { MdOutlinePersonAddAlt, MdOutlinePerson, MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import styles from "../hemocentro/Hemocentro.module.css"
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Hemocentro } from "../../interfaces/hemocentro";
import { useUpdateHemocentro } from "../../hooks/mutations/hemocentro/mutationHemocentro";
import ModalCustomizado from "../../components/ModalResultado";
import { MdCheckCircleOutline, MdOutlineCancel } from "react-icons/md"


export default function HemocentroPagina() {

  const { id } = useParams()
  const { hemocentro, isLoading } = useHemocentro(String(id))
  const { users, isLoadingUsers } = useUsers(String(id))
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const handleButtonDisabled = () => setButtonDisabled(!buttonDisabled)
  const [edicaoHemocentro, setEdicaoHemocentro] = useState<Hemocentro>({
    _id: '',
    cnpj: '',
    nome: '',
    estado: '',
    cidade: '',
    bairro: '',
    telefone: '',
    email: '',
    ativo: false
  });
  
  useEffect(() => {
    if (hemocentro) {
      setEdicaoHemocentro(hemocentro)
    }
  }, [hemocentro])



  const mutation = useUpdateHemocentro()

  // Estado para controlar a visibilidade do modal
  const [modalOpen, setModalOpen] = useState(false);
  // Estado para controlar o conteúdo do modal
  const [modalContent, setModalContent] = useState<{ titulo: string, subtitulo: string, texto: string, icone: ReactNode } | null>(null);

  const handleUpdateHemocentro = () => {
    mutation.mutate(edicaoHemocentro, {
      onSuccess: () => {
        setModalContent({
          titulo: "Sucesso",
          subtitulo: "Alterações salvas com sucesso!",
          texto: "As alterações de dados do hemocentro foram salvas com sucesso.",
          icone: <MdCheckCircleOutline size={"80px"} color="#00B712"></MdCheckCircleOutline>
        });
        setModalOpen(true);
      },
      onError: () => {
        setModalContent({
          titulo: "Erro",
          subtitulo: "Não foi possível salvar alterações",
          texto: "Por favor verifique se todos os campos foram preenchidos corretamente e tente novamente",
          icone: <MdOutlineCancel size={"80px"} color="#E31515"></MdOutlineCancel>
        });
        setModalOpen(true);
      }
    })
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }




  return (
    <Layout>
      <ModalCustomizado
        titulo={modalContent?.titulo || ""}
        subtitulo={modalContent?.subtitulo || ""}
        isOpen={modalOpen}
        acaoBotao={handleCloseModal}
        texto={modalContent?.texto || ""}
        onClose={handleCloseModal} icone={modalContent?.icone}      />
      <div className={styles.title_container}>
        <Heading as='h3' size='lg'>Editar Hemocentro</Heading>
        <IconButton aria-label='Search database' icon={<MdOutlineEdit size={'24px'} />} className={styles.icon_button} onClick={handleButtonDisabled} />
      </div>
      {hemocentro && (
        <div>
          <div className={styles.container_dados_hemocentro}>
            <Heading as='h5' size='sm'>Nome
              <Input required={true} value={edicaoHemocentro.nome} isDisabled={buttonDisabled} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, nome: e.target.value })}></Input>
            </Heading>
            <Heading as='h5' size='sm'>Bairro
              <Input isDisabled={buttonDisabled} value={edicaoHemocentro.bairro} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, bairro: e.target.value })}></Input>
            </Heading>
            <Heading as='h5' size='sm'>Cidade
              <Input isDisabled={buttonDisabled} value={edicaoHemocentro.cidade} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, cidade: e.target.value })}></Input>
            </Heading>
            <Heading as='h5' size='sm'>CNPJ
              <Input isDisabled={buttonDisabled} value={edicaoHemocentro.cnpj} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, cnpj: e.target.value })}></Input>
            </Heading>
            <Heading as='h5' size='sm'>E-mail
              <Input isDisabled={buttonDisabled} value={edicaoHemocentro.email} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, email: e.target.value })}></Input>
            </Heading>
          </div>
          <div className={styles.container_estado}>
            <Heading as='h5' size='sm'>Estado
              <Select value={edicaoHemocentro.estado} isDisabled={buttonDisabled} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, estado: e.target.value })}>
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
              <Input isDisabled={buttonDisabled} value={edicaoHemocentro.telefone} onChange={(e) => setEdicaoHemocentro({ ...edicaoHemocentro, telefone: e.target.value })}></Input>
            </Heading>
            <Tooltip hasArrow arrowSize={15} label='bloqueia acesso dos usuários para Hemocentros inativos' backgroundColor={'#F9F9F9'} color={'#000000'}>
            <Heading as='h5' size='sm'>Hemocentro Ativo?
              <Switch isDisabled={buttonDisabled} id='hemocentro_status' isChecked={edicaoHemocentro.ativo} onChange={(e: ChangeEvent<HTMLInputElement>) => setEdicaoHemocentro({ ...edicaoHemocentro, ativo: e.target.checked })}/>
            </Heading>
            </Tooltip>
          </div>

        </div>

      )}
      <Button className={styles.botao} isDisabled={buttonDisabled} onClick={handleUpdateHemocentro}>Salvar Alterações</Button>
      <Heading as='h4' size='md' className={styles.text_space}>Gestão de Usuários</Heading>
      <Text fontSize='md' className={styles.text_space}>Crie ou delete usuários do sistema</Text>
      <div>
        {users.map((users: User) => (
          <Card key={users._id} variant='outline' className={styles.card}>
            <CardBody className={styles.card_body}>
              <div>
                <MdOutlinePerson size={'24px'} className={styles.icon_style} />
              </div>
              <div className={styles.container}>
                <Heading as='h5' size='sm'>{users.nome}</Heading>
              </div>
              <IconButton aria-label='Search database' icon={<MdDeleteOutline size={'24px'} />} className={styles.icon_button} />
            </CardBody>
          </Card>

        ))}

      </div>
      <Button leftIcon={<MdOutlinePersonAddAlt size={"24px"} />} className={styles.botao}>Adicionar novo usuário</Button>

    </Layout>

  )
}


