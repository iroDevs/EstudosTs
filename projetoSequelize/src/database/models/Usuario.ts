import { Model, DataTypes, type Sequelize } from 'sequelize'

class Usuario extends Model {
  static associate (models): void {
    this.belongsToMany(models.Filme, { foreignKey: 'usuario_id', through: 'usuarios_filmes', as: 'usuario_like' })
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
