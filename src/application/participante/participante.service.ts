import { BaseService } from '../../common/base/base-service'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CrearParticipanteDto } from './dto/crear-participante.dto'
import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Messages } from '../../common/constants/response-messages'
import { ActualizarParticipanteDto } from './dto/actualizar-participante.dto'
import { Status } from '../../common/constants'
import { ParticipanteRepository } from './participante.repository'

@Injectable()
export class ParticipanteService extends BaseService {
  constructor(
    @Inject(ParticipanteRepository)
    private participanteRepositorio: ParticipanteRepository
  ) {
    super()
  }

  async crear(participanteDto: CrearParticipanteDto, usuarioAuditoria: string) {
    return await this.participanteRepositorio.crear(
      participanteDto,
      usuarioAuditoria
    )
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    return await this.participanteRepositorio.listar(paginacionQueryDto)
  }

  async actualizarDatos(
    id: string,
    participanteDto: ActualizarParticipanteDto,
    usuarioAuditoria: string
  ) {
    const participante = await this.participanteRepositorio.buscarPorId(id)
    if (!participante) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    await this.participanteRepositorio.actualizar(
      id,
      participanteDto,
      usuarioAuditoria
    )
    return { id }
  }

  async activar(idParticipante: string, usuarioAuditoria: string) {
    const participante = await this.participanteRepositorio.buscarPorId(
      idParticipante
    )
    if (!participante) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const participanteDto = new ActualizarParticipanteDto()
    participanteDto.estado = Status.ACTIVE
    await this.participanteRepositorio.actualizar(
      idParticipante,
      participanteDto,
      usuarioAuditoria
    )
    return {
      id: idParticipante,
      estado: participanteDto.estado,
    }
  }

  async inactivar(idParticipante: string, usuarioAuditoria: string) {
    const participante = await this.participanteRepositorio.buscarPorId(
      idParticipante
    )
    if (!participante) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const participanteDto = new ActualizarParticipanteDto()
    participanteDto.estado = Status.INACTIVE
    await this.participanteRepositorio.actualizar(
      idParticipante,
      participanteDto,
      usuarioAuditoria
    )
    return {
      id: idParticipante,
      estado: participanteDto.estado,
    }
  }
}
