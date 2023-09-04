import { Controller, Get, Query } from '@nestjs/common'

import { PaginacionQueryDto } from '../../common/dto/paginacion-query.dto'
import { BaseController } from '../../common/base/base-controller'
import { FiltrosCategoriaDto } from '../categoria/dto/filtros-categoria.dto'
import { PrincipalService } from './principal.service'

@Controller('principal')
export class PrincipalController extends BaseController {
  constructor(private principalService: PrincipalService) {
    super()
  }

  @Get('/categorias')
  async listarc(@Query() paginacionQueryDto: FiltrosCategoriaDto) {
    const result = await this.principalService.listarcategorias(
      paginacionQueryDto
    )
    return this.successListRows(result)
  }

  @Get('/eventos')
  async listar(@Query() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.principalService.listareventos(paginacionQueryDto)
    return this.successListRows(result)
  }
}
