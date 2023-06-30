"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const database_js_1 = require("../config/database.js");
const Usuario_1 = require("./models/Usuario");
const Filme_1 = require("./models/Filme");
class Connection {
    constructor() {
        this.connection = new sequelize_typescript_1.Sequelize(database_js_1.default);
        this.index();
    }
    index() {
        Usuario_1.default.initTable(this.connection);
        Filme_1.default.initTable(this.connection);
    }
    getConection() {
        return this.connection;
    }
}
exports.default = new Connection();
