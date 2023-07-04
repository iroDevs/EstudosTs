import BaseGenerateCsv from '../BaseGenerateCsv'
import UserService from '../../UserService'

class AllUsersCsv {
  private readonly Headers

  constructor () {
    this.Headers = [
      { id: 'nome', title: 'Nome' },
      { id: 'idade', title: 'Idade' },
      { id: 'createdAt', title: 'Criado Em' },
      { id: 'updatedAt', title: 'Atualizado Em' }]
  }

  public async generateCsv (): Promise<string> {
    const csvBody: any = (await UserService.getAllUsers(0, 0)).data
    const records = BaseGenerateCsv.createBodyToCsv(this.Headers, csvBody)
    const csv = new BaseGenerateCsv(this.Headers, records)
    const path = await csv.generateFileCsv()

    return path
  }
}

export default AllUsersCsv
