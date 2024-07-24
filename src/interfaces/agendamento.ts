export interface Agendamento{
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