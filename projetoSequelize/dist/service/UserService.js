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
const Usuario_1 = require("../database/models/Usuario");
const MathLogic_1 = require("./logic/MathLogic");
class UserService {
    constructor(user) {
        this.user = user;
    }
    static getAllUsers(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            try {
                if ((limit === 0 && page === 0) || (isNaN(page) || isNaN(limit))) {
                    user = yield Usuario_1.default.findAll();
                }
                else {
                    const offset = MathLogic_1.default.getOffsetValue(Number(page), Number(limit));
                    user = yield Usuario_1.default.findAll({ limit: limit - 1, offset });
                }
                return {
                    status: 200,
                    message: 'Usuarios encontrados',
                    data: user
                };
            }
            catch (error) {
                return {
                    status: 500,
                    message: error
                };
            }
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Usuario_1.default.destroy({ where: { id } });
            if (user !== 0) {
                return {
                    status: 200,
                    message: 'Usuario deletado com sucesso'
                };
            }
            return {
                status: 404,
                message: 'Usuario não encontrado'
            };
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Usuario_1.default.findByPk(id);
            if (user != null) {
                return {
                    status: 200,
                    message: 'Usuario encontrado com sucesso',
                    data: user.toJSON()
                };
            }
            return {
                status: 404,
                message: 'Usuario não encontrado'
            };
        });
    }
    UpdateUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield Usuario_1.default.findByPk(id);
                if (existingUser != null) {
                    yield Usuario_1.default.update(this.user, { where: { id } });
                    return {
                        status: 200,
                        message: 'Usuário atualizado',
                        data: this.user
                    };
                }
                else {
                    return {
                        status: 404,
                        message: 'Usuário não encontrado'
                    };
                }
            }
            catch (error) {
                return {
                    status: 500,
                    message: 'Erro ao atualizar o usuário'
                };
            }
        });
    }
    SaveUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const isValid = this.validateUser();
            if (isValid) {
                try {
                    const saveNewUser = {
                        nome: this.user.nome,
                        idade: this.user.idade
                    };
                    const [user, created] = yield Usuario_1.default.findOrCreate({
                        where: {
                            nome: this.user.nome
                        },
                        defaults: saveNewUser
                    });
                    if (created) {
                        return {
                            status: 200,
                            message: 'Usuário criado',
                            data: user.toJSON()
                        };
                    }
                    else {
                        return {
                            status: 409,
                            message: 'Usuário já existe',
                            data: user.toJSON()
                        };
                    }
                }
                catch (error) {
                    return {
                        status: 501,
                        message: error,
                        data: this.user
                    };
                }
            }
            else {
                return {
                    status: 400,
                    message: 'Usuário não criado',
                    data: this.user
                };
            }
        });
    }
    validateUser() {
        if (this.user.nome.length > 300) {
            return false;
        }
        if (this.user.idade > 180) {
            return false;
        }
        return true;
    }
}
exports.default = UserService;
