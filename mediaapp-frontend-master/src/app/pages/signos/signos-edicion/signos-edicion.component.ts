import { PacienteService } from "src/app/_service/paciente.service";
import { SignosService } from "src/app/_service/signos.service";
import { Signos } from "./../../../_model/signos";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Paciente } from "src/app/_model/paciente";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "app-signos-edicion",
  templateUrl: "./signos-edicion.component.html",
  styleUrls: ["./signos-edicion.component.css"]
})
export class SignosEdicionComponent implements OnInit {
  signos: Signos;
  form: FormGroup;
  edicion: boolean;
  id: number;
  fechaSeleccionada: Date = new Date();
  pacientes: Paciente[] = [];
  myControlPaciente: FormControl = new FormControl();
  filteredOptions: Observable<any[]>;
  pacienteSeleccionado: Paciente;

  constructor(
    private builder: FormBuilder,
    private signosService: SignosService,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) {}

  ngOnInit() {
    this.signos = new Signos();
    this.form = this.builder.group({
      id: new FormControl(0),
      paciente: this.myControlPaciente,
      fecha: new FormControl(new Date()),
      pulso: new FormControl(""),
      ritmo: new FormControl(""),
      temperatura: new FormControl("")
    });
    this.listarPacientes();
    this.filteredOptions = this.myControlPaciente.valueChanges.pipe(
      map(val => this.filter(val))
    );
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = this.id != null;
      this.initForm();
    });



  }
  //Pacientes
  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
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
  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }
  displayFn(val: Paciente) {
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }
  // --Pacientes
  initForm() {
    if (this.edicion) {
      this.signosService.listarPorId(this.id).subscribe(data => {
        //console.log(data);
        //console.log(this.myControlPaciente);
        this.myControlPaciente.setValue(data.paciente);
        //this.myControlPaciente.setValue(data.paciente);
        this.form = this.builder.group({
          id: new FormControl(data.idSignos),
          paciente : this.myControlPaciente.value,
          fecha: new FormControl(data.fecha),
          pulso: new FormControl(data.pulso),
          ritmo: new FormControl(data.ritmo),
          temperatura: new FormControl(data.temperatura)
        });
      });
    }
  }

  operar(){
    let signos = new Signos();
    signos.paciente = this.form.value["paciente"];
    signos.fecha = moment(this.fechaSeleccionada).toISOString();
    signos.pulso = this.form.value["pulso"];
    signos.ritmo = this.form.value["ritmo"];
    signos.temperatura = this.form.value["temperatura"];
    console.log(signos);
    if(this.edicion){
      this.signosService.modificar(signos).subscribe(()=>{
        this.signosService.listar().subscribe(data =>{
          this.signosService.signoCambio.next(data);
          this.signosService.mensajeCambio.next('SE MODIFICO');
        });
      });
    }else{
      this.signosService.registrar(signos).subscribe(()=>{
        this.signosService.listar().subscribe(data =>{
          this.signosService.signoCambio.next(data);
          this.signosService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['signos']);
  }
}
