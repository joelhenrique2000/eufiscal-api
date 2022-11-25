import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll({
      where: {
        removidoEm: null
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Get(':id')
  findByEmail(@Param('email') email: string) {
    return this.usuarioService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update({
      where : {
        id: +id
      },
      data: updateUsuarioDto
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove({
      where : {
        id: +id
      }
    });
  }
}
