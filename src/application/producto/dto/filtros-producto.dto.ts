import { Transform } from 'class-transformer'
import { PaginacionQueryDto } from '../../../common/dto/paginacion-query.dto'

export class FiltrosProductoDto extends PaginacionQueryDto {
  @Transform(({ value }) => (value ? value.split(',') : null))
  readonly rol?: Array<string>
}
