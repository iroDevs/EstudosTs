"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../service/UserService");
class UserController {
    queryParamsExists(param) {
        if (param === undefined) {
            return Number(param);
        }
        return 0;
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, size } = req.query;
            const response = yield UserService_1.default.getAllUsers(Number(page), Number(size));
            return res.status(response.status).json(response);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield UserService_1.default.getUserById(Number(id));
            return res.status(response.status).json(response);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const userService = new UserService_1.default(user);
            const response = yield userService.SaveUser();
            return res.status(response.status).json(response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.body;
            const userService = new UserService_1.default(user);
            const response = yield userService.UpdateUser(Number(id));
            return res.status(response.status).json(response);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = yield UserService_1.default.deleteUser(Number(id));
            return res.status(response.status).json(response);
        });
    }
}
exports.default = new UserController();
