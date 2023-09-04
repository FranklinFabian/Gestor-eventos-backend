/* eslint-disable prettier/prettier */
import { BaseService } from '../../common/base/base-service'
import {
  Inject,
  Injectable,
} from '@nestjs/common'
import { FiltrosCategoriaDto } from '../categoria/dto/filtros-categoria.dto'
import { PrincipalRepository } from './principal.repository'
import { PaginacionQueryDto } from 'src/common/dto/paginacion-query.dto'

@Injectable()
export class PrincipalService extends BaseService {
  constructor(
    @Inject(PrincipalRepository)
    private principalRepositorio: PrincipalRepository
  ) {
    super()
  }

  async listarcategorias(paginacionQueryDto: FiltrosCategoriaDto) {
    return await this.principalRepositorio.listarcartegorias(paginacionQueryDto)
  }

  async listareventos(paginacionQueryDto: PaginacionQueryDto) {
    return await this.principalRepositorio.listareventos(paginacionQueryDto)
  }

}