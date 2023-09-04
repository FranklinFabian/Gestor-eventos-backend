import { IsNotEmpty } from '../../../common/validation'
import { ApiProperty } from '@nestjs/swagger'

export class CrearCategoriaDto {
  @ApiProperty()
  @IsNotEmpty()
  categoria: string
  @ApiProperty()
  @IsNotEmpty()
  descripcion: string
  @ApiProperty({ type: 'text', nullable: true })
  cartel?: string
  estado?: string
}
