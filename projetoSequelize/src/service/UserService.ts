
import { type Filme } from '../Types/Filme'
import { type ResponseDto } from '../Types/ResponseDto'
import { type User } from '../Types/User'
import Usuario from '../database/models/Usuario'

class UserService {
  private readonly user: User
  private readonly filmesFavoritos: Filme[]

  constructor (user: User) {
    this.user = user
    this.filmesFavoritos = user.filmesFavoritos
  }

  public async SaveUser (): Promise<ResponseDto<User>> {
    const isValid = this.validateUser()
    if (isValid) {
      try {
        const saveNewUser = {
          nome: this.user.nome,
          idade: this.user.idade
        }
        console.log(saveNewUser)

        await Usuario.create(saveNewUser)
        return {
          status: 200,
          message: 'usuairo criado',
          data: this.user
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
        message: 'usuairo não criado criado',
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
