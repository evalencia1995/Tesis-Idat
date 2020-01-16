import { ConsultaListaExamen } from './../_model/consultaListExamen';
import { Examen } from "./../_model/examen";
import { HttpClient } from "@angular/common/http";
import { HOST } from "./../_shared/var.constants";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ExamenService {
  examenCambio = new Subject<Examen[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Examen[]>(`${this.url}/examenes`);
  }
  listarporId(idExamen: number) {
    return this.http.get<Examen>(`${this.url}/examenes/${idExamen}`);
  }
  listarExamenPorConsulta(idExamen : number){
    return this.http.get<ConsultaListaExamen[]>(`${HOST}/consultaexamenes/${idExamen}`);
  }
  registrar(examen : Examen){
    return this.http.post(`${this.url}/examenes`,examen);
  }
  modificar(examen: Examen){
    return this.http.put(`${this.url}/examenes`,examen);
  }
  eliminar(idPaciente: number){
    return this.http.delete(`${this.url}/examenes/${idPaciente}`);
  }
}
