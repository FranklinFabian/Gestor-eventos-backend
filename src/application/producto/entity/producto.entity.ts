import { UtilService } from 'src/common/lib/util.service'
import {
  BeforeInsert,
  Check,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import dotenv from 'dotenv'
import { AuditoriaEntity } from 'src/common/entity/auditoria.entity'
import { Status } from 'src/common/constants'

dotenv.config()

export const ProductoEstado = {
  ACTIVE: Status.ACTIVE,
  INACTIVE: Status.INACTIVE,
}

@Check(UtilService.buildStatusCheck(ProductoEstado))
@Entity({ name: 'productos', schema: process.env.DB_SCHEMA_PRODUCTOS })
export class Producto extends AuditoriaEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Usuario',
  })
  id: string

  @Column({
    name: 'nombre',
    type: 'varchar',
    comment: 'nombre del producto',
  })
  nombre: string

  @Column({
    name: 'cantidad',
    type: 'varchar',
    comment: 'cantidad existente del producto',
  })
  cantidad: string

  @Column({
    name: 'precio',
    type: 'varchar',
    comment: 'precio del producto',
  })
  precio: string

  constructor(data?: Partial<Producto>) {
    super(data)
  }

  @BeforeInsert()
  insertarEstado() {
    this.estado = this.estado || ProductoEstado.ACTIVE
  }
}
