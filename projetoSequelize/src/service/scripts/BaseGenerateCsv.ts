/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createObjectCsvWriter } from 'csv-writer'
import { type HeaderReportcsv } from '../../Types/HeaderReportcsv'
import type Usuario from '../../database/models/Usuario'
import { v4 as uuidv4 } from 'uuid'

/*
const createCsvWriter = createObjectCsvWriter

function teste (): void {
  const csvWriter = createCsvWriter({
    path: './src/service/scripts/exports/csv/file.csv',
    header: [
      { id: 'name', title: 'NAME' },
      { id: 'lang', title: 'LANGUAGE' }
    ]
  })

  const records = [
    { name: 'Bob', lang: 'French, English' },
    { name: 'Mary', lang: 'English' }
  ]

  void csvWriter.writeRecords(records) // returns a promise
    .then(() => {
      console.log('...Done')
    })
}

export default teste
*/

class BaseGenerateCsv {
  private readonly createCsvWriter: any
  private readonly path: string
  private readonly headers: HeaderReportcsv[]
  private readonly records: any[]

  constructor (headers: HeaderReportcsv[], records: Usuario[]) {
    this.createCsvWriter = createObjectCsvWriter
    this.path = `./src/service/scripts/exports/csv/file_${uuidv4()}.csv`
    this.headers = headers
    this.records = records
  }

  public async generateFileCsv (): Promise<string> {
    const csvWriter = this.createCsvWriter({
      path: this.path,
      header: this.headers
    })

    await csvWriter.writeRecords(this.records)

    return this.path
  }

  static createBodyToCsv (header: any, records: any): any {
    const transformedRecords = records.map((record) => {
      return header.reduce((acc, { id }) => {
        acc[id] = record[id]
        return acc
      }, {})
    })
    return transformedRecords
  }
}

export default BaseGenerateCsv
