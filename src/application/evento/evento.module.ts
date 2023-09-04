import { Module } from '@nestjs/common'
import { EventoController } from './evento.controller'
import { EventoService } from './evento.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EventoRepository } from './evento.repository'
import { Evento } from './evento.entity'

@Module({
  controllers: [EventoController],
  providers: [EventoService, EventoRepository],
  imports: [TypeOrmModule.forFeature([Evento])],
})
export class EventoModule {}
