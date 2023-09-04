import { UtilService } from '../../common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from '../../common/entity/auditoria.entity'
import { Status } from '../../common/constants'
import { Evento } from './evento.entity'
import { Usuario } from 'src/core/usuario/entity/usuario.entity'

dotenv.config()

export const TicketEstado = {
  ACTIVE: Status.ACTIVE,
  INACTIVE: Status.INACTIVE,
}

@Check(UtilService.buildStatusCheck(TicketEstado))
@Entity({ name: 'tickets', schema: process.env.DB_SCHEMA_TICKETS })
export class Ticket extends AuditoriaEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Ticket',
  })
  id: string

  @Column({
    name: 'id_evento',
    type: 'bigint',
    nullable: false,
    comment: 'clave foránea que referencia la tabla de Eventos',
  })
  idevento: string

  @Column({
    name: 'id_usuario',
    type: 'bigint',
    nullable: false,
    comment: 'clave foránea que referencia la tabla de Usuarios',
  })
  idparticipante: string

  @ManyToOne(() => Evento, (evento) => evento.tickets, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_evento',
    referencedColumnName: 'id',
  })
  evento: Evento

  @ManyToOne(() => Usuario, (usuario) => usuario.tickets, {
    nullable: false,
  })
  @JoinColumn({
    name: 'id_usuario',
    referencedColumnName: 'id',
  })
  usuario: Usuario

  constructor(data?: Partial<Evento>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || TicketEstado.ACTIVE
  }
}
