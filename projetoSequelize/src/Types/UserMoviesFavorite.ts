import { type Filme } from './Filme'

export interface UserMoviesFavorite {
  nome?: string
  idade?: number
  filmesFavoritos?: Filme[]
  message?: string
}
