import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemaService } from './problema.service';
import { CreateProblemaDto } from './dto/create-problema.dto';
import { UpdateProblemaDto } from './dto/update-problema.dto';
import { HistoricoProblema, Problema } from './entities/problema.entity';

@Controller('problema')
export class ProblemaController {
  constructor(private readonly problemaService: ProblemaService) {}

  @Post()
  create(@Body() createProblemaDto: CreateProblemaDto) {
    let problema = this.problemaService.create(createProblemaDto);
    problema.then(x => this.problemaService.createHistorico({ id: x.id, statusID: x.statusID}));
    return problema;
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
    return this.problemaService.findOne(+id).then(problema => {
      return this.problemaService.findHistoricos({
        where: {
          problemaID: +id
        }
      }).then(historico => {
        problema.statusHistorico = { 
          abertura: null,
          analise: null,
          resolvido: null,
        };

        historico.forEach(element => {
          if(element.status.id == 1){
            problema.statusHistorico.abertura = {
              data: element.data,
              descricao: "Inicio da denuncia"
            }
          }
          
          if(element.status.id == 2){
            problema.statusHistorico.analise = {
              data: element.data,
              descricao: "Denuncia foi analisada e aceita. Está aguardando a resposta do órgão responsável."
            }
          }
          
          if(element.status.id == 3){
            problema.statusHistorico.resolvido = {
              data: element.data,
              descricao: "Denuncia vista por órgão responsável e o problema foi solucionado."
            }
          }
        });
        return problema;
      })

    })
  }

  @Post(':id/atualizarStatus')
  atualizarStatus(@Param('id') id: string) {
    var problema = this.problemaService.findOne(+id);
    let problemaStatus = 0; 
    problema.then( x=> problemaStatus = x.status.id);
    if(problemaStatus == 1)
      problemaStatus= 2;
    else if (problemaStatus == 2)
      problemaStatus = 3;
    else
      return {
        mensagem: "Status não pode ser alterado"
      };                                              
      
    this.problemaService.createHistorico({ id: +id, statusID: problemaStatus});

    return this.problemaService.updateStatus(
      {
        where : {
          id: +id
        },
        data: {
          id:  +id,
          statusID: problemaStatus
        }
      }
    );
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
