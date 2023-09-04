import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductoService } from './service/producto.service'
import { ProductoRepository } from './repository/producto.repository'
import { Producto } from './entity/producto.entity'
import { ProductoController } from './controller/producto.controller'

@Module({
  exports: [ProductoService],
  controllers: [ProductoController],
  providers: [ProductoService, ProductoRepository],
  imports: [TypeOrmModule.forFeature([Producto])],
})
export class ProductoModule {}
