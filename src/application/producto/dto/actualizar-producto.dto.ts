import { IsNotEmpty } from '../../../common/validation'

export class ActualizarProductoDto {
  @IsNotEmpty()
  nombre: string
  @IsNotEmpty()
  cantidad: string
  @IsNotEmpty()
  precio: string
  estado?: string
}
