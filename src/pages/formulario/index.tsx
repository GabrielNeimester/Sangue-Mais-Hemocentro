import { Heading } from "@chakra-ui/react"
import Layout from "../../components/Layout"
import React from "react"
import styles from "../formulario/Formulario.module.css"
import { MdDocumentScanner, MdEditDocument } from 'react-icons/md'
import { Link } from 'react-router-dom'


export default function Formulario() {




    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Formulários Hemocentro</Heading>
            <p className={styles.texto}>Nesta página você encontra o Formulário Padrão, que não pode ser alterado, e o Formulário Personalizado, que pode ser editado e ajustado de acordo com as preferências do hemocentro.</p>
            <Link to={`/formulario/padrao`}>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <MdDocumentScanner color='E31515' size={'48px'} className={styles.margem_icone} />
                    <div >
                        <div>
                            <div className={styles.card_header}>
                                <p className={styles.card_titulo}><strong>Formulário Básico de Doação</strong>  </p>
                            </div>
                            <div className={styles.card_text}>
                                <p>Este formulário reúne as perguntas básicas para iniciar o processo de doação.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
            <Link to={`/formulario/personalizado`}>
                <div className={styles.card_container}>
                    <div className={styles.card}>
                        <MdEditDocument color='E31515' size={'48px'} className={styles.margem_icone} />
                        <div >
                            <div>
                                <div className={styles.card_header}>
                                    <p className={styles.card_titulo}><strong>Formulário Personalizado</strong>  </p>
                                </div>
                                <div className={styles.card_text}>
                                    <p>Este formulário inclui as perguntas definidas pelo hemocentro, permitindo que você edite ou exclua questões conforme necessário.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Link>


        </Layout>

    )
}
