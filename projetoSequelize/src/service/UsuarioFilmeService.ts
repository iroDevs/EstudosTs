/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ResponseDto } from '../Types/ResponseDto'
import UsuarioFilme from '../database/models/UsuarioFilme'
import Filme from '../database/models/Filme'
import { type UserMoviesFavorite } from '../Types/UserMoviesFavorite'
import Connection from '../database'
import Usuario from '../database/models/Usuario'

class UserFilmeService {
  private readonly idUser: number
  private readonly idFilme: number

  constructor (idUser: number, idFilme: number) {
    this.idFilme = idFilme
    this.idUser = idUser
  }

  static async getFavoritesMoviesByIdUser (idUser: number): Promise<ResponseDto<UserMoviesFavorite>> {
    const sequelize = Connection.getConection()
    const transaction = await sequelize.transaction()

    try {
      const IdsOfFilmesAndUser = await UsuarioFilme.findAll({ where: { id_usuario: idUser } })
      const arrayIdsFilme = IdsOfFilmesAndUser.map(item => item.id_filme)
      const filmes = await Filme.findAll({ where: { id: arrayIdsFilme } })
      const usuario = await Usuario.findByPk(idUser)
      if (usuario == null) {
        return {
          status: 404,
          message: 'usuario não encontrado'
        }
      }
      const retorno = {
        status: 200,
        message: 'filmes favoritos encontrados',
        usuario: usuario.toJSON(),
        FilmesFavoritos: filmes.map(filme => ({
          titulo: filme.titulo,
          nota: filme.nota,
          diretor: filme.diretor
        }))
      }

      console.log('Filmes ? : ', filmes[0])
      await transaction.commit()

      return retorno
    } catch (error) {
      await transaction.rollback()

      return {
        status: 500,
        message: error

      }
    }
  }

  public async addMovieToUser (): Promise<ResponseDto<UserMoviesFavorite>> {
    const sequelize = Connection.getConection()
    const transaction = await sequelize.transaction()

    try {
      const [_, created] = await UsuarioFilme.findOrCreate({
        where: {
          id_usuario: this.idUser,
          id_filme: this.idFilme
        },
        defaults: { id_usuario: this.idUser, id_filme: this.idFilme }
      })

      if (created) {
        return {
          status: 200,
          message: 'Filme salvo como favorito'
        }
      } else {
        return {
          status: 400,
          message: 'Filme já é favorito desse usuario'
        }
      }
    } catch (error) {
      await transaction.rollback()

      return {
        status: 500,
        message: error

      }
    }
  }
}

export default UserFilmeService
