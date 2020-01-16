import { DetalleConsulta } from './detallaConsulta';
import { Paciente } from './paciente';
import { Medico } from './medico';
import { Especialidad } from './especialidad';

export class Consulta{
    idConsulta : number;
    paciente : Paciente;
    fecha : string; //ISODATE 2019-02-10T05:00:00
    medico : Medico;
    especialidad: Especialidad;
    detalleConsulta: DetalleConsulta[];

}