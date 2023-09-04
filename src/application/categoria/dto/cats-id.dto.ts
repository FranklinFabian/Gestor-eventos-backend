import { IsNumberString } from 'class-validator'

export class CatsIdDto {
  @IsNumberString()
  id: string
}
