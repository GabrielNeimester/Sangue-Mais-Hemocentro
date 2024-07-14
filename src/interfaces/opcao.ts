export interface Opcao {
    map(arg0: (opcao: Opcao) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
    _id: string
    descricao: string
    questaoId: string
    impedimento: string
    diasImpedidos: number
}