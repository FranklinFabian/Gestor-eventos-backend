import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from '../../core/authentication/guards/jwt-auth.guard'
import { CasbinGuard } from '../../core/authorization/guards/casbin.guard'
import { BaseController } from '../../common/base/base-controller'
import { CategoriaService } from './categoria.service'
import { CrearCategoriaDto } from './dto/crear-categoria.dto'
import { CatsIdDto } from '../parametro/dto/cats-id.dto'
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto'
import { FiltrosCategoriaDto } from '../parametro/dto/filtros-categoria.dto'
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors'
import { MulterFile } from './dto/multer-file.interface'

@Controller('categorias')
@UseGuards(JwtAuthGuard, CasbinGuard)
export class CategoriaController extends BaseController {
  constructor(private categoriaService: CategoriaService) {
    super()
  }

  @Get()
  async listar(@Query() paginacionQueryDto: FiltrosCategoriaDto) {
    const result = await this.categoriaService.listar(paginacionQueryDto)
    return this.successListRows(result)
  }

  @Post()
  async crear(@Req() req, @Body() categoriaDto: CrearCategoriaDto) {
    const usuarioAuditoria = this.getUser(req)
    const result = await this.categoriaService.crear(
      categoriaDto,
      usuarioAuditoria
    )
    return this.successCreate(result)
  }

  @Patch(':id')
  async actualizar(
    @Param() cats: CatsIdDto,
    @Req() req,
    @Body() categoriaDto: ActualizarCategoriaDto
  ) {
    const { id: idCategoria } = cats
    const usuarioAuditoria = this.getUser(req)
    const result = await this.categoriaService.actualizarDatos(
      idCategoria,
      categoriaDto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/activacion')
  async activar(@Req() req, @Param() cats: CatsIdDto) {
    const { id: idCategoria } = cats
    const usuarioAuditoria = this.getUser(req)
    const result = await this.categoriaService.activar(
      idCategoria,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/inactivacion')
  async inactivar(@Req() req, @Param() cats: CatsIdDto) {
    const { id: idCategoria } = cats
    const usuarioAuditoria = this.getUser(req)
    const result = await this.categoriaService.inactivar(
      idCategoria,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }
}
