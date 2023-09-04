import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Brackets, DataSource } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { FiltrosCategoriaDto } from '../categoria/dto/filtros-categoria.dto'
import { Categoria } from '../categoria/categoria.entity'
import { Evento } from '../evento/evento.entity'

@Injectable()
export class PrincipalRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Evento)
      .createQueryBuilder('evento')
      .where({ id: id })
      .getOne()
  }

  async listarcartegorias(paginacionQueryDto: FiltrosCategoriaDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Categoria)
      .createQueryBuilder('categoria')
      .select([
        'categoria.id',
        'categoria.categoria',
        'categoria.descripcion',
        'categoria.cartel',
        'categoria.estado',
      ])
      .take(limite)
      .skip(saltar)

    switch (orden) {
      case 'categoria':
        query.addOrderBy('categoria.categoria', sentido)
        break
      case 'descripcion':
        query.addOrderBy('categoria.descripcion', sentido)
        break
      case 'estado':
        query.addOrderBy('categoria.estado', sentido)
        break
      default:
        query.orderBy('categoria.id', 'ASC')
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('categoria.categoria ilike :filtro', {
            filtro: `%${filtro}%`,
          })
          qb.orWhere('categoria.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          })
        })
      )
    }
    return await query.getManyAndCount()
  }

  async listareventos(paginacionQueryDto: PaginacionQueryDto) {
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
}
