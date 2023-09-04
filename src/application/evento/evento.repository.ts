import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Brackets, DataSource } from 'typeorm'
import { CrearEventoDto } from './dto/crear-evento.dto'
import { Evento } from './evento.entity'
import { Injectable } from '@nestjs/common'
import { ActualizarEventoDto } from './dto/actualizar-evento.dto'
import { Status } from '../../common/constants'

@Injectable()
export class EventoRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Evento)
      .createQueryBuilder('evento')
      .where({ id: id })
      .getOne()
  }

  async actualizar(
    id: string,
    eventoDto: ActualizarEventoDto,
    usuarioAuditoria: string
  ) {
    return await this.dataSource.getRepository(Evento).update(
      id,
      new Evento({
        ...eventoDto,
        usuarioModificacion: usuarioAuditoria,
      })
    )
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Evento)
      .createQueryBuilder('evento')
      .select([
        'evento.id',
        'evento.codigo',
        'evento.nombre',
        'evento.descripcion',
        'evento.lugar',
        'evento.fecha',
        'evento.enlace',
        'evento.maxparticipantes',
        'evento.estado',
        'evento.idcategoria',
        'evento.cartel',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'codigo':
        query.addOrderBy('evento.codigo', sentido)
        break
      case 'nombre':
        query.addOrderBy('evento.nombre', sentido)
        break
      case 'descripcion':
        query.addOrderBy('evento.descripcion', sentido)
        break
      case 'lugar':
        query.addOrderBy('evento.lugar', sentido)
        break
      case 'fecha':
        query.addOrderBy('evento.fecha', sentido)
        break
      case 'enlace':
        query.addOrderBy('evento.enlace', sentido)
        break
      case 'maxparticipantes':
        query.addOrderBy('evento.maxparticipantes', sentido)
        break
      case 'idcategoria':
        query.addOrderBy('evento.idcategoria', sentido)
        break
      case 'estado':
        query.addOrderBy('evento.estado', sentido)
        break
      default:
        query.orderBy('evento.id', 'ASC')
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('evento.codigo like :filtro', { filtro: `%${filtro}%` })
          qb.orWhere('evento.nombre ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('evento.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('evento.grupo ilike :filtro', {
            filtro: `%${filtro}%`,
          })
        })
      )
    }
    return await query.getManyAndCount()
  }

  async listarPorGrupo(grupo: string) {
    return await this.dataSource
      .getRepository(Evento)
      .createQueryBuilder('evento')
      .select(['evento.id', 'evento.codigo', 'evento.nombre'])
      .where('evento.grupo = :grupo', {
        grupo,
      })
      .andWhere('evento.estado = :estado', {
        estado: Status.ACTIVE,
      })
      .getMany()
  }

  async buscarCodigo(codigo: string) {
    return this.dataSource
      .getRepository(Evento)
      .findOne({ where: { codigo: codigo } })
  }

  async crear(eventoDto: CrearEventoDto, usuarioAuditoria: string) {
    return await this.dataSource
      .getRepository(Evento)
      .save(new Evento({ ...eventoDto, usuarioCreacion: usuarioAuditoria }))
  }
}
