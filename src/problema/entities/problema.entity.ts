import { Decimal } from "@prisma/client/runtime"
import { Categoria } from "src/categoria/entities/categoria.entity"
import { Cidade } from "src/cidade/entities/cidade.entity"
import { Status } from "src/status/entities/status.entity"

export class Problema {
    id: number 
    titulo: String 
    descricao: String 
    fotoURL: String 
    isResidente: Boolean
    denunciaIrregular: Boolean
    categoria: Categoria
    status: Status
    latitude: Decimal
    longitude: Decimal
    statusHistorico?: StatusHistorico
    cidade: Cidade
}

class StatusHistorico {
    abertura: StatusUnitario
    analise: StatusUnitario
    resolvido: StatusUnitario
}

class StatusUnitario {
    data: Date
    descricao: string
}