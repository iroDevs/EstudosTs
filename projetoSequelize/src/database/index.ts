import { Sequelize } from 'sequelize-typescript'
import dbConfig from '../config/database.js'
import Usuario from './models/Usuario'
import Filme from './models/Filme'
import UsuarioFilme from './models/UsuarioFilme'

class Connection {
  private readonly connection: Sequelize
  constructor () {
    this.connection = new Sequelize(dbConfig)
    this.index()
  }

  public index (): void {
    Usuario.initTable(this.connection)
    Filme.initTable(this.connection)
    UsuarioFilme.initTable(this.connection)
  }

  public getConection (): Sequelize {
    return this.connection
  }
}

export default new Connection()
