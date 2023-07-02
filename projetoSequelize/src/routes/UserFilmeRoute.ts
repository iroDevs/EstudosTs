/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import UserFilmeController from '../controller/UserFilmeController'

console.log('dentro da route esta chegando')

const userFilmeRoute = express.Router()

userFilmeRoute.get('/', UserFilmeController.findAll)

userFilmeRoute.get('/:userId', UserFilmeController.findOne)

userFilmeRoute.post('/', UserFilmeController.create)

userFilmeRoute.delete('/:userId/:filmeId', UserFilmeController.delete)

export = userFilmeRoute
