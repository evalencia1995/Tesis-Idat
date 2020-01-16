import { ActivatedRoute, Router, Params } from "@angular/router";
import { ExamenService } from "./../../../_service/examen.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Examen } from "./../../../_model/examen";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-examen-edicion",
  templateUrl: "./examen-edicion.component.html",
  styleUrls: ["./examen-edicion.component.css"]
})
export class ExamenEdicionComponent implements OnInit {
  examen: Examen;
  form: FormGroup;
  edicion: boolean;
  id: number;

  constructor(
    private examenService: ExamenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.examen = new Examen();
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl(""),
      descripcion: new FormControl("")
    });
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.edicion = this.id != null;
      this.initForm();
    });
  }
  initForm() {
    if(this.edicion){
      this.examenService.listarporId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          'id' : new FormControl(data.idExamen),
          'nombre' : new FormControl(data.nombre),
          'descripcion' : new FormControl(data.descripcion)
        });
      });
    }
  }

  operar(){
    this.examen.idExamen = this.form.value['id'];
    this.examen.nombre = this.form.value['nombre'];
    this.examen.descripcion = this.form.value['descripcion'];

    if(this.edicion){
      this.examenService.modificar(this.examen).subscribe(()=>{
        this.examenService.listar().subscribe(data =>{
          this.examenService.examenCambio.next(data);
          this.examenService.mensajeCambio.next('SE MODIFICO');
        });
      });
    }else{
      this.examenService.registrar(this.examen).subscribe(()=>{
        this.examenService.listar().subscribe(data =>{
          this.examenService.examenCambio.next(data);
          this.examenService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['examen']);
  }
}
