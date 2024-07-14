import React from 'react'
import Layout from '../../components/Layout'
import { useData } from '../../hooks/queries/data/useData'
import { Data } from '../../interfaces/data'
import { Heading, IconButton, Skeleton, Stack } from '@chakra-ui/react';
import styles from '../calendario/Calendario.module.css';
import { MdDeleteOutline, MdOutlineEdit, MdCalendarMonth } from "react-icons/md";
import Erro from '../../components/Erro';


export default function Calendario() {


    const { data, isLoading, isError } = useData();


    return (
        <Layout>
            <Heading as='h3' size='lg' className={styles.titulo}>Gerir Calendário</Heading>
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
                {!isLoading && !isError && data && (
                    <div className={styles.card_container}>
                        {data.map((data: Data) => (
                            <div key={data._id} className={styles.card}>
                                <div className={styles.card_content}>
                                    <MdCalendarMonth color='E31515' size={'48px'} />
                                    <div className={styles.agendamento}>
                                        <Heading as='h5' size='sm'>Agendamento</Heading>
                                        <p>{data.data}</p>
                                    </div>
                                </div>
                                <div>

                                    <IconButton icon={<MdDeleteOutline size={'24px'} />} className={styles.icon_button} aria-label='Deletar' />
                                    <IconButton icon={<MdOutlineEdit size={'24px'} />} className={styles.icon_button} aria-label='Editar' />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}
