import { ConsultaListaExamen } from './../_model/consultaListExamen';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable, ɵConsole } from '@angular/core';
import { Consulta } from '../_model/consulta';
import { ConsultaResumen } from '../_model/consultaResumen';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  url : string = `${HOST}/consultas`
  constructor(private http : HttpClient) { 

  }

  registrar (consultaDTO : ConsultaListaExamen){
    return this.http.post(this.url , consultaDTO);
  }
  buscar(filtroConsulta : any){
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta);
  }
  listarResumen(){
     return this.http.get<ConsultaResumen[]>(`${this.url}/listarResumen`)
  }
  generarReporte(){
    return this.http.get(`${this.url}/generarReporte`,{
      responseType : 'blob'
    });
  }

  guardarArchivo( data : File){
    
    let formdata = new FormData();
    formdata.append( 'file' , data);
    console.log(typeof(formdata));
    return this.http.post(`${this.url}/guardarArchivo` , formdata , {
      responseType : 'text'
    })
  }

  leerArchivo(){
    return this.http.get(`${this.url}/leerArchivo/1` , {
      responseType : 'blob'
    });
  }
}
