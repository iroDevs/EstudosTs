import { Model, DataTypes, type Sequelize } from 'sequelize'

class Usuario_Filme extends Model {
  
  
  static initTable (connection: Sequelize): void {
    this.init(
      {
        id_usuario: DataTypes.INTEGER,
        id_filme: DataTypes.INTEGER
      },
      {
        sequelize: connection,
        modelName: 'Usuario_Filme',
        tableName: 'usuario_filme'
      }
    )
  }
}

export default Usuario_Filme
