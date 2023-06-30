/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'


const userFilmeRoute = express.Router()

userFilmeRoute.get('/', UserController.findAll)

userFilmeRoute.get('/:id', UserController.findOne)

userFilmeRoute.post('/', UserController.create)

userFilmeRoute.put('/:id', UserController.update)

userFilmeRoute.delete('/:id', UserController.delete)

export = userFilmeRoute
