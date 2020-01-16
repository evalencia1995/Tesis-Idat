package com.mitocode.dto;

import java.util.List;

import com.mitocode.model.Consulta;
import com.mitocode.model.Examen;

public class ConsultaListaExamenDTO {

	private Consulta consulta;
	private List<Examen> lstExamen;
	
	/*
	 *  {
 	"consulta" : {
		
		"paciente" : {
			"idPaciente" : 1
		},
		"medico" : {
			"idMedico" : 1
		},
		"especialidad" : {
			"idEspecialidad" : 1
		},
		"fecha" : "2018-09-04T05:00:00.000Z",
		"detalleConsulta" : [
			{ "diagnostico" : "FIEBRE", "tratamiento" : "PARACETAMOL"},	
			{ "diagnostico" : "AMIGDALITIS", "tratamiento" : "ANTIBIOTICOS"}
			]
		},
 	"lstExamen" : [
 		{"idExamen" : 1},
 		{"idExamen" : 2}
 	]
}
	 * 
	 */

	public Consulta getConsulta() {
		return consulta;
	}

	public void setConsulta(Consulta consulta) {
		this.consulta = consulta;
	}

	public List<Examen> getLstExamen() {
		return lstExamen;
	}

	public void setLstExamen(List<Examen> lstExamen) {
		this.lstExamen = lstExamen;
	}

}
