/* eslint-disable @typescript-eslint/no-unused-vars */
import { type ResponseDto } from '../Types/ResponseDto'
import UsuarioFilme from '../database/models/UsuarioFilme'
import Filme from '../database/models/Filme'
import { type UserMoviesFavorite } from '../Types/UserMoviesFavorite'
import Connection from '../database'
import Usuario from '../database/models/Usuario'
import { type UsuarioComFilmesFavoritos } from '../Types/UsuarioComFilmesFavoritos'
import UserService from './UserService'
import { type User } from '../Types/User'

class UserFilmeService {
  private readonly idUser: number
  private readonly idFilme: number

  constructor (idUser: number, idFilme: number) {
    this.idFilme = idFilme
    this.idUser = idUser
  }

  static async RemoveFavoriteMovieByUser (idUser: number, idFilme: number): Promise<ResponseDto<UserMoviesFavorite>> {
    try {
      await UsuarioFilme.destroy({ where: { id_usuario: idUser, id_filme: idFilme } })
      return {
        status: 200,
        message: 'filme removido com sucesso'
      }
    } catch (error) {
      return {
        status: 500,
        message: error
      }
    }
  }

  static async getUsersByFilter (query): Promise<ResponseDto<User> | ResponseDto<Usuario[]>> {
    let user: Usuario[]
    try {
      user = await Usuario.findAll(query)
      return {
        status: 200,
        message: 'Usuarios encontrados',
        data: user
      }
    } catch (error) {
      return {
        status: 500,
        message: error
      }
    }
  }

  static async getAllUsersWithFavorites (filter = false, query: any): Promise<ResponseDto<UserMoviesFavorite[]>> {
    const sequelize = Connection.getConection()
    const transaction = await sequelize.transaction()
    let usuarios: any | undefined
    try {
      if (!filter) {
        usuarios = (await UserService.getAllUsers(0, 0)).data
      } else {
        usuarios = (await UserService.getUsersByFilter(query)).data
      }
      const retorno: any = {
        status: 200,
        message: 'filmes favoritos e usuários encontrados',
        data: []
      }

      if (usuarios == null) {
        return {
          status: 404,
          message: 'não há usuarios na base de dados'
        }
      }
      for (const usuario of usuarios) {
        const IdsOfFilmesAndUser = await UsuarioFilme.findAll({ where: { id_usuario: usuario.id } })
        const arrayIdsFilme = IdsOfFilmesAndUser.map(item => item.id_filme)
        const filmes = await Filme.findAll({ where: { id: arrayIdsFilme } })

        const usuarioComFilmesFavoritos: any = {
          nome: usuario.nome,
          idade: usuario.idade,
          FilmesFavoritos: filmes.map(filme => ({
            titulo: filme.titulo,
            nota: filme.nota,
            diretor: filme.diretor
          }))
        }

        retorno.data.push(usuarioComFilmesFavoritos)
      }

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
