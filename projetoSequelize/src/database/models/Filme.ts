import { Model, DataTypes, type Sequelize } from 'sequelize'

class Filme extends Model {
  public id!: number
  public titulo!: string
  public diretor!: string
  public nota!: number

  static associate (models): void {
    this.belongsToMany(models.Usuario, { foreignKey: 'id_filme', through: 'usuarios_filmes', as: 'usuarios' })
  }

  static initTable (connection: Sequelize): void {
    this.init(
      {
        titulo: DataTypes.STRING,
        diretor: DataTypes.STRING,
        nota: DataTypes.INTEGER
      },
      {
        sequelize: connection,
        modelName: 'Filme',
        tableName: 'filmes'
      }
    )
  }
}

export default Filme
