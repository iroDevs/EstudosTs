import BaseGenerateCsv from '../BaseGenerateCsv'
import UsuarioFilmeService from '../../UsuarioFilmeService'
import { Op } from 'sequelize'

class AllUsersMoviesCsv {
  private readonly Headers

  constructor () {
    this.Headers = [
      { id: 'nome', title: 'Nome' },
      { id: 'idade', title: 'Idade' },
      { id: 'FilmesFavoritos', title: 'Filmes Favoritos' },
      { id: 'createdAt', title: 'Criado Em' },
      { id: 'updatedAt', title: 'Atualizado Em' }]
  }

  private formatObjectResponse (response: any[]): any[] {
    return response.map((obj) => {
      const filmesFavoritos = obj.FilmesFavoritos.map((filme) => filme.titulo).join(', ')
      return { ...obj, FilmesFavoritos: filmesFavoritos }
    })
  }

  private makeQueryUser (filtersUser: any): any {
    const retorno = {
      where: {
        [Op.and]: [
          { idade: {[Op.gt]: filtersUser.idadeMaxima } },
          { nome: { [Op.startsWith]: filtersUser.NomeContendo } }
        ]
      }
    }
    return retorno
  }

  public async generateCsv (filters): Promise<string> {
    console.log(filters)
    const queryUser = this.makeQueryUser(filters)
    const data = await UsuarioFilmeService.getAllUsersWithFavorites(filters, queryUser)
    const csvBody = this.formatObjectResponse(data.data)
    const records = BaseGenerateCsv.createBodyToCsv(this.Headers, csvBody)
    const csv = new BaseGenerateCsv(this.Headers, records)
    const path = await csv.generateFileCsv()

    /* const data = await UsuarioFilmeService.getAllUsersWithFavorites()
    const csvBody = this.formatObjectResponse(data.data)
    const records = BaseGenerateCsv.createBodyToCsv(this.Headers, csvBody)
    const csv = new BaseGenerateCsv(this.Headers, records)
    const path = await csv.generateFileCsv() */

    return path
  }
}

export default AllUsersMoviesCsv
