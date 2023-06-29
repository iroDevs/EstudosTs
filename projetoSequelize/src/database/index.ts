import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/database'

class Connection {
  private readonly connection: Sequelize
  constructor () {
    this.connection = new Sequelize(dbConfig)
    this.index()
  }

  public index (): void {
    // inicia os modelos;
  }

  public getConection (): Sequelize {
    return this.connection
  }
}

export default new Connection()
