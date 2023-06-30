import { type Request, type Response } from 'express'
import type IUserController from '../interfaces/IUserController'
import { type User } from '../Types/User'
import UserService from '../service/UserService'

class UserController implements IUserController {
  private queryParamsExists (param): number {
    if (param === undefined) {
      return Number(param)
    }
    return 0
  }

  public async findAll (req: Request, res: Response): Promise<Response> {
    const { page, size } = req.query

    const response = await UserService.getAllUsers(Number(page), Number(size))

    return res.status(response.status).json(response)
  }

  public async findOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response = await UserService.getUserById(Number(id))

    return res.status(response.status).json(response)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const user: User = req.body
    const userService = new UserService(user)
    const response = await userService.SaveUser()

    return res.status(response.status).json(response)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const user: User = req.body
    const userService = new UserService(user)
    const response = await userService.UpdateUser(Number(id))

    return res.status(response.status).json(response)
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response = await UserService.deleteUser(Number(id))

    return res.status(response.status).json(response)
  }
}

export default new UserController()
