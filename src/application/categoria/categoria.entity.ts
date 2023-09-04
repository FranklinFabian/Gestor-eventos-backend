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

export const CategoriaEstado = {
  ACTIVE: Status.ACTIVE,
  INACTIVE: Status.INACTIVE,
}

@Check(UtilService.buildStatusCheck(CategoriaEstado))
@Entity({ name: 'categorias', schema: process.env.DB_SCHEMA_CATEGORIAS })
export class Categoria extends AuditoriaEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Categoria',
  })
  id: string

  @Column({ length: 50, type: 'varchar', comment: 'Nombre de categoria' })
  categoria: string

  @Column({ length: 255, type: 'varchar', comment: 'Descripción de categoria' })
  descripcion: string

  @Column({ type: 'text', nullable: true })
  cartel?: string

  constructor(data?: Partial<Categoria>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || CategoriaEstado.ACTIVE
  }
}
