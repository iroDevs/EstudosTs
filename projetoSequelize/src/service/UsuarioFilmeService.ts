import { type ResponseDto } from '../Types/ResponseDto'

import Usuario from '../database/models/Usuario'
import Filme from '../database/models/Filme'
import { type UserMoviesFavorite } from '../Types/UserMoviesFavorite'
import Connection from '../database'

class UserFilmeService {
  private readonly idUser: number
  private readonly idFilme: number

  constructor (idUser: number, idFilme: number) {
    this.idFilme = idFilme
    this.idUser = idUser
  }

  public async addMovieToUser (): Promise<ResponseDto<UserMoviesFavorite>> {
    const sequelize = Connection.getConection()
    const transaction = await sequelize.transaction()

    try {
      const usuario = await Usuario.findByPk(this.idUser)
      const filme = await Filme.findByPk(this.idFilme)
      // bem aqui o erro
      await usuario.addFilme(filme, { transaction })

      await transaction.commit()

      return {
        status: 200,
        message: 'Filme adcionado como favorito'
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
