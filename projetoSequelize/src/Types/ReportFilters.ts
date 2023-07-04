import { type Filters } from './Filters'

export interface ReportFilters {
  filter: boolean
  onlyUsers: boolean
  filters: Filters
}
