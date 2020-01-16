import { Injectable } from '@angular/core';
import { Signos } from '../_model/signos';
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignosService {

  signoCambio = new Subject<Signos[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = HOST;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Signos[]>(`${this.url}/signos`);
  }
  listarPageable(p: number, s:number){
    return this.http.get(`${this.url}/signos/pageable?page=${p}&size=${s}`);
  }

  listarPorId(idSignos: number) {
    return this.http.get<Signos>(`${this.url}/signos/${idSignos}`);
  }

  registrar(signos: Signos) {
    return this.http.post(`${this.url}/signos`, signos);
  }

  modificar(signos: Signos) {
    return this.http.put(`${this.url}/signos`, signos);
  }

  eliminar(idSignos: number) {
    return this.http.delete(`${this.url}/signos/${idSignos}`);
  }
}
