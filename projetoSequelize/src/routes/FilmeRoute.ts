/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import FilmeController from '../controller/FilmeController'

const filmeRoute = express.Router()

filmeRoute.get('/', FilmeController.findAll)

filmeRoute.get('/:id', FilmeController.findOne)

filmeRoute.post('/', FilmeController.create)

filmeRoute.put('/:id', FilmeController.update)

filmeRoute.delete('/:id', FilmeController.delete)

export = filmeRoute
