import { IsNumberString } from 'class-validator'

export class ProdsIdDto {
  @IsNumberString()
  id: string
}
