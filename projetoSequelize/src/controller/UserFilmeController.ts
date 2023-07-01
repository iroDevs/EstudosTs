import { type Request, type Response } from 'express'
import type IUserController from '../interfaces/IUserController'
import UserFilmeService from '../service/UsuarioFilmeService'

class UserFilmeController implements IUserController {
  public async findAll (req: Request, res: Response): Promise<Response> {
    return res.status(300).json({})
  }

  public async findOne (req: Request, res: Response): Promise<Response> {
    const { userId } = req.params

    const response = await UserFilmeService.getFavoritesMoviesByIdUser(Number(userId))

    return res.status(response.status).json(response)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { usuario_id: userID, filme_id: filmeID } = req.body
    const userService = new UserFilmeService(userID, filmeID)
    const response = await userService.addMovieToUser()

    return res.status(response.status).json(response)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    return res.status(300).json({})
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    return res.status(300).json({})
  }
}

export default new UserFilmeController()
