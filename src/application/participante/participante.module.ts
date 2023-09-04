import { Module } from '@nestjs/common'
import { ParticipanteController } from './participante.controller'
import { ParticipanteService } from './participante.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Participante } from './participante.entity'
import { ParticipanteRepository } from './participante.repository'

@Module({
  controllers: [ParticipanteController],
  providers: [ParticipanteService, ParticipanteRepository],
  imports: [TypeOrmModule.forFeature([Participante])],
})
export class ParticipanteModule {}
