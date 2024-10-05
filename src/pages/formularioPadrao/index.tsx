import { Heading, Input, Select } from "@chakra-ui/react"
import Layout from "../../components/Layout"
import React from "react"
import styles from "../formularioPadrao/FormularioPadrao.module.css"



export default function FormularioPadrao() {

    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Formulário Padrão</Heading>
            <p className={styles.texto}>Aqui você pode visualizar as questões do formulário padrão para o preenchimento dos doadores</p>
            <div className={styles.container_formulario}>
                <Heading as='h5' size='sm'>CPF
                    <Input borderColor={'#000000'} isDisabled={true} ></Input>
                </Heading>
                <Heading as='h5' size='sm'>Nome Completo
                    <Input borderColor={'#000000'} isDisabled={true} ></Input>
                </Heading>

                <div className={styles.container_select}>
                    <Heading as='h5' size='sm'>Tipo Sanguíneo
                        <Select placeholder="Selecione seu tipo sanguíneo" className={styles.borda_select}>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </Select>
                    </Heading>

                    <Heading as='h5' size='sm'>Data de nascimento
                        <Input borderColor={'#000000'} size='md' type='date' isDisabled={true} />
                    </Heading>
                    <Heading as='h5' size='sm'>Sexo
                        <Select>
                            <option>Masculino</option>
                            <option>Feminino</option>
                        </Select>
                    </Heading>
                </div>
                <Heading as='h5' size='sm'>Telefone
                    <Input borderColor={'#000000'} isDisabled={true} ></Input>
                </Heading>
                <Heading as='h5' size='sm'>E-mail
                    <Input borderColor={'#000000'} isDisabled={true} ></Input>
                </Heading>
            </div>
        </Layout>

    )
}


