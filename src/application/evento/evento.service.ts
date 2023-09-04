/* eslint-disable prettier/prettier */
import { BaseService } from '../../common/base/base-service'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { EventoRepository } from './evento.repository'
import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Messages } from '../../common/constants/response-messages'
import { ActualizarEventoDto } from './dto/actualizar-evento.dto'
import { Status } from '../../common/constants'
import { CrearEventoDto } from './dto/crear-evento.dto'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'

@Injectable()
export class EventoService extends BaseService {
  constructor(
    @Inject(EventoRepository)
    private eventoRepositorio: EventoRepository
  ) {
    super()
  }

  async crear(eventoDto: CrearEventoDto, usuarioAuditoria: string) {
    const eventoRepetido = await this.eventoRepositorio.buscarCodigo(
      eventoDto.codigo
    )

    if (eventoRepetido) {
      throw new ConflictException(Messages.REPEATED_PARAMETER)
    }

    return await this.eventoRepositorio.crear(eventoDto, usuarioAuditoria)
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    return await this.eventoRepositorio.listar(paginacionQueryDto)
  }

  async listaruno(id: string) {
    return await this.eventoRepositorio.buscarPorId(id)
  }

  async listarPorGrupo(grupo: string) {
    return await this.eventoRepositorio.listarPorGrupo(grupo)
  }

  async actualizarDatos(
    id: string,
    eventoDto: ActualizarEventoDto,
    usuarioAuditoria: string
  ) {
    const evento = await this.eventoRepositorio.buscarPorId(id)
    if (!evento) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    await this.eventoRepositorio.actualizar(id, eventoDto, usuarioAuditoria)
    return { id }
  }

  async activar(idEvento: string, usuarioAuditoria: string) {
    const evento = await this.eventoRepositorio.buscarPorId(idEvento)
    if (!evento) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const eventoDto = new ActualizarEventoDto()
    eventoDto.estado = Status.ACTIVE
    await this.eventoRepositorio.actualizar(
      idEvento,
      eventoDto,
      usuarioAuditoria
    )
    return {
      id: idEvento,
      estado: eventoDto.estado,
    }
  }

  async inactivar(idEvento: string, usuarioAuditoria: string) {
    const evento = await this.eventoRepositorio.buscarPorId(idEvento)
    if (!evento) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const eventoDto = new ActualizarEventoDto()
    eventoDto.estado = Status.INACTIVE
    await this.eventoRepositorio.actualizar(
      idEvento,
      eventoDto,
      usuarioAuditoria
    )
    return {
      id: idEvento,
      estado: eventoDto.estado,
    }
  }

 /* async cargarImagen(
    id: string, 
    filename: string, 
    usuarioAuditoria: string) {
    const evento = await this.eventoRepositorio.buscarPorId(id)
    if (!evento) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const op = async (transaction: EntityManager) => {
      this.eventoRepositorio.actualizar(
        id,
        { respaldo: filename },
        usuarioAuditoria,
      )
    }
    await this.solicitudBajaArticuloRepositorio.runTransaction(op)
  }*/

}