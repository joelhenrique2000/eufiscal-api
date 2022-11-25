import { PrismaClient } from '@prisma/client';
import { categorias } from './seed/categorias';
import { cidades } from './seed/municipios';
import { estados } from './seed/estados';
import { status } from './seed/status';

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
    for(let categoria of categorias){
        await prisma.categoria.create({
            data: {
                nome: categoria.nome,
                atualizadoEm: null,
            }
        })
    }
    for(let stat of status){
        await prisma.status.create({
            data: {
                nome: stat.nome,
                atualizadoEm: null,
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