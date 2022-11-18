import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}
  
  create(createStatusDto: CreateStatusDto) {
    return this.prisma.status.create({
      data: createStatusDto,
    });
  }

  findAll(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.StatusWhereUniqueInput;
      where?: Prisma.StatusWhereInput;
      orderBy?: Prisma.StatusOrderByWithRelationInput;
    }
  ) : Promise<Status[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.status.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(id: number) : Promise<Status | null> {
    return this.prisma.status.findUnique({
      where: {
        id: id
      },
    });
  }

  async update(params: {
    where: Prisma.StatusWhereUniqueInput;
    data: UpdateStatusDto;
  }): Promise<Status> {
    const { where, data } = params;
    return this.prisma.status.update({
      data,
      where,
    });
  }

  remove(params: {
    where: Prisma.StatusWhereUniqueInput;
  }): Promise<Status> {

    let removidoEm = new Date();

    const { where } = params;
    return this.prisma.status.update({
      data: {
        removidoEm
      },
      where,
    });
  }

  async deleteStatus(where: Prisma.StatusWhereUniqueInput): Promise<Status> {
    return this.prisma.status.delete({
      where,
    });
  }
}
