export class Problema {
    id: number 
    titulo: String 
    descricao: String 
    urlFoto: String 
    isResidente: Boolean
    denunciaIrregular: Boolean
    nomeCategoria: string
    categoriaId: number
    lat: number
    lng: number
    cidadeID: number 
    status: StatusProblema
    estadoSigla:string
    cidade:string
}

class StatusProblema {
    abertura: StatusUnitario
    analise: StatusUnitario
    resolvido: StatusUnitario
}

class StatusUnitario {
    data: Date
    descricao: string
}