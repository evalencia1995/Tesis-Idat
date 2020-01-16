import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Especialidad } from "src/app/_model/especialidad";
import { EspecialidadService } from "src/app/_service/especialidad.service";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-especialidad-edicion",
  templateUrl: "./especialidad-edicion.component.html",
  styleUrls: ["./especialidad-edicion.component.css"]
})
export class EspecialidadEdicionComponent implements OnInit {
  especialidad: Especialidad;
  form: FormGroup;
  edicion: boolean;
  id: number;

  constructor(
    private especialidadServicio: EspecialidadService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.especialidad = new Especialidad();
    this.form = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl("")
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });
  }
  initForm(){
    if(this.edicion){
      this.especialidadServicio.listarporId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id' : new FormControl(data.idEspecialidad),
          'nombre' : new FormControl(data.nombre)
        });
      });
    }
  }

  operar(){
    this.especialidad.idEspecialidad = this.form.value['id'];
    this.especialidad.nombre = this.form.value['nombre'];
    if(this.edicion){
      this.especialidadServicio.modificar(this.especialidad).subscribe(()=>{
        this.especialidadServicio.listar().subscribe(data =>{
          this.especialidadServicio.especialidadCambio.next(data);
          this.especialidadServicio.mensajeCambio.next('SE MODIFICO');
        });
      });
    }else{
      this.especialidadServicio.registrar(this.especialidad).subscribe(()=>{
        this.especialidadServicio.listar().subscribe(data =>{
          this.especialidadServicio.especialidadCambio.next(data);
          this.especialidadServicio.mensajeCambio.next('SE REGISTRO');
        });
      });
    }
    this.router.navigate(['especialidad']);
  }
}
