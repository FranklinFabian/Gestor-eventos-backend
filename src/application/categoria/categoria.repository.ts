import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { Brackets, DataSource } from 'typeorm'
import { Categoria } from './categoria.entity'
import { Injectable } from '@nestjs/common'
import { Status } from '../../common/constants'
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto'
import { CrearCategoriaDto } from './dto/crear-categoria.dto'
import { FiltrosCategoriaDto } from '../parametro/dto/filtros-categoria.dto'
import { MulterFile } from './dto/multer-file.interface'

@Injectable()
export class CategoriaRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(Categoria)
      .createQueryBuilder('categoria')
      .where({ id: id })
      .getOne()
  }

  async actualizar(
    id: string,
    categoriaDto: ActualizarCategoriaDto,
    usuarioAuditoria: string
  ) {
    return await this.dataSource.getRepository(Categoria).update(
      id,
      new Categoria({
        ...categoriaDto,
        usuarioModificacion: usuarioAuditoria,
      })
    )
  }

  async listar(paginacionQueryDto: FiltrosCategoriaDto) {
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

  async listarimg(paginacionQueryDto: FiltrosCategoriaDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto
    const query = this.dataSource
      .getRepository(Categoria)
      .createQueryBuilder('categoria')
      .select([
        'categoria.id',
        'categoria.categoria',
        'categoria.descripcion',
        'categoria.estado',
        'categoria.cartel', // incluir el campo "cartel"
      ])
      .take(limite)
      .skip(saltar)
    return query.getManyAndCount()
  }

  async crear(categoriaDto: CrearCategoriaDto, usuarioAuditoria: string) {
    return await this.dataSource.getRepository(Categoria).save(
      new Categoria({
        ...categoriaDto,
        usuarioCreacion: usuarioAuditoria,
      })
    )
  }
}
