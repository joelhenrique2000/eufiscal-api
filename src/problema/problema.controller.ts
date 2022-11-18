import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemaService } from './problema.service';
import { CreateProblemaDto } from './dto/create-problema.dto';
import { UpdateProblemaDto } from './dto/update-problema.dto';

@Controller('problema')
export class ProblemaController {
  constructor(private readonly problemaService: ProblemaService) {}

  @Post()
  create(@Body() createProblemaDto: CreateProblemaDto) {
    return this.problemaService.create(createProblemaDto);
  }

  @Get()
  findAll() {
    return this.problemaService.findAll({
      where: {
        removidoEm: null
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProblemaDto: UpdateProblemaDto) {
    return this.problemaService.update({
      where : {
        id: +id
      },
      data: updateProblemaDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemaService.remove({
      where : {
        id: +id
      }
    });
  }
}
