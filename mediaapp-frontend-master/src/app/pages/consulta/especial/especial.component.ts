import { ConsultaService } from "./../../../_service/consulta.service";
import { ConsultaListaExamen } from "./../../../_model/consultaListExamen";
import { Consulta } from "./../../../_model/consulta";
import { MatSnackBar } from "@angular/material";
import { MedicoService } from "./../../../_service/medico.service";
import { Medico } from "src/app/_model/medico";
import { FormControl, FormBuilder } from "@angular/forms";
import { Paciente } from "./../../../_model/paciente";
import { PacienteService } from "src/app/_service/paciente.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { EspecialidadService } from "src/app/_service/especialidad.service";
import { Especialidad } from "src/app/_model/especialidad";
import { ExamenService } from "src/app/_service/examen.service";
import { Examen } from "src/app/_model/examen";
import { DetalleConsulta } from "src/app/_model/detallaConsulta";
import * as moment from "moment";

@Component({
  selector: "app-especial",
  templateUrl: "./especial.component.html",
  styleUrls: ["./especial.component.css"]
})
export class EspecialComponent implements OnInit {
  form: FormGroup;
  myControlPaciente: FormControl = new FormControl();
  myControlMedico: FormControl = new FormControl();

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  detalleConsulta: DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  diagnostico: string;
  tratamiento: string;
  mensaje: string;
  
  filteredOptions: Observable<any[]>;
  filteredOptionsMedico: Observable<any[]>;

  examenSeleccionado: Examen;
  pacienteSeleccionado: Paciente;
  medicoSeleccionado: Medico;
  especialidadSeleccionada: Especialidad;

  constructor(
    private builder: FormBuilder,
    private pacienteService: PacienteService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      paciente: this.myControlPaciente,
      especialidad: new FormControl(),
      medico: this.myControlMedico,
      fecha: new FormControl(new Date()),
      diagnostico: new FormControl(""),
      tratamiento: new FormControl("")
    });
    this.listarPacientes();
    this.listarEspecialidades();
    this.listarMedicos();
    this.listarExamenes();
    this.filteredOptions = this.myControlPaciente.valueChanges.pipe(
      map(val => this.filter(val))
    );
    this.filteredOptionsMedico = this.myControlMedico.valueChanges.pipe(
      map(val => this.filterMedico(val))
    );
  }
  filter(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(
        option =>
          option.nombres
            .toLocaleLowerCase()
            .includes(val.nombres.toLowerCase()) ||
          option.apellidos
            .toLocaleLowerCase()
            .includes(val.apellidos.toLowerCase()) ||
          option.dni.includes(val.dni.toLowerCase())
      );
    } else {
      return this.pacientes.filter(
        option =>
          option.nombres.toLocaleLowerCase().includes(val.toLowerCase()) ||
          option.apellidos.toLocaleLowerCase().includes(val.toLowerCase()) ||
          option.dni.includes(val.toLowerCase())
      );
    }
  }
  filterMedico(val: any) {
    if (val != null && val.idMedico > 0) {
      return this.medicos.filter(
        option =>
          option.nombres
            .toLocaleLowerCase()
            .includes(val.nombres.toLowerCase()) ||
          option.apellidos
            .toLocaleLowerCase()
            .includes(val.apellidos.toLowerCase()) ||
          option.cmp.includes(val.dni.toLowerCase())
      );
    } else {
      return this.medicos.filter(
        option =>
          option.nombres.toLocaleLowerCase().includes(val.toLowerCase()) ||
          option.apellidos.toLocaleLowerCase().includes(val.toLowerCase()) ||
          option.cmp.includes(val.toLowerCase())
      );
    }
  }
  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }
  listarEspecialidades() {
    this.especialidadService.listar().subscribe(data => {
      this.especialidades = data;
    });
  }
  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data;
    });
  }
  listarExamenes() {
    this.examenService.listar().subscribe(data => {
      this.examenes = data;
    });
  }
  agregar() {
    if (this.diagnostico != null && this.tratamiento != null) {
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    } else {
      this.mensaje = "Debe agregar un diagnóstico y tratamiento";
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }
  agregarExamen() {
    if (this.examenSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if (examen.idExamen === this.examenSeleccionado.idExamen) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = "El Examen se encuentra en la lista";
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.examenesSeleccionados.push(this.examenSeleccionado);
      }
    } else {
      this.mensaje = "Debe agregar un Examen";
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }
  displayFn(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }
  displayFnMedico(val: Medico) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }
  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }
  seleccionarMedico(e: any) {
    this.medicoSeleccionado = e.option.value;
  }
  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }
  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }
  aceptar() {
    let consulta = new Consulta();
    consulta.paciente = this.form.value["paciente"]; // this.pacienteSeleccionado
    consulta.especialidad = this.form.value["especialidad"];
    consulta.medico = this.form.value["medico"];
    consulta.detalleConsulta = this.detalleConsulta;
    consulta.fecha = moment(this.fechaSeleccionada).toISOString();
    let consultaListExamen = new ConsultaListaExamen();
    consultaListExamen.consulta = consulta;
    consultaListExamen.lstExamen = this.examenesSeleccionados;
    this.consultaService.registrar(consultaListExamen).subscribe(() => {
      this.snackBar.open("Se registro", "AVISO", { duration: 2000 });
      setTimeout(() => {
        this.limparControles();
      }, 2000);
    });
  }
  limparControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = "";
    this.tratamiento = "";
    this.pacienteSeleccionado = null;
    this.especialidadSeleccionada = null;
    this.medicoSeleccionado = null;
    this.examenSeleccionado = null;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = "";
  }
  estadoBotonRegistrar() {
    return (
      this.detalleConsulta.length === 0 ||
      this.pacienteSeleccionado === null ||
      this.especialidadSeleccionada === null ||
      this.medicoSeleccionado === null ||
      this.examenSeleccionado == null
    );
  }
}
