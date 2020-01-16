import { ActivatedRoute } from '@angular/router';
import { Especialidad } from "./../../_model/especialidad";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatSnackBar
} from "@angular/material";
import { Component, OnInit, ViewChild } from "@angular/core";
import { EspecialidadService } from "src/app/_service/especialidad.service";

@Component({
  selector: "app-especialidad",
  templateUrl: "./especialidad.component.html",
  styleUrls: ["./especialidad.component.css"]
})
export class EspecialidadComponent implements OnInit {
  displayedColumns = ["idEspecialidad", "nombre" , "acciones"];
  dataSource: MatTableDataSource<Especialidad>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private especialidadServicie: EspecialidadService,
    public route :ActivatedRoute,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listar();
    this.especialidadServicie.especialidadCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.especialidadServicie.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data , "AVISO",{
        duration : 2000
      });
    });
  }

  listar() {
    this.especialidadServicie.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(idEspecialidad : number){
    this.especialidadServicie.eliminar(idEspecialidad).subscribe(()=>{
      this.especialidadServicie.listar().subscribe(data =>{
        this.especialidadServicie.especialidadCambio.next(data);
        this.especialidadServicie.mensajeCambio.next("SE ELIMINÓ");
      });
    });
  }
  applyFilter(filterValue : string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
