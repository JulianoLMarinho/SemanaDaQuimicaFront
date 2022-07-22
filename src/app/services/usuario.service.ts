import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/models/usuario';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpService) {}

  salvarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any, Usuario>('usuario', usuario);
  }

  atualizarUsuario(usuario: Usuario): Observable<boolean> {
    return this.http.put<boolean, Usuario>('usuario', usuario);
  }

  obterUsuarioLogado(): Observable<Usuario> {
    return this.http.get<Usuario>('usuario');
  }

  obterTodosUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('usuario/get-all');
  }

  alterarPerfilUsuario(usuarioId: number, perfilId: number): Observable<void> {
    return this.http.put(`usuario/perfil/${usuarioId}/${perfilId}`);
  }
}
