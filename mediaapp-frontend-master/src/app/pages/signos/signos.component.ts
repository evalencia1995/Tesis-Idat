import { Signos } from "./../../_model/signos";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatSnackBar
} from "@angular/material";
import { SignosService } from "src/app/_service/signos.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-signos",
  templateUrl: "./signos.component.html",
  styleUrls: ["./signos.component.css"]
})
export class SignosComponent implements OnInit {
  displayedColumns = [
    "idSignos",
    "fecha",
    "temperatura",
    "pulso",
    "ritmo",
    "acciones"
  ];
  dataSource: MatTableDataSource<Signos>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cantidad: number;

  constructor(
    private signosService: SignosService,
    private snackBar: MatSnackBar,
    public route :ActivatedRoute,
  ) {}

  ngOnInit() {
    this.listar();

    this.signosService.signoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signosService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, "AVISO", {
        duration: 2000
      });
    });
  }

  listar() {
    this.pedirPaginado();
  }

  pedirPaginado(e?: any) {
    let pageIndex = 0;
    let pageSize = 10;
    if (e != null) {
      pageIndex = e.pageIndex;
      pageSize = e.pageSize;
    }
    this.signosService
      .listarPageable(pageIndex, pageSize)
      .subscribe((data: any) => {
        let signos = data.content;
        this.cantidad = data.totalElements;
        this.dataSource = new MatTableDataSource(signos);
        this.dataSource.sort = this.sort;
      });
  }
  mostrarMas(e: any) {
    this.pedirPaginado(e);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  eliminar(idSignos: number) {
    this.signosService.eliminar(idSignos).subscribe(() => {
      this.signosService.listar().subscribe(data => {
        this.signosService.signoCambio.next(data);
        this.signosService.mensajeCambio.next("SE ELIMINÓ");
      });
    });
  }
}
