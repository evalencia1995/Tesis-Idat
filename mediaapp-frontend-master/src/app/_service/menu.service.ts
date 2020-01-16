import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HOST, TOKEN_NAME } from './../_shared/var.constants';
import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuCambio = new Subject<Menu[]>();
  url : string = `${HOST}`;


  constructor(private http : HttpClient) { }

  listar(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Menu[]>(`${this.url}/menus` , {
      headers : new HttpHeaders().set('Authorization' , `bearer ${access_token}`).set('Content-type' , 'applicantion/json')
    });

  }
  listarPorUsuario(nombre : string){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Menu[]>(`${this.url}/menus/usuario` , nombre, {
      headers : new HttpHeaders().set('Authorization' , `bearer ${access_token}`).set('Content-type' , 'application/json')
    });
  }
}
