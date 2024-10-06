import React from 'react'
import Layout from '../../components/Layout'
import { useAgendamento } from '../../hooks/agendamentoService'
import { Agendamento } from '../../interfaces/agendamento'
import { Heading, Skeleton, Stack } from '@chakra-ui/react'
import styles from "../agendamento/Agendamento.module.css"
import Erro from '../../components/Erro'
import { MdOutlineEdit, MdOutlineViewList, MdOutlineVisibility } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Agendamentos() {

    const { agendamento, isLoading, isError } = useAgendamento()

    const formatarData = (data: string) => {
        const [year, month, day] = data.split('T')[0].split('-')
        return `${day}/${month}/${year}`
    }


    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Ver Agendamentos</Heading>
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
                {agendamento && (
                    <div className={styles.card_container}>
                        {agendamento.map((agendamento: Agendamento) => (
                            <div key={agendamento._id} className={styles.card}>
                                <div >
                                    <div className={styles.card_header}>
                                        <MdOutlineViewList size={'56px'} />
                                        <p className={styles.card_titulo}><strong>Agendamento </strong>  </p>
                                    </div>
                                    <p className={styles.card_subtitulo}><strong>Doador: {agendamento.nomeCompleto}</strong> </p>
                                    <p className={styles.text}>Data do Agendamento: {formatarData(agendamento.dataAgendamento)}</p>
                                    <div className={styles.card_text}>
                                        <p>Status da doação:</p>
                                        <p className={` ${agendamento.statusDoacao === 'liberado' ? styles['status-liberado'] : agendamento.statusDoacao === 'concluida' ? styles['status-concluida'] : agendamento.statusDoacao === 'bloqueado' ? styles['status-bloqueado'] : agendamento.statusDoacao === 'cancelada' ? styles['status-cancelada'] : ''}`}>{agendamento.statusDoacao}</p>
                                        <p className={styles.card_text_impedimento}>Impedimento:</p>
                                        <p className={` ${agendamento.impedimento === 'nenhum' ? styles['status-concluida'] : agendamento.impedimento === 'definitivo' ? styles['status-bloqueado'] : agendamento.impedimento === 'temporario' ? styles['status-temporario'] : ''}`}>{agendamento.impedimento}</p>
                                    </div>
                                    <div className={styles.card_text}>
                                    </div>
                                    <p>ID {agendamento._id}</p>
                                </div>
                                <Link to={`/detalheAgendamento/${agendamento._id}`}>
                                    <button className={styles.icon_button} aria-label='Editar' > {agendamento.statusDoacao === 'liberado' ? <MdOutlineEdit size={'24px'} /> : <MdOutlineVisibility size={'24px'} />}</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}
