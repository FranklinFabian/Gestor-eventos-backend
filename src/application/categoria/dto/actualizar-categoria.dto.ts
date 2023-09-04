import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from '../../../common/validation'

export class ActualizarCategoriaDto {
  @IsNotEmpty()
  categoria: string
  @IsNotEmpty()
  descripcion: string
  @ApiProperty({ type: 'text', nullable: true })
  cartel?: string
  estado?: string
}
