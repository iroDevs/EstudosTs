/*
 const usuarioComFilmesFavoritos:  = {
          user: usuario.toJSON(),
          FilmesFavoritos: filmes.map(filme => ({
            titulo: filme.titulo,
            nota: filme.nota,
            diretor: filme.diretor
          }))
        }

*/

import { type Filme } from './Filme'
import { type User } from './User'

export interface UsuarioComFilmesFavoritos {
  user?: User
  FilmesFavoritos?: Filme[]
}
