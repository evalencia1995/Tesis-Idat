import { MAT_DIALOG_DATA } from "@angular/material";
import { MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject } from "@angular/core";
import { Consulta } from "src/app/_model/consulta";
import { ConsultaListaExamen } from "src/app/_model/consultaListExamen";
import { ExamenService } from "src/app/_service/examen.service";

@Component({
  selector: "app-dialogo-detalle",
  templateUrl: "./dialogo-detalle.component.html",
  styleUrls: ["./dialogo-detalle.component.css"]
})
export class DialogoDetalleComponent implements OnInit {
  consulta: Consulta;
  examenes: ConsultaListaExamen[];
  constructor(
    public dialogRef: MatDialogRef<DialogoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta,
    private examenService: ExamenService
  ) {}

  ngOnInit() {
    this.consulta = this.data;
  }
  listarExamenes(){
    this.examenService.listarExamenPorConsulta(this.consulta.idConsulta).subscribe((data)=>{
      this.examenes = data;
    });
  }
  cancelar(){
    this.dialogRef.close();
  }
}
