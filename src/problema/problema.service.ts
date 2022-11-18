import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProblemaDto } from './dto/create-problema.dto';
import { UpdateProblemaDto } from './dto/update-problema.dto';
import { Problema } from './entities/problema.entity';

@Injectable()
export class ProblemaService {
  
  constructor(private prisma: PrismaService) {}
  
  create(createProblemaDto: CreateProblemaDto) {
    return this.prisma.problema.create({
      data: createProblemaDto,
    });
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProblemaWhereUniqueInput;
      where?: Prisma.ProblemaWhereInput;
      orderBy?: Prisma.ProblemaOrderByWithRelationInput;
    }
  ) : Promise<Problema[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.problema.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) : Promise<Problema | null> {
    return this.prisma.problema.findUnique({
      where: {
        id: id
      },
    });
  }

  async update(params: {
    where: Prisma.ProblemaWhereUniqueInput;
    data: UpdateProblemaDto;
  }): Promise<Problema> {
    const { where, data } = params;
    return this.prisma.problema.update({
      data,
      where,
    });
  }

  remove(params: {
    where: Prisma.ProblemaWhereUniqueInput;
  }): Promise<Problema> {

    let removidoEm = new Date();

    const { where } = params;
    return this.prisma.problema.update({
      data: {
        removidoEm
      },
      where,
    });
  }

  async deleteProblema(where: Prisma.ProblemaWhereUniqueInput): Promise<Problema> {
    return this.prisma.problema.delete({
      where,
    });
  }
}
