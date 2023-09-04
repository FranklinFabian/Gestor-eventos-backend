import { IsNotEmpty } from '../../../common/validation'
import { ApiProperty } from '@nestjs/swagger'

export class CrearEventoDto {
  @ApiProperty()
  @IsNotEmpty()
  codigo: string
  @ApiProperty()
  @IsNotEmpty()
  nombre: string
  @ApiProperty()
  @IsNotEmpty()
  descripcion: string
  @ApiProperty()
  @IsNotEmpty()
  lugar: string
  @ApiProperty()
  @IsNotEmpty()
  fecha: Date
  @ApiProperty()
  @IsNotEmpty()
  enlace: string
  @ApiProperty()
  @IsNotEmpty()
  maxparticipantes: string
  idcategoria: string
  @ApiProperty({ type: 'text', nullable: true })
  cartel?: string
  estado?: string
}
