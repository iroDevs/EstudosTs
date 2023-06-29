import { type Request, type Response } from 'express'
import type IUserController from '../interfaces/IUserController'
import { type User } from '../Types/User'
import UserService from '../service/UserService'

class UserController implements IUserController {
  public async findAll (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }

  public async findOne (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const user: User = req.body
    const userService = new UserService(user)
    const response = await userService.SaveUser()

    return res.status(response.status).json(response)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }
}

export default new UserController()
