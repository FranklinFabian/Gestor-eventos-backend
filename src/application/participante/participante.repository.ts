import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Brackets, DataSource } from 'typeorm'
import { Participante } from './participante.entity'
import { Injectable } from '@nestjs/common'
import { ActualizarParticipanteDto } from './dto/actualizar-participante.dto'
import { Status } from '../../common/constants'
import { CrearParticipanteDto } from './dto/crear-participante.dto'

@Injectable()
export class ParticipanteRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Participante)
      .createQueryBuilder('participante')
      .where({ id: id })
      .getOne()
  }

  async actualizar(
    id: string,
    participanteDto: ActualizarParticipanteDto,
    usuarioAuditoria: string
  ) {
    return await this.dataSource.getRepository(Participante).update(
      id,
      new Participante({
        ...participanteDto,
        usuarioModificacion: usuarioAuditoria,
      })
    )
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Participante)
      .createQueryBuilder('participante')
      .select([
        'participante.id',
        'participante.correo',
        'participante.nombre',
        'participante.estado',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'nombre':
        query.addOrderBy('participante.nombre', sentido)
        break
      case 'correo':
        query.addOrderBy('participante.correo', sentido)
        break
      case 'estado':
        query.addOrderBy('participante.estado', sentido)
        break
      default:
        query.orderBy('participante.id', 'ASC')
    }

    /*if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('parametro.codigo like :filtro', { filtro: `%${filtro}%` })
          qb.orWhere('parametro.nombre ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('parametro.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('parametro.grupo ilike :filtro', {
            filtro: `%${filtro}%`,
          })
        })
      )
    }*/
    return await query.getManyAndCount()
  }

  /* async listarPorGrupo(grupo: string) {
     return await this.dataSource
       .getRepository(Parametro)
       .createQueryBuilder('parametro')
       .select(['parametro.id', 'parametro.codigo', 'parametro.nombre'])
       .where('parametro.grupo = :grupo', {
         grupo,
       })
       .andWhere('parametro.estado = :estado', {
         estado: Status.ACTIVE,
       })
       .getMany()
   }*/

  /*async buscarCodigo(codigo: string) {
    return this.dataSource
      .getRepository(Participante)
      .findOne({ where: { codigo: codigo } })
  }
*/
  async crear(participanteDto: CrearParticipanteDto, usuarioAuditoria: string) {
    return await this.dataSource.getRepository(Participante).save(
      new Participante({
        ...participanteDto,
        usuarioCreacion: usuarioAuditoria,
      })
    )
  }
}
