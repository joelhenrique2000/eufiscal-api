import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { Cidade } from './entities/cidade.entity';

@Injectable()
export class CidadeService {
  constructor(private prisma: PrismaService) {}
  
  create(createCidadeDto: CreateCidadeDto) {
    let data = {
      nome: createCidadeDto.nome,
      latitude: createCidadeDto.latitude,
      longitude: createCidadeDto.longitude,
      estado:{
        connect: { id: createCidadeDto.estadoID }
      }
    };

    return this.prisma.cidade.create({
      data,
    });
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CidadeWhereUniqueInput;
      where?: Prisma.CidadeWhereInput;
      orderBy?: Prisma.CidadeOrderByWithRelationInput;
    }
  ) : Promise<Cidade[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.cidade.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        estado: true, 
      },
    });
  }

  findOne(id: number) : Promise<Cidade | null> {
    return this.prisma.cidade.findUnique({
      where: {
        id: id
      },
      include: {
        estado: true, 
      },
    });
  }

  async update(params: {
    where: Prisma.CidadeWhereUniqueInput;
    data: UpdateCidadeDto;
  }): Promise<Cidade> {
    const { where, data } = params;
    
    return this.prisma.cidade.update({
      data,
      where,
    });
  }

  remove(params: {
    where: Prisma.CidadeWhereUniqueInput;
  }): Promise<Cidade> {

    let removidoEm = new Date();

    const { where } = params;
    return this.prisma.cidade.update({
      data: {
        removidoEm
      },
      where,
    });
  }

  async deleteCidade(where: Prisma.CidadeWhereUniqueInput): Promise<Cidade> {
    return this.prisma.cidade.delete({
      where,
    });
  }
}
