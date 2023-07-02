import { type Request, type Response } from 'express'
import type IUserController from '../interfaces/IUserController'
import UserFilmeService from '../service/UsuarioFilmeService'

class UserFilmeController implements IUserController {
  public async findAll (req: Request, res: Response): Promise<Response> {
    const response = await UserFilmeService.getAllUsersWithFavorites()

    return res.status(response.status).json(response)
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
    return res.status(10).json({ message: 'em desenvolvimento' })
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { userId, filmeId } = req.params

    const response = await UserFilmeService.RemoveFavoriteMovieByUser(Number(userId), Number(filmeId))

    return res.status(response.status).json(response)
  }
}

export default new UserFilmeController()
