import { IsNumberString } from 'class-validator'

export class PartsIdDto {
  @IsNumberString()
  id: string
}
