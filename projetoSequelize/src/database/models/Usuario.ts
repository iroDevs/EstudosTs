import { Model, DataTypes, type Sequelize } from 'sequelize'

class Usuario extends Model {
  static associate (models): void {
    this.belongsToMany(models.Filme, { foreignKey: 'id_usuario', through: 'usuarios_filmes', as: 'filmes' })
  }

  static initTable (connection: Sequelize): void {
    this.init(
      {
        nome: DataTypes.STRING,
        idade: DataTypes.INTEGER
      },
      {
        sequelize: connection,
        modelName: 'Usuario',
        tableName: 'usuarios'
      }
    )
  }
}

export default Usuario
