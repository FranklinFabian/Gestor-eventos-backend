import { UtilService } from '../../common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from '../../common/entity/auditoria.entity'
import { Status } from '../../common/constants'
import { Categoria } from '../categoria/categoria.entity'
import { Ticket } from './ticket.entity'
import { Usuario } from 'src/core/usuario/entity/usuario.entity'

dotenv.config()

export const EventoEstado = {
  ACTIVE: Status.ACTIVE,
  INACTIVE: Status.INACTIVE,
}

@Check(UtilService.buildStatusCheck(EventoEstado))
@Entity({ name: 'eventos', schema: process.env.DB_SCHEMA_EVENTOS })
export class Evento extends AuditoriaEntity {
  [x: string]: any
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Evento',
  })
  id: string

  @Column({
    length: 15,
    type: 'varchar',
    unique: true,
    comment: 'Código de evento',
  })
  codigo: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre de evento' })
  nombre: string

  @Column({ length: 255, type: 'varchar', comment: 'Descripción de evento' })
  descripcion: string

  @Column({ length: 255, type: 'varchar', comment: 'Lugar de evento' })
  lugar: string

  @Column({ length: 255, type: 'varchar', comment: 'Fecha de evento' })
  fecha: Date

  @Column({
    length: 255,
    type: 'varchar',
    comment: 'Enlace para acceder al evento de forma virtual',
  })
  enlace: string

  @Column({ type: 'text', nullable: true })
  cartel?: string

  @Column({
    length: 255,
    type: 'varchar',
    comment: 'Cantidad de participantes del evento',
  })
  maxparticipantes: string

  @Column({
    length: 255,
    type: 'varchar',
    comment: 'Categoria del evento',
  })
  idcategoria: string

  @ManyToMany(() => Categoria, { cascade: true })
  @JoinTable()
  categorias: Categoria[]

  @OneToMany(() => Ticket, (ticket) => ticket.evento)
  tickets: Ticket[]

  constructor(data?: Partial<Evento>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || EventoEstado.ACTIVE
  }
}
