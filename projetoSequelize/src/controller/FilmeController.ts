import { type Request, type Response } from 'express'
import type IUserController from '../interfaces/IUserController'
import FilmeService from '../service/FilmeService'
import { type Filme } from '../Types/Filme'

class FilmeController implements IUserController {
  public async findAll (req: Request, res: Response): Promise<Response> {
    const { page, size } = req.query

    const response = await FilmeService.getAllMovies(Number(page), Number(size))

    return res.status(response.status).json(response)
  }

  public async findOne (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response = await FilmeService.getUserById(Number(id))

    return res.status(response.status).json(response)
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const filme: Filme = req.body
    const filmeService = new FilmeService(filme)
    const response = await filmeService.SaveMovie()

    return res.status(response.status).json(response)
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const filme: Filme = req.body
    const filmeService = new FilmeService(filme)
    const response = await filmeService.UpdateMovie(Number(id))

    return res.status(response.status).json(response)
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const response = await FilmeService.deleteMovie(Number(id))

    return res.status(response.status).json(response)
  }
}

export default new FilmeController()
