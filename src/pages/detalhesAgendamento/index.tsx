import React from 'react'
import Layout from '../../components/Layout'
import { Box, Button, Card, CardBody, CardHeader, Heading, Skeleton, Stack, StackDivider, border } from '@chakra-ui/react'
import Erro from '../../components/Erro'
import { useParams } from 'react-router-dom'
import { useAgendamentoById } from '../../hooks/queries/agendamento/useAgendamento'
import styles from './DetalhesAgendamento.module.css'
import { MdCancel, MdError, MdCheckCircle} from "react-icons/md"

export default function DetalhesAgendamento() {
    const { agendamentoId } = useParams<{ agendamentoId: string }>()

    const { agendamento, isLoading, isError } = useAgendamentoById(String(agendamentoId))

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'liberado':
                return styles.statusLiberado;
            case 'concluida':
            case 'nenhum':
                return styles.statusConcluido;
            case 'bloqueado':
            case 'cancelada':
                return styles.statusBloqueado;
            default:
                return '';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'liberado':
            case 'concluida':
                return <MdCheckCircle className={styles.statusIcon} size={'24px'}/>;
            case 'nenhum':
                return <MdCheckCircle className={styles.statusIcon} size={'24px'} />;
            case 'bloqueado':
            case 'cancelada':
                return <MdCancel className={styles.statusIcon} size={'24px'} />;
            default:
                return <MdError className={styles.statusIcon} size={'24px'}/>;
        }
    };

    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Detalhes da doação</Heading>
            <div>
                {isLoading && (
                    <Stack className={styles.skeleton}>
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                    </Stack>
                )}

                {isError && (
                    <Erro />
                )}
                {!isLoading && !isError && agendamento !== null && (
                    <div key={agendamento._id}>
                        <Card className={styles.card}>
                            <CardHeader>
                                <Heading size='md'>AGENDAMENTO ID {agendamento._id}</Heading>
                            </CardHeader>

                            <CardBody >
                                <Stack divider={<StackDivider />} spacing='4' borderBottomColor={'#CACACA'} className={styles.internal_border}>
                                    <Box>
                                        <Heading size='xs'>
                                            Nome Completo
                                        </Heading>
                                        <p>{agendamento.nomeCompleto}</p>
                                    </Box>
                                    <Box display='flex' justifyContent='space-around'>
                                        <Heading size='md'>Data do Agendamento: {agendamento.dataAgendamento}</Heading>
                                        <Heading size='md'>Horário: {agendamento.horario} </Heading>
                                    </Box>
                                    <Box>
                                        <Heading size='xs'>
                                            Data de Nascimento do doador:
                                        </Heading>
                                        <p>{agendamento.dataNascimento}</p>
                                    </Box>
                                    <Box display='flex' justifyContent='space-around'>
                                        <Box>
                                            <Heading size='xs'>Status da Doação:</Heading>
                                            <p className={getStatusClass(agendamento.statusDoacao)}>
                                                {getStatusIcon(agendamento.statusDoacao)} {agendamento.statusDoacao}
                                            </p>
                                        </Box>
                                        <Box>
                                            <Heading size='xs'>Impedimento:</Heading>
                                            <p className={getStatusClass(agendamento.impedimento)}>
                                            {getStatusIcon(agendamento.impedimento)} {agendamento.impedimento} ({agendamento.diasImpedidos} dia(s))</p>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Heading size='xs'>
                                            E-mail do Doador:
                                        </Heading>
                                        <p>{agendamento.email}</p>
                                    </Box>
                                    {agendamento.statusDoacao === 'liberado' && (
                                        <Box  display='flex' justifyContent='center'>
                                            <button className={styles.primary_button}>Confirmar</button>
                                            <button className={styles.secondary_button}>Cancelar</button>
                                        </Box>
                                    )}
                                </Stack>
                            </CardBody>
                        </Card>

                    </div>

                )}

            </div>

        </Layout>
    )
}