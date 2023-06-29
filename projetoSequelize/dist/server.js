"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const UserRoute_1 = require("./routes/UserRoute");
const database_1 = require("./database");
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.index();
    }
    index() {
        this.express.use(express_1.default.json());
        this.express.use((0, cors_1.default)());
        this.express.listen(3333, () => {
            console.log('rodando');
        });
        this.route();
        this.dataBase();
    }
    middleware() {
    }
    dataBase() {
        database_1.default.getConection();
    }
    route() {
        this.express.use('/api/user', UserRoute_1.default);
    }
}
exports.default = new App();
