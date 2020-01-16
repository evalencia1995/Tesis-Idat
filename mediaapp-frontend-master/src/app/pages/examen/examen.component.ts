import { Examen } from "./../../_model/examen";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatSnackBar
} from "@angular/material";
import { ExamenService } from "src/app/_service/examen.service";

@Component({
  selector: "app-examen",
  templateUrl: "./examen.component.html",
  styleUrls: ["./examen.component.css"]
})
export class ExamenComponent implements OnInit {
  displayedColumns = ["idExamen", "nombre", "descripcion", "acciones"];
  dataSource: MatTableDataSource<Examen>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private examenService: ExamenService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.listar();
    this.examenService.examenCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.examenService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data,"AVISO",{
        duration:2000
      });
    });
  }
  listar(){
    this.examenService.listar().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar( idExamen : number){
    this.examenService.eliminar(idExamen).subscribe(() =>{
      this.examenService.listar().subscribe(data =>{
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next('SE ELIMINO');
      });
    });
  }
  applyFIlter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
