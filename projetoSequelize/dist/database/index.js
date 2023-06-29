"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const database_1 = require("../config/database");
class Connection {
    constructor() {
        this.connection = new sequelize_typescript_1.Sequelize(database_1.default);
        this.index();
    }
    index() {
        // inicia os modelos;
    }
    getConection() {
        return this.connection;
    }
}
exports.default = new Connection();
