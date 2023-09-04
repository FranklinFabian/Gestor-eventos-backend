import { BaseService } from '../../common/base/base-service'
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CategoriaRepository } from './categoria.repository'
import { CrearCategoriaDto } from './dto/crear-categoria.dto'
import { Messages } from '../../common/constants/response-messages'
import { Status } from '../../common/constants'
import { ActualizarCategoriaDto } from './dto/actualizar-categoria.dto'
import { FiltrosCategoriaDto } from '../parametro/dto/filtros-categoria.dto'
import { MulterFile } from './dto/multer-file.interface'
import { join } from 'path'
import { readFile } from 'fs/promises'

@Injectable()
export class CategoriaService extends BaseService {
  constructor(
    @Inject(CategoriaRepository)
    private categoriaRepositorio: CategoriaRepository
  ) {
    super()
  }

  async crear(categoriaDto: CrearCategoriaDto, usuarioAuditoria: string) {
    return await this.categoriaRepositorio.crear(categoriaDto, usuarioAuditoria)
  }

  async listar(paginacionQueryDto: FiltrosCategoriaDto) {
    return await this.categoriaRepositorio.listar(paginacionQueryDto)
  }

  async loadImageFromFile(nombreImagen: string): Promise<Buffer | null> {
    try {
      const imagePath = join(__dirname, '..', '..', 'carteles', nombreImagen) // Ruta ajustada
      const imageBuffer = await readFile(imagePath)
      console.log(imageBuffer)
      return imageBuffer
    } catch (error) {
      console.error(`Error loading image "${nombreImagen}":`, error)
      return null
    }
  }

  async actualizarDatos(
    id: string,
    categoriaDto: ActualizarCategoriaDto,
    usuarioAuditoria: string
  ) {
    const categoria = await this.categoriaRepositorio.buscarPorId(id)
    if (!categoria) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    await this.categoriaRepositorio.actualizar(
      id,
      categoriaDto,
      usuarioAuditoria
    )
    return { id }
  }

  async activar(idCategoria: string, usuarioAuditoria: string) {
    const categoria = await this.categoriaRepositorio.buscarPorId(idCategoria)
    if (!categoria) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const categoriaDto = new ActualizarCategoriaDto()
    categoriaDto.estado = Status.ACTIVE
    await this.categoriaRepositorio.actualizar(
      idCategoria,
      categoriaDto,
      usuarioAuditoria
    )
    return {
      id: idCategoria,
      estado: categoriaDto.estado,
    }
  }

  async inactivar(idCategoria: string, usuarioAuditoria: string) {
    const categoria = await this.categoriaRepositorio.buscarPorId(idCategoria)
    if (!categoria) {
      throw new NotFoundException(Messages.EXCEPTION_DEFAULT)
    }
    const categoriaDto = new ActualizarCategoriaDto()
    categoriaDto.estado = Status.INACTIVE
    await this.categoriaRepositorio.actualizar(
      idCategoria,
      categoriaDto,
      usuarioAuditoria
    )
    return {
      id: idCategoria,
      estado: categoriaDto.estado,
    }
  }
}
