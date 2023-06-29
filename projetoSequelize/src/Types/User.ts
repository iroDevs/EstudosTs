import { type Filme } from './Filme'

export interface User {
  nome: string
  idade: number
  filmesFavoritos: Filme[]
}
