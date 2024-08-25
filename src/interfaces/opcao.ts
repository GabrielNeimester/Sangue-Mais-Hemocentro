export interface Opcao {
    _id: string
    descricao: string
    questaoId: string
    impedimento: string
    diasImpedidos: number
}

export interface NovaOpcao {
    descricao: string
    questaoId: string
    impedimento: string
    diasImpedidos: number
}
