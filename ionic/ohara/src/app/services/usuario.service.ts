import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  url: string = 'http://localhost:8087/api/v1/usuario';
  

  constructor(private httpClient: HttpClient) { }

  async salvar(usuario: Usuario): Promise<Usuario> {
    if (usuario.idUsuario === 0) {
      return await firstValueFrom(this.httpClient.post<Usuario>(this.url, JSON.stringify(usuario), this.httpHeaders));
    } else {
      return await firstValueFrom(this.httpClient.put<Usuario>(this.url, JSON.stringify(usuario), this.httpHeaders));
    }
  }

  async listar(): Promise<Usuario[]>{   
    return await firstValueFrom(this.httpClient.get<Usuario[]>(this.url));
  }
  
  async buscarPorId(id: number): Promise<Usuario> {
    let urlAuxiliar = this.url + "/" + id;    
    return await firstValueFrom(this.httpClient.get<Usuario>(urlAuxiliar));
  }

  async autenticar(email:string, senha: string): Promise<Usuario>{
    let urlAuxiliar = this.url + "/" + email + "/" + senha + "/autenticar";    
    return await firstValueFrom(this.httpClient.get<Usuario>(urlAuxiliar));
  }

  registrarAutenticacao(usuario: Usuario){
    localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario.idUsuario));
  }

  recuperarAutenticacao(): number{
    let idUsuario =  JSON.parse(localStorage.getItem('usuarioAutenticado') || "{}");
    return idUsuario;
  }

  encerrarAutenticacao(){
    localStorage.removeItem('usuarioAutenticado');
  }
}
