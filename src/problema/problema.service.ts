import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateProblemaDto } from './dto/create-problema.dto';
import { UpdateProblemaDto } from './dto/update-problema.dto';
import { HistoricoProblema, Problema } from './entities/problema.entity';

@Injectable()
export class ProblemaService {
  
  constructor(private prisma: PrismaService) {}
  
  create(createProblemaDto: CreateProblemaDto) {
    let data = {
      titulo: createProblemaDto.titulo, 
      descricao: createProblemaDto.descricao, 
      fotoURL: createProblemaDto.fotoURL, 
      isResidente: createProblemaDto.isResidente,
      latitude: createProblemaDto.latitude,
      longitude: createProblemaDto.longitude,
      criadoEm: createProblemaDto.timestamp,
      denunciaIrregular: false,
      cidade:{
        connect: { id: createProblemaDto.cidadeID }
      },
      categoria:{
        connect: { id: createProblemaDto.categoriaId }
      },
      status:{
        connect: { id: 1 }
      }
    };

    return this.prisma.problema.create({
      data,
      include: {
        status: true, 
        categoria: true, 
        cidade: true,
      },
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
      include: {
        status: true, 
        categoria: true, 
        cidade: true,
      },
    });
  }

  findOne(id: number) : Promise<Problema | null> {
    return this.prisma.problema.findUnique({
      where: {
        id: id
      },
      include: {
        status: true, 
        categoria: true, 
        cidade: true,
      },
    });
  }

  async update(params: {
    where: Prisma.ProblemaWhereUniqueInput;
    data: UpdateProblemaDto;
  }): Promise<Problema> {
    const { where, data } = params;
    let dataAux = {
      titulo: data.titulo, 
      descricao: data.descricao, 
      fotoURL: data.fotoURL, 
      isResidente: data.isResidente,
      latitude: data.latitude,
      longitude: data.longitude
    };

    return this.prisma.problema.update({
      data: dataAux,
      where,
      include: {
        status: true, 
        categoria: true, 
        cidade: true,
      },
    });
  }

  async updateStatus(params: {
    where: Prisma.ProblemaWhereUniqueInput;
    data: UpdateProblemaDto;
  }): Promise<Problema> {
    const { where, data } = params;

    return this.prisma.problema.update({
      data: {
        status:{
          connect: { id: data.statusID }
        },
      },
      where,
      include: {
        status: true, 
        categoria: true, 
        cidade: true,
      },
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
      include: {
        status: true, 
        categoria: true, 
        cidade: true,
      },
    });
  }

  async deleteProblema(where: Prisma.ProblemaWhereUniqueInput): Promise<Problema> {
    return this.prisma.problema.delete({
      where,
      include: {
        status: true, 
        categoria: true, 
        cidade: true,
      },
    });
  }

  createHistorico(updateProblemaDto: UpdateProblemaDto) {
    let data = {
      status:{
        connect: { id: updateProblemaDto.statusID }
      },
      problema:{
        connect: { id: updateProblemaDto.id }
      }
    };
    return this.prisma.historicoProblema.create({
      data,
    });
  }

  findHistoricos(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.HistoricoProblemaWhereUniqueInput;
      where?: Prisma.HistoricoProblemaWhereInput;
      orderBy?: Prisma.HistoricoProblemaOrderByWithRelationInput;
    }
  ) : Promise<HistoricoProblema[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.historicoProblema.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        status: true,
        problema: false
      },
    });
  }
}
