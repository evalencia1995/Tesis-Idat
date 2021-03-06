import { ConsultaListaExamen } from './../../_model/consultaListExamen';
import { Consulta } from './../../_model/consulta';
import { ExamenService } from 'src/app/_service/examen.service';
import { Examen } from './../../_model/examen';
import { MedicoService } from 'src/app/_service/medico.service';
import { Medico } from './../../_model/medico';
import { Especialidad } from 'src/app/_model/especialidad';
import { EspecialidadService } from './../../_service/especialidad.service';
import { PacienteService } from './../../_service/paciente.service';
import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/_model/paciente';
import { DetalleConsulta } from 'src/app/_model/detallaConsulta';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  pacientes : Paciente[] = [];
  especialidades : Especialidad[] = [];
  medicos : Medico[] = [];
  examenes : Examen[] = [];

  idPacienteSeleccionado : number;
  idEspecialidadSeleccionado : number;
  idMedicoSeleccionado: number;
  idExamenSeleccionado: number;


  fechaSeleccionada : Date;
  maxFecha : Date = new Date();

  diagnostico : string;
  tratamiento: string;
  mensaje : string;

  detalleConsulta : DetalleConsulta[] = [];
  examenesSeleccionados: Examen[] =[];

  constructor(private examenService :ExamenService,private consultaService : ConsultaService,private medicoService : MedicoService , private pacienteService:PacienteService , private especialidadService : EspecialidadService ,private snackBar : MatSnackBar) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecialidad();
    this.listarMedicos();
    this.listarExamenes();
  }

  listarPacientes(){
    this.pacienteService.listar().subscribe(data =>{
      this.pacientes = data;
    });
  }
  listarEspecialidad(){
    this.especialidadService.listar().subscribe(data =>{
      this.especialidades = data;
    });
  }
  listarExamenes(){
    this.examenService.listar().subscribe(data =>{
      this.examenes = data;
    });
  }
  listarMedicos(){
    this.medicoService.listar().subscribe(data =>{
      this.medicos = data;
    });
  }

  agregar(){
    if(this.diagnostico != null && this.tratamiento != null){
      let det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);
      this.diagnostico = null;
      this.tratamiento = null;
    }else{
      this.mensaje = 'Debe agregar un diagnostico y tratamiento';
      this.snackBar.open(this.mensaje,"Aviso" , {duration:2000});
    }

  }
  agregarExamen(){
    if(this.idExamenSeleccionado > 0){

      let cont =0;
      for (let i = 0; i < this.examenesSeleccionados.length; i++) {
        let examen = this.examenesSeleccionados[i];
        if(examen.idExamen === this.idExamenSeleccionado){
          cont++;
          break;
        }
        
      }
      if(cont > 0){
        this.mensaje ='El mensaje se encuentra en la lista';
        this.snackBar.open(this.mensaje,"Aviso" , {duration: 2000});
      }else{
        let ex = new Examen();
        ex.idExamen = this.idExamenSeleccionado;
        this.examenService.listarporId(this.idExamenSeleccionado).subscribe(data =>{
          ex.nombre = data.nombre
          this.examenesSeleccionados.push(ex);
        });
      }
    }else{
      this.mensaje = 'Debe agregar un examen';
      this.snackBar.open(this.mensaje,"Aviso",{duration : 2000});
    }

    
  }
  aceptar(){
    let medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;
    let especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;
    let paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    let consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.paciente = paciente;
    consulta.medico = medico;

    //consulta.fecha = this.fechaSeleccionada;
    // let tzoffset = (this.fechaSeleccionada).getTimezoneOffset() * 60000;
    // let localISOTime = (new Date(Date.now() - tzoffset)).toISOString();
    // consulta.fecha = localISOTime;

    //ver captura de hora
    consulta.fecha = moment(this.fechaSeleccionada).toISOString();

    consulta.detalleConsulta = this.detalleConsulta;

    let consultaListaExamen = new ConsultaListaExamen();

    consultaListaExamen.consulta = consulta;
    consultaListaExamen.lstExamen = this.examenesSeleccionados;
    
    this.consultaService.registrar(consultaListaExamen).subscribe(()=>{
      this.snackBar.open('Se registro' , 'AVISO' , {duration :2000})
      setTimeout(() => {
        this.limparControles();  
      }, 2000);
      
    });

  }
  removerDiagnostico( index : number){
    this.detalleConsulta.splice(index, 1);
  }
  removerExamen(index:number){
    this.examenesSeleccionados.splice(index,1);
  }
  estadoBotonRegistrar(){
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 || this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0);
  }
  limparControles(){
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = "";
    this.tratamiento = "";
    this.idPacienteSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
    this.mensaje = '';
  }

}
