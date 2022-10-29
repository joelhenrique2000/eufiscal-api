import { Injectable } from '@nestjs/common';
import { CreateProblemaDto } from './dto/create-problema.dto';
import { UpdateProblemaDto } from './dto/update-problema.dto';

@Injectable()
export class ProblemaService {
  create(createProblemaDto: CreateProblemaDto) {
    return 'This action adds a new problema';
  }

  findAll() {
    return `This action returns all problema`;
  }

  findOne(id: number) {
    return `This action returns a #${id} problema`;
  }

  update(id: number, updateProblemaDto: UpdateProblemaDto) {
    return `This action updates a #${id} problema`;
  }

  remove(id: number) {
    return `This action removes a #${id} problema`;
  }
}
