import { type Request, type Response } from 'express'
import ReportService from '../service/ReportService'
import { type ReportFilters } from '../Types/ReportFilters'

class ReportController {
  public async create (req: Request, res: Response): Promise<Response> {
    const filters: ReportFilters = req.body
    const service = new ReportService(filters)
    if (filters.onlyUsers) {
      const response = await service.createReportDefault()

      return res.status(response.status).json(response)
    }
    const response = await service.createReportComplete(filters.filters)

    return res.status(response.status).json(response)
  }
}

export default new ReportController()
