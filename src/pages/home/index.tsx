import { Heading, Text } from "@chakra-ui/react"
import Layout from "../../components/Layout"
import { MdOutlineAppRegistration, MdOutlineViewList, MdOutlineDescription, MdCalendarMonth } from "react-icons/md";
import styles from "../home/Home.module.css"
import { useHemocentro } from "../../hooks/queries/hemocentro/useHemocentro";


export default function Home() {

  const {hemocentro} = useHemocentro()


  return (
    <Layout>
      <div className={styles.text_container}>
        <Heading as='h3' size='lg'>Bem vindo ao Sangue+</Heading>
        <Text fontSize='md' className={styles.text_space}>Por favor selecione uma opção para começar ao utilizar o sistema</Text>
      </div>
      <div className={styles.card_container}>
        <div>
          <MdOutlineAppRegistration size={'180px'} />
          <Text>Dados Cadastrais</Text>
        </div>
        <div>
          <MdOutlineViewList size={'180px'} />
          <Text>Ver Agendamentos</Text>
        </div>
        <div>
          <MdOutlineDescription size={'180px'} />
          <Text>Gerir Formulário</Text>
        </div>
        <div>
          <MdCalendarMonth size={'180px'} />
          <Text>Gerir Calendário</Text>
        </div>
      </div>


    </Layout>

  )
}