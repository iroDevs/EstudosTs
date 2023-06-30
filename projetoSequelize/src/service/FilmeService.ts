import { type ResponseDto } from '../Types/ResponseDto'
import { type Filme } from '../Types/Filme'
import FilmeModel from '../database/models/Filme'
import MathLogic from './logic/MathLogic'

class FilmeService {
  private readonly filme: Filme

  constructor (filme: Filme) {
    this.filme = filme
  }

  static async getAllMovies (page: number, limit: number): Promise<ResponseDto<FilmeModel> | ResponseDto<FilmeModel[]>> {
    let user: FilmeModel[]
    try {
      if ((limit === 0 && page === 0) || (isNaN(page) || isNaN(limit))) {
        user = await FilmeModel.findAll()
      } else {
        const offset = MathLogic.getOffsetValue(Number(page), Number(limit))
        user = await FilmeModel.findAll({ limit: limit - 1, offset })
      }

      return {
        status: 200,
        message: 'Filmes encontrados',
        data: user
      }
    } catch (error) {
      return {
        status: 500,
        message: error
      }
    }
  }

  static async deleteMovie (id: number): Promise<ResponseDto<Filme>> {
    const user = await FilmeModel.destroy({ where: { id } })

    if (user !== 0) {
      return {
        status: 200,
        message: 'Filme deletado com sucesso'
      }
    }
    return {
      status: 404,
      message: 'Filme não encontrado'
    }
  }

  static async getUserById (id: number): Promise<ResponseDto<Filme>> {
    const user = await FilmeModel.findByPk(id)

    if (user != null) {
      return {
        status: 200,
        message: 'Filme encontrado com sucesso',
        data: user.toJSON()
      }
    }
    return {
      status: 404,
      message: 'Filme não encontrado'
    }
  }

  public async UpdateMovie (id: number): Promise<ResponseDto<Filme>> {
    try {
      const existingUser = await FilmeModel.findByPk(id)

      if (existingUser != null) {
        await FilmeModel.update(this.filme, { where: { id } })

        return {
          status: 200,
          message: 'Filme atualizado',
          data: this.filme
        }
      } else {
        return {
          status: 404,
          message: 'Filme não encontrado'

        }
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Erro ao atualizar o Filme'
      }
    }
  }

  public async SaveMovie (): Promise<ResponseDto<Filme>> {
    const isValid = this.validateMovie()
    if (isValid) {
      try {
        const saveNewMovie = {
          titulo: this.filme.titulo,
          diretor: this.filme.diretor,
          nota: this.filme.nota
        }

        const [filme, created] = await FilmeModel.findOrCreate({
          where: {
            titulo: this.filme.titulo
          },
          defaults: saveNewMovie
        })

        if (created) {
          return {
            status: 200,
            message: 'Filme criado',
            data: filme.toJSON()
          }
        } else {
          return {
            status: 409,
            message: 'Filme já existe',
            data: filme.toJSON()
          }
        }
      } catch (error) {
        return {
          status: 501,
          message: error,
          data: this.filme
        }
      }
    } else {
      return {
        status: 400,
        message: 'Filme não criado',
        data: this.filme
      }
    }
  }

  private validateMovie (): boolean {
    if (this.filme.titulo.length > 300) {
      return false
    }

    if (this.filme.nota > 10) {
      return false
    }
    return true
  }
}

export default FilmeService
