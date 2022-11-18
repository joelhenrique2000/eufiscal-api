import { Module } from '@nestjs/common';
import { ProblemaService } from './problema.service';
import { ProblemaController } from './problema.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ProblemaController],
  providers: [ProblemaService, PrismaService]
})
export class ProblemaModule {}
