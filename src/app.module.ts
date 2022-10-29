import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { StatusModule } from './status/status.module';
import { ProblemaModule } from './problema/problema.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [CategoriaModule, StatusModule, ProblemaModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
