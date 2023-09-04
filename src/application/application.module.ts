import { Module } from '@nestjs/common'
import { ParametroModule } from './parametro/parametro.module'
import { ProductoModule } from './producto/producto.module'
import { EventoModule } from './evento/evento.module'
import { CategoriaModule } from './categoria/categoria.module'
import { ParticipanteModule } from './participante/participante.module'
import { MulterModule } from '@nestjs/platform-express'
import { PrincipalModule } from './principal/evento.module'

@Module({
  imports: [
    MulterModule.register({
      dest: './carteles', // Directorio donde se guardarán las imágenes subidas
    }),
    ParametroModule,
    ProductoModule,
    EventoModule,
    CategoriaModule,
    ParticipanteModule,
    PrincipalModule,
  ],
})
export class ApplicationModule {}
