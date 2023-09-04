import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from '../../../common/validation'

export class ActualizarEventoDto {
  @IsNotEmpty()
  codigo: string
  @IsNotEmpty()
  nombre: string
  @IsNotEmpty()
  descripcion: string
  lugar: string
  fecha: Date
  enlace: string
  maxparticipantes: string
  idcategoria: string
  @ApiProperty({ type: 'text', nullable: true })
  cartel?: string
  estado?: string
}
