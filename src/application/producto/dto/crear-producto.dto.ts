import { IsString } from '../../../common/validation'

export class CrearProductoDto {
  @IsString()
  nombre: string

  @IsString()
  cantidad: string

  @IsString()
  precio: string

  estado?: string
}
