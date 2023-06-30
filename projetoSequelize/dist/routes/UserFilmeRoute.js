"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const userFilmeRoute = express_1.default.Router();
userFilmeRoute.get('/', UserController.findAll);
userFilmeRoute.get('/:id', UserController.findOne);
userFilmeRoute.post('/', UserController.create);
userFilmeRoute.put('/:id', UserController.update);
userFilmeRoute.delete('/:id', UserController.delete);
module.exports = userFilmeRoute;
