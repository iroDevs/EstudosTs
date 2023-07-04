import { type ResponseDto } from '../Types/ResponseDto'
import { type ReportFilters } from '../Types/ReportFilters'
import AllUsersCsv from './scripts/ScriptsReports/AllUsers'
import AllUsersMoviesCsv from './scripts/ScriptsReports/AllUsersMoviesCsv'

class FilmeService {
  private readonly filters: ReportFilters

  constructor (filters: ReportFilters) {
    this.filters = filters
  }

  public async createReportDefault (): Promise<ResponseDto<string>> {
    const report = new AllUsersCsv()
    const path = await report.generateCsv()
    return {
      status: 200,
      message: 'arquivo gerado',
      data: path
    }
  }

  public async createReportComplete (filters): Promise<ResponseDto<string>> {
    const report = new AllUsersMoviesCsv()
    const path = await report.generateCsv(filters)
    return {
      status: 200,
      message: 'arquivo gerado',
      data: path
    }
  }
}

export default FilmeService
