import { Inject, Injectable, NotFoundException, Query } from '@nestjs/common'
import { ProductoRepository } from '../repository/producto.repository'
import { FiltrosProductoDto } from '../dto/filtros-producto.dto'
import { ActualizarProductoDto } from '../dto/actualizar-producto.dto'
import { Messages } from 'src/common/constants/response-messages'
import { Status } from 'src/common/constants'
import { CrearProductoDto } from '../dto/crear-producto.dto'
import { BaseService } from 'src/common/base/base-service'

@Injectable()
export class ProductoService extends BaseService {
  constructor(
    @Inject(ProductoRepository)
    private productoRepositorio: ProductoRepository
  ) {
    super()
  }

  async crearproducto(productoDto: CrearProductoDto, usuarioAuditoria: string) {
    return await this.productoRepositorio.crear(productoDto, usuarioAuditoria)
  }

  async listarProductos(@Query() paginacionQueryDto: FiltrosProductoDto) {
    return await this.productoRepositorio.listar(paginacionQueryDto)
  }

  async buscarProducto(nombre: string) {
    return await this.productoRepositorio.buscarProducto(nombre)
  }

  async actualizarProducto(
    id: string,
    productoDto: ActualizarProductoDto,
    usuarioAuditoria: string
  ) {
    const producto = await this.productoRepositorio.buscarPorId(id)
    if (!producto) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    await this.productoRepositorio.actualizar(id, productoDto, usuarioAuditoria)
    return { id }
  }

  async activar(idProducto: string, usuarioAuditoria: string) {
    const producto = await this.productoRepositorio.buscarPorId(idProducto)
    if (!producto) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const productoDto = new ActualizarProductoDto()
    productoDto.estado = Status.ACTIVE
    await this.productoRepositorio.actualizar(
      idProducto,
      productoDto,
      usuarioAuditoria
    )
    return {
      id: idProducto,
      estado: productoDto.estado,
    }
  }

  async inactivar(idProducto: string, usuarioAuditoria: string) {
    const producto = await this.productoRepositorio.buscarPorId(idProducto)
    if (!producto) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const productoDto = new ActualizarProductoDto()
    productoDto.estado = Status.INACTIVE
    await this.productoRepositorio.actualizar(
      idProducto,
      productoDto,
      usuarioAuditoria
    )
    return {
      id: idProducto,
      estado: productoDto.estado,
    }
  }
}
