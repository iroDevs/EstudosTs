import { type ResponseDto } from '../Types/ResponseDto'
import { type User } from '../Types/User'
import Usuario from '../database/models/Usuario'
import MathLogic from './logic/MathLogic'

class UserService {
  private readonly user: User

  constructor (user: User) {
    this.user = user
  }

  static async getAllUsers (page: number, limit: number): Promise<ResponseDto<User> | ResponseDto<Usuario[]>> {
    let user: Usuario[]
    try {
      if ((limit === 0 && page === 0) || (isNaN(page) || isNaN(limit))) {
        user = await Usuario.findAll()
      } else {
        const offset = MathLogic.getOffsetValue(Number(page), Number(limit))
        user = await Usuario.findAll({ limit: limit - 1, offset })
      }

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

  static async deleteUser (id: number): Promise<ResponseDto<User>> {
    const user = await Usuario.destroy({ where: { id } })

    if (user !== 0) {
      return {
        status: 200,
        message: 'Usuario deletado com sucesso'
      }
    }
    return {
      status: 404,
      message: 'Usuario não encontrado'
    }
  }

  static async getUserById (id: number): Promise<ResponseDto<User>> {
    const user = await Usuario.findByPk(id)

    if (user != null) {
      return {
        status: 200,
        message: 'Usuario encontrado com sucesso',
        data: user.toJSON()
      }
    }
    return {
      status: 404,
      message: 'Usuario não encontrado'
    }
  }

  public async UpdateUser (id: number): Promise<ResponseDto<User>> {
    try {
      const existingUser = await Usuario.findByPk(id)

      if (existingUser != null) {
        await Usuario.update(this.user, { where: { id } })

        return {
          status: 200,
          message: 'Usuário atualizado',
          data: this.user
        }
      } else {
        return {
          status: 404,
          message: 'Usuário não encontrado'

        }
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Erro ao atualizar o usuário'
      }
    }
  }

  public async SaveUser (): Promise<ResponseDto<User>> {
    const isValid = this.validateUser()
    if (isValid) {
      try {
        const saveNewUser = {
          nome: this.user.nome,
          idade: this.user.idade
        }

        const [user, created] = await Usuario.findOrCreate({
          where: {
            nome: this.user.nome
          },
          defaults: saveNewUser
        })

        if (created) {
          return {
            status: 200,
            message: 'Usuário criado',
            data: user.toJSON()
          }
        } else {
          return {
            status: 409,
            message: 'Usuário já existe',
            data: user.toJSON()
          }
        }
      } catch (error) {
        return {
          status: 501,
          message: error,
          data: this.user
        }
      }
    } else {
      return {
        status: 400,
        message: 'Usuário não criado',
        data: this.user
      }
    }
  }

  private validateUser (): boolean {
    if (this.user.nome.length > 300) {
      return false
    }

    if (this.user.idade > 180) {
      return false
    }
    return true
  }
}

export default UserService
