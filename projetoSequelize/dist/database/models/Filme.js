"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Filme extends sequelize_1.Model {
    static associate(models) {
        this.belongsToMany(models.Usuario, { foreignKey: 'filme_id', through: 'usuarios_filmes', as: 'filmes' });
    }
    static initTable(connection) {
        this.init({
            nome: sequelize_1.DataTypes.STRING,
            idade: sequelize_1.DataTypes.INTEGER
        }, {
            sequelize: connection,
            modelName: 'Usuario',
            tableName: 'usuarios'
        });
    }
}
exports.default = Filme;
