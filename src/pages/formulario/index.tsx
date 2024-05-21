import { useState } from "react";
import { Button, Heading, Input, Radio, Text, Textarea } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import styles from "../formulario/Formulario.module.css";

export default function Formulario() {
    const [questao, setQuestao] = useState("");
    const [opcoes, setOpcoes] = useState([{ id: 1, descricao: "" }]);

    const adicionarOpcao = () => {
        const novaOpcao = {
            id: opcoes.length + 1,
            descricao: ""
        };
        setOpcoes([...opcoes, novaOpcao]);
    };

    const handleOpcaoChange = (id:number, descricao:string) => {
        const novasOpcoes = opcoes.map(opcao => {
            if (opcao.id === id) {
                return { ...opcao, descricao };
            }
            return opcao;
        });
        setOpcoes(novasOpcoes);
    };

    const handleSalvar = () => {
        // Crie um objeto de questão com as opções
        const questaoObj = {
            descricao: questao,
            // Remova o campo 'id' das opções
        };
        const opcaoObj = {
            opcoes: opcoes.map(opcao => ({ descricao: opcao.descricao }))
            // Remova o campo 'id' das opções
        };
        
        console.log(questaoObj, opcaoObj);
    };
    
    

    return (
        <Layout>
            <div className={styles.text_space}>
                <Heading as='h3' size='lg'>Gerir Formulario</Heading>
            </div>
            <div className={styles.container_questao}>
                <Heading as='h4' size='md'>Adicionar nova questão</Heading>
                <Textarea
                    placeholder="Digite o enunciado da questão"
                    value={questao}
                    onChange={(e) => setQuestao(e.target.value)}
                />
                <div>
                    {opcoes.map(opcao => (
                        <div key={opcao.id} className={styles.container_opcao}>
                            <Radio size='lg' name={opcao.id.toString()} colorScheme='orange' isChecked={false}></Radio>
                            <Input
                                placeholder="Digite a opção"
                                value={opcao.descricao}
                                onChange={(e) => handleOpcaoChange(opcao.id, e.target.value)}
                            />
                        </div>
                    ))}
                    <Button size='sm' onClick={adicionarOpcao}>Nova Opção</Button>
                </div>
                <Button size='lg' onClick={handleSalvar}>Salvar questão</Button>
            </div>
        </Layout>
    );
}
