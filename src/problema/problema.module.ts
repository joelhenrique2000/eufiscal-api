import { Module } from '@nestjs/common';
import { ProblemaService } from './problema.service';
import { ProblemaController } from './problema.controller';
import { PrismaService } from 'src/database/PrismaService';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [ProblemaController],
  providers: [ProblemaService, PrismaService, FirebaseService]
})
export class ProblemaModule {}
