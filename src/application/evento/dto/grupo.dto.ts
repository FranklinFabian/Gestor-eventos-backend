import { IsNotEmpty, IsString, Length } from '../../../common/validation'

export class EventGrupoDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  grupo: string
}
