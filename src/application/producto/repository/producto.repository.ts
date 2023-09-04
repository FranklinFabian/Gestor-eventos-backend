import { Producto } from '../entity/producto.entity'
import { Injectable } from '@nestjs/common'
import { CrearProductoDto } from '../dto/crear-producto.dto'
import { ActualizarProductoDto } from '../dto/actualizar-producto.dto'
import { FiltrosProductoDto } from '../dto/filtros-producto.dto'
import { DataSource } from 'typeorm'
import { Status } from 'src/common/constants'

@Injectable()
export class ProductoRepository {
  constructor(private dataSource: DataSource) {}

  async crear(productoDto: CrearProductoDto, usuarioAuditoria: string) {
    return await this.dataSource.getRepository(Producto).save(
      new Producto({
        ...productoDto,
        usuarioCreacion: usuarioAuditoria,
      })
    )
  }

  async buscarProducto(nombre: string) {
    return await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .where({ nombre: nombre })
      .andWhere('producto.estado = :estado', {
        estado: Status.ACTIVE,
      })
      .getMany()
  }

  async listar(paginacionQueryDto: FiltrosProductoDto) {
    const { orden, sentido } = paginacionQueryDto

    const query = this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .select([
        'producto.id',
        'producto.nombre',
        'producto.cantidad',
        'producto.estado',
        'producto.precio',
      ])

    switch (orden) {
      case 'nombre':
        query.addOrderBy('producto.nombre', sentido)
        break
      case 'cantidad':
        query.addOrderBy('producto.cantidad', sentido)
        break
      case 'precio':
        query.addOrderBy('producto.precio', sentido)
        break
      case 'estado':
        query.addOrderBy('producto.estado', sentido)
        break
      default:
        query.orderBy('producto.id', 'ASC')
    }
    return await query.getManyAndCount()
  }

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Producto)
      .createQueryBuilder('producto')
      .where({ id: id })
      .getOne()
  }

  async actualizar(
    id: string,
    productoDto: ActualizarProductoDto,
    usuarioAuditoria: string
  ) {
    return await this.dataSource.getRepository(Producto).update(
      id,
      new Producto({
        ...productoDto,
        usuarioModificacion: usuarioAuditoria,
      })
    )
  }
}
