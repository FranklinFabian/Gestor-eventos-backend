import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { BaseController } from '../../../common/base/base-controller'
import { ProductoService } from '../service/producto.service'
import { FiltrosProductoDto } from '../dto/filtros-producto.dto'
import { ProdsIdDto } from '../dto/prods-id.dto'
import { ActualizarProductoDto } from '../dto/actualizar-producto.dto'
import { CrearProductoDto } from '../dto/crear-producto.dto'
import { JwtAuthGuard } from 'src/core/authentication/guards/jwt-auth.guard'
import { CasbinGuard } from 'src/core/authorization/guards/casbin.guard'

@Controller('productos')
@UseGuards(JwtAuthGuard, CasbinGuard)
export class ProductoController extends BaseController {
  constructor(private productoService: ProductoService) {
    super()
  }
  @Get()
  async listarProductos(@Query() paginacionQueryDto: FiltrosProductoDto) {
    const result = await this.productoService.listarProductos(
      paginacionQueryDto
    )
    return this.successListRows(result)
  }

  @Post()
  async crear(@Req() req, @Body() productoDto: CrearProductoDto) {
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoService.crearproducto(
      productoDto,
      usuarioAuditoria
    )
    return this.successCreate(result)
  }

  @Get('/:nombre')
  async buscarProducto(@Param() nombre: string) {
    const result = await this.productoService.buscarProducto(nombre)
    return this.success(result)
  }

  @Patch(':id')
  async actualizar(
    @Param() prods: ProdsIdDto,
    @Req() req,
    @Body() productoDto: ActualizarProductoDto
  ) {
    const { id: idProducto } = prods
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoService.actualizarProducto(
      idProducto,
      productoDto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/activacion')
  async activar(@Req() req, @Param() prods: ProdsIdDto) {
    const { id: idProducto } = prods
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoService.activar(
      idProducto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/inactivacion')
  async inactivar(@Req() req, @Param() prods: ProdsIdDto) {
    const { id: idProducto } = prods
    const usuarioAuditoria = this.getUser(req)
    const result = await this.productoService.inactivar(
      idProducto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }
}
