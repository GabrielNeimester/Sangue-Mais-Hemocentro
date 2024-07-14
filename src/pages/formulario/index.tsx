import React from 'react'
import Layout from '../../components/Layout'
import { useQuestoes } from '../../hooks/queries/questoes/useQuestao';
import { Questao } from '../../interfaces/questao';
import { useOpcao } from '../../hooks/queries/opcoes/useOpcoes';
import { Opcao } from '../../interfaces/opcao';
import styles from '../formulario/Formulario.module.css'
import { Heading, IconButton, Radio, RadioGroup, Skeleton, Stack } from '@chakra-ui/react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import Erro from '../../components/Erro';

export default function Formulario() {

    const { questao, isLoading, isError } = useQuestoes()

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
                                        <IconButton icon={<MdDeleteOutline size={'24px'} />} className={styles.icon_button} aria-label='Deletar' />
                                        <IconButton icon={<MdOutlineEdit size={'24px'} />} className={styles.icon_button} aria-label='Editar' />
                                    </div>
                                </div>

                                <Opcoes questaoId={questao._id} /> {/* Renderiza o componente Opcoes passando questaoId */}
                            </div>
                        ))}
                    </div>

                )}
            </div>
        </Layout>
    )
}

const Opcoes = ({ questaoId }: { questaoId: string }) => {
    const { opcao, isLoading } = useOpcao(questaoId);

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
                                        <IconButton icon={<MdDeleteOutline size={'24px'} />} className={styles.icon_button} aria-label='Deletar' />
                                    </div>
                                </Radio>
                            </div>
                        ))}
                    </Stack>
                </RadioGroup>
            )}
        </div>
    );
};