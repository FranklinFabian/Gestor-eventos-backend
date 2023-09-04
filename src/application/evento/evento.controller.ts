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
import { EventoService } from './evento.service'
import { CrearEventoDto } from './dto/crear-evento.dto'
import { JwtAuthGuard } from '../../core/authentication/guards/jwt-auth.guard'
import { CasbinGuard } from '../../core/authorization/guards/casbin.guard'
import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { BaseController } from '../../common/base/base-controller'
import { EventGrupoDto } from './dto/grupo.dto'
import { ActualizarEventoDto } from './dto/actualizar-evento.dto'
import { ParamIdDto } from '../../common/dto/params-id.dto'
import { FileInterceptor } from '@nestjs/platform-express/multer'

@Controller('eventos')
@UseGuards(JwtAuthGuard, CasbinGuard)
export class EventoController extends BaseController {
  constructor(private eventoService: EventoService) {
    super()
  }

  @Get()
  async listar(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.eventoService.listar(paginacionQueryDto)
    return this.successListRows(result)
  }

  @Get(':id')
  async listaruno(@Param() events: ParamIdDto) {
    const { id: idEvento } = events
    const result = await this.eventoService.listaruno(idEvento)
    return this.successList(result)
  }

  @Get('/:grupo/listado')
  async listarPorGrupo(@Param() events: EventGrupoDto) {
    const { grupo } = events
    const result = await this.eventoService.listarPorGrupo(grupo)
    return this.successList(result)
  }

  @Post()
  async crear(@Req() req, @Body() eventoDto: CrearEventoDto) {
    const usuarioAuditoria = this.getUser(req)
    const result = await this.eventoService.crear(eventoDto, usuarioAuditoria)
    return this.successCreate(result)
  }

  @Patch(':id')
  async actualizar(
    @Param() events: ParamIdDto,
    @Req() req,
    @Body() eventoDto: ActualizarEventoDto
  ) {
    const { id: idEvento } = events
    const usuarioAuditoria = this.getUser(req)
    const result = await this.eventoService.actualizarDatos(
      idEvento,
      eventoDto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/activacion')
  async activar(@Req() req, @Param() events: ParamIdDto) {
    const { id: idEvento } = events
    const usuarioAuditoria = this.getUser(req)
    const result = await this.eventoService.activar(idEvento, usuarioAuditoria)
    return this.successUpdate(result)
  }

  @Patch('/:id/inactivacion')
  async inactivar(@Req() req, @Param() events: ParamIdDto) {
    const { id: idEvento } = events
    const usuarioAuditoria = this.getUser(req)
    const result = await this.eventoService.inactivar(
      idEvento,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  /*@Post(':id/cargar')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './temp', // Ajusta la carpeta de destino
        filename: nameFile, // Define tu lógica de nombres de archivos si es necesario
      }),
      fileFilter: fileFilter, // Define tu lógica de filtrado de archivos si es necesario
    })
  )
  async cargarImagen(
    @Req() req,
    @Param() events: ParamIdDto,
    @UploadedFile() imagen: Express.Multer.File
  ) {
    const { id: idEvento } = events
    const usuarioAuditoria = this.getUser(req)
    const { filename } = imagen
    await this.eventoService.cargarImagen(idEvento, filename, usuarioAuditoria)
    return {
      imagen: filename,
    }
  }*/
}
