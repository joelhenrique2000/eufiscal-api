import { PrismaClient } from '@prisma/client';
import { estados } from './seed/estados';
import { cidades } from './seed/municipios';

const prisma = new PrismaClient();

async function main() {
    for (let estado of estados){
        await prisma.estado.create({
            data: {
                nome: estado.Nome,
                sigla: estado.Uf,
                atualizadoEm: null,
            }
        })
    }
    for (let cidade of cidades){
        await prisma.cidade.create({
            data: {
                nome: cidade.nome,
                latitude: cidade.latitude,
                longitude: cidade.longitude,
                atualizadoEm: null,
                estado: {
                    connect: {
                        id: cidade.estadoID
                    }
                }
            }
        })
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });