import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from './entities/estado.entity';

@Injectable()
export class EstadoService {
  
  constructor(private prisma: PrismaService) {}
  
  create(createEstadoDto: CreateEstadoDto) {
    return this.prisma.estado.create({
      data: createEstadoDto,
    });
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.EstadoWhereUniqueInput;
      where?: Prisma.EstadoWhereInput;
      orderBy?: Prisma.EstadoOrderByWithRelationInput;
    }
  ) : Promise<Estado[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.estado.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) : Promise<Estado | null> {
    return this.prisma.estado.findUnique({
      where: {
        id: id
      },
    });
  }

  async update(params: {
    where: Prisma.EstadoWhereUniqueInput;
    data: UpdateEstadoDto;
  }): Promise<Estado> {
    const { where, data } = params;
    return this.prisma.estado.update({
      data,
      where,
    });
  }

  remove(params: {
    where: Prisma.EstadoWhereUniqueInput;
  }): Promise<Estado> {

    let removidoEm = new Date();

    const { where } = params;
    return this.prisma.estado.update({
      data: {
        removidoEm
      },
      where,
    });
  }

  async deleteEstado(where: Prisma.EstadoWhereUniqueInput): Promise<Estado> {
    return this.prisma.estado.delete({
      where,
    });
  }
}
