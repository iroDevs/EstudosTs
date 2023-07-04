/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import ReportController from '../controller/ReportController'

const reportRoute = express.Router()

reportRoute.post('/', ReportController.create)

export = reportRoute
