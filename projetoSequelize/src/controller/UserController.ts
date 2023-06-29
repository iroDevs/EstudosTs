import { type Request, type Response } from 'express'

class UserController {
  public async findAll (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }

  public async findOne (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }

  public async create (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }

  public async update (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'User ta aqui' })
  }
}

export default new UserController()
