import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  
  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: createUsuarioDto,
    });
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UsuarioWhereUniqueInput;
      where?: Prisma.UsuarioWhereInput;
      orderBy?: Prisma.UsuarioOrderByWithRelationInput;
    }
  ) : Promise<Usuario[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.usuario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) : Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: {
        id: id
      },
    });
  }

  async update(params: {
    where: Prisma.UsuarioWhereUniqueInput;
    data: UpdateUsuarioDto;
  }): Promise<Usuario> {
    const { where, data } = params;
    return this.prisma.usuario.update({
      data,
      where,
    });
  }

  remove(params: {
    where: Prisma.UsuarioWhereUniqueInput;
  }): Promise<Usuario> {

    let removidoEm = new Date();

    const { where } = params;
    return this.prisma.usuario.update({
      data: {
        removidoEm
      },
      where,
    });
  }

  async deleteUsuario(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where,
    });
  }
}
