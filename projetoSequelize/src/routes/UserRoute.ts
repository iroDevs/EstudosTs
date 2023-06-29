/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import UserController from '../controller/UserController'

const userRoute = express.Router()

userRoute.get('/', UserController.findAll)

userRoute.get('/:id', UserController.findOne)

userRoute.post('/', UserController.create)

userRoute.put('/:id', UserController.update)

userRoute.delete('/:id', UserController.delete)

export = userRoute
