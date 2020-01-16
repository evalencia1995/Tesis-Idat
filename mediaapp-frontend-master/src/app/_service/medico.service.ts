import { Medico } from "./../_model/medico";
import { HttpClient } from "@angular/common/http";
import { HOST } from "./../_shared/var.constants";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class MedicoService {
  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  url: string = HOST;
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Medico[]>(`${this.url}/medicos`);
  }
  listarPorId(idMedico: number) {
    return this.http.get<Medico>(`${this.url}/medicos/${idMedico}`);
  }
  registrar(medico: Medico) {
    return this.http.post(`${this.url}/medicos`, medico);
  }
  modificar(medico: Medico) {
    return this.http.put(`${this.url}/medicos`, medico);
  }
  eliminar(idMedico: number) {
    return this.http.delete(`${this.url}/medicos/${idMedico}`);
  }
}
