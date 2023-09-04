import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { PrincipalService } from './principal.service'
import { PrincipalRepository } from './principal.repository'
import { PrincipalController } from './principal.controller'

@Module({
  controllers: [PrincipalController],
  providers: [PrincipalService, PrincipalRepository],
})
export class PrincipalModule {}
