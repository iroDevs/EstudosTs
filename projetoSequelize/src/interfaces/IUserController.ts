import { type Request, type Response } from 'express'

interface UserControllerInterface {
  findAll: (req: Request, res: Response) => Promise<Response>
  findOne: (req: Request, res: Response) => Promise<Response>
  create: (req: Request, res: Response) => Promise<Response>
  update: (req: Request, res: Response) => Promise<Response>
  delete: (req: Request, res: Response) => Promise<Response>
}

export default UserControllerInterface
