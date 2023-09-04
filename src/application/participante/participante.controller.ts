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
import { CrearParticipanteDto } from './dto/crear-participante.dto'
import { JwtAuthGuard } from '../../core/authentication/guards/jwt-auth.guard'
import { CasbinGuard } from '../../core/authorization/guards/casbin.guard'
import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { BaseController } from '../../common/base/base-controller'
import { ActualizarParticipanteDto } from './dto/actualizar-participante.dto'
import { PartsIdDto } from './dto/parts-id.dto'
import { ParticipanteService } from './participante.service'

@Controller('participantes')
@UseGuards(JwtAuthGuard, CasbinGuard)
export class ParticipanteController extends BaseController {
  constructor(private participanteServicio: ParticipanteService) {
    super()
  }

  @Get()
  async listar(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.participanteServicio.listar(paginacionQueryDto)
    return this.successListRows(result)
  }

  @Post()
  async crear(@Req() req, @Body() participanteDto: CrearParticipanteDto) {
    const usuarioAuditoria = this.getUser(req)
    const result = await this.participanteServicio.crear(
      participanteDto,
      usuarioAuditoria
    )
    return this.successCreate(result)
  }

  @Patch(':id')
  async actualizar(
    @Param() parts: PartsIdDto,
    @Req() req,
    @Body() participanteDto: ActualizarParticipanteDto
  ) {
    const { id: idParticipante } = parts
    const usuarioAuditoria = this.getUser(req)
    const result = await this.participanteServicio.actualizarDatos(
      idParticipante,
      participanteDto,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/activacion')
  async activar(@Req() req, @Param() parts: PartsIdDto) {
    const { id: idParticipante } = parts
    const usuarioAuditoria = this.getUser(req)
    const result = await this.participanteServicio.activar(
      idParticipante,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }

  @Patch('/:id/inactivacion')
  async inactivar(@Req() req, @Param() parts: PartsIdDto) {
    const { id: idParticipante } = parts
    const usuarioAuditoria = this.getUser(req)
    const result = await this.participanteServicio.inactivar(
      idParticipante,
      usuarioAuditoria
    )
    return this.successUpdate(result)
  }
}
