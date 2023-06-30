import express from 'express'
import cors from 'cors'
import userRoute from './routes/UserRoute'
import filmeRoute from './routes/FilmeRoute'
import userFilmeRoute from './routes/UserFilmeRoute'
import database from './database'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.index()
  }

  private index (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.listen(3333, () => {
      console.log('rodando')
    })
    this.route()
    this.dataBase()
  }

  private middleware (): void {
  }

  private dataBase (): void {
    database.getConection()
  }

  private route (): void {
    this.express.use('/api/user', userRoute)
    this.express.use('/api/filme', filmeRoute)
    this.express.use('/api/userFilme', userFilmeRoute)
  }
}

export default new App()
