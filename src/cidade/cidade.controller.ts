import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CidadeService } from './cidade.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Controller('cidade')
export class CidadeController {
  constructor(private readonly cidadeService: CidadeService) {}

  @Post()
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadeService.create(createCidadeDto);
  }

  @Get('findAll/:nome')
  findAll(@Param('nome') nome: string) {
    return this.cidadeService.findAll({
      where: {
        removidoEm: null,
        nome: nome,
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidadeDto: UpdateCidadeDto) {
    return this.cidadeService.update({
      where : {
        id: +id
      },
      data: updateCidadeDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidadeService.remove({
      where : {
        id: +id
      }
    });
  }
}
