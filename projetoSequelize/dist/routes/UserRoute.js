"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const userRoute = express_1.default.Router();
userRoute.get('/', UserController_1.default.findAll);
userRoute.get('/:id', UserController_1.default.findOne);
userRoute.post('/', UserController_1.default.create);
userRoute.put('/:id', UserController_1.default.update);
userRoute.delete('/:id', UserController_1.default.delete);
module.exports = userRoute;
