
import { Heading } from "@chakra-ui/react"
import { MdOutlineSentimentVeryDissatisfied } from "react-icons/md"
import React from "react"
import styles from "../Erro/Erro.module.css"

export default function Erro() {

    return (
        <div className={styles.container}>
            <Heading as='h3' size='lg' color={"#E31515"}>Ops...</Heading>
            <Heading as='h3' size='lg' color={"#E31515"}>Ocorreu um erro ao carregar a página...</Heading>
            <MdOutlineSentimentVeryDissatisfied size={"128px"} color={"#E31515"} />
        </div>
    )
}
