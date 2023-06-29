import { Model, DataTypes, type Sequelize } from 'sequelize'

class Filme extends Model {
  public id!: number
  public titulo!: string
  public diretor!: string
  public nota!: number

  static associate (models): void {
    this.belongsToMany(models.Usuario, { foreignKey: 'filme_id', through: 'usuarios_filmes', as: 'filmes' })
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

export default Filme
