import React from 'react'
import Layout from '../../components/Layout'
import { Box, Button, Card, CardBody, CardHeader, Heading, Skeleton, Stack, StackDivider } from '@chakra-ui/react'
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
            case 'concluído':
                return styles.statusConcluido;
            case 'bloqueado':
            case 'cancelado':
                return styles.statusBloqueado; // Usamos a mesma classe para bloqueado e cancelado
            default:
                return '';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'liberado':
            case 'concluído':
                return <MdCheckCircle className={styles.statusIcon} />;
            case 'bloqueado':
            case 'cancelado':
                return <MdCancel className={styles.statusIcon} />;
            default:
                return <MdError className={styles.statusIcon} />;
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

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
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
                                            <p>{agendamento.impedimento} ({agendamento.diasImpedidos} dia(s))</p>
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
                                            <Button>Concluir</Button>
                                            <Button>Cancelar</Button>
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