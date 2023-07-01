import { Model, DataTypes, type Sequelize } from 'sequelize'

class UsuarioFilme extends Model {
  public id_usuario!: number
  public id_filme!: number

  static initTable (connection: Sequelize): void {
    this.init(
      {
        id_usuario: DataTypes.INTEGER,
        id_filme: DataTypes.INTEGER
      },
      {
        sequelize: connection,
        modelName: 'UsuarioFilme',
        tableName: 'usuarios_filmes'
      }
    )
  }
}

export default UsuarioFilme
