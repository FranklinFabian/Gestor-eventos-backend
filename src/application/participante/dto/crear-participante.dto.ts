import { IsNotEmpty } from '../../../common/validation'
import { ApiProperty } from '@nestjs/swagger'

export class CrearParticipanteDto {
  @ApiProperty()
  @IsNotEmpty()
  correo: string
  @IsNotEmpty()
  nombre: string
  //evento?: string
 // idcategoria?: string
  estado?: string
}
