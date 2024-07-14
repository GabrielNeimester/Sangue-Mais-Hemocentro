export interface Agendamento{
    map(arg0: (agendamento: Agendamento) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
    _id: string
    hemocentroId: string
    nomeCompleto: string
    dataNascimento: string
    dataAgendamento: string
    horario: string
    statusDoacao: string
    impedimento: string
    diasImpedidos: number
    email: string
}