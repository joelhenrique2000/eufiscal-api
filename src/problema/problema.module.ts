import { Module } from '@nestjs/common';
import { ProblemaService } from './problema.service';
import { ProblemaController } from './problema.controller';

@Module({
  controllers: [ProblemaController],
  providers: [ProblemaService]
})
export class ProblemaModule {}
