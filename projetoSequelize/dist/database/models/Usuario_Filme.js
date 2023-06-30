"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Usuario_Filme extends sequelize_1.Model {
    static initTable(connection) {
        this.init({
            id_usuario: sequelize_1.DataTypes.INTEGER,
            id_filme: sequelize_1.DataTypes.INTEGER
        }, {
            sequelize: connection,
            modelName: 'Usuario_Filme',
            tableName: 'usuario_filme'
        });
    }
}
exports.default = Usuario_Filme;
