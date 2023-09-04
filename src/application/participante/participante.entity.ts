import { UtilService } from '../../common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from '../../common/entity/auditoria.entity'
import { Status } from '../../common/constants'

dotenv.config()

export const ParticipanteEstado = {
  ACTIVE: Status.ACTIVE,
  INACTIVE: Status.INACTIVE,
}

@Check(UtilService.buildStatusCheck(ParticipanteEstado))
@Entity({ name: 'participantes', schema: process.env.DB_SCHEMA_PARTICIPANTES })
export class Participante extends AuditoriaEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Participante',
  })
  id: string

  @Column({
    type: 'varchar',
    length: '250',
    name: 'correo',
    comment: 'Descripcion del participante',
  })
  correo: string

  @Column({
    type: 'varchar',
    length: '250',
    name: 'nombre',
    comment: 'Descripcion del participante',
  })
  nombre: string

 /* @Column({
    type: 'varchar',
    length: '250',
    name: 'evento',
    comment: 'Descripcion del participante',
  })
  evento: string

  @Column({
    type: 'varchar',
    length: '250',
    name: 'idevento',
    comment: 'Descripcion del participante',
  })
  idevento: string */

  constructor(data?: Partial<Participante>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || ParticipanteEstado.ACTIVE
  }
}
