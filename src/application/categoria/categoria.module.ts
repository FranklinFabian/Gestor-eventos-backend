import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Categoria } from './categoria.entity'
import { CategoriaRepository } from './categoria.repository'
import { CategoriaService } from './categoria.service'
import { CategoriaController } from './categoria.controller'

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository],
  imports: [TypeOrmModule.forFeature([Categoria])],
})
export class CategoriaModule {}
