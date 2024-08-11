export interface SalvarData {
    data: string
}

export interface Data {
    _id: string
    data: string
    hemocentroId: string
    __v: number
}

export interface ListarData{
    map(arg0: (data: Data) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
    _id: string
    data: string
    hemocentroId: string
}