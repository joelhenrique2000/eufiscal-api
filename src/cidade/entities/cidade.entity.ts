import { Decimal } from "@prisma/client/runtime"
import { Estado } from "src/estado/entities/estado.entity"

export class Cidade {
    id: number
    nome: string
    estado?: Estado
    latitude: Decimal 
    longitude: Decimal 
}
