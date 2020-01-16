package com.mitocode.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Entity
@Table(name = "signos")
public class Signos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idSignos;
	
		
	@ManyToOne
	@JoinColumn(name = "id_paciente", nullable = false, foreignKey = @ForeignKey(name = "FK_Paciente_Signos"))
	private Paciente paciente;
	
	@JsonSerialize(using = ToStringSerializer.class) 
	private LocalDateTime fecha;
	
	@Column(name = "temperatura", nullable = false, length = 70)
	private String temperatura;
	
	@Column(name = "pulso", nullable = false, length = 70)
	private String pulso;
	
	@Column(name = "ritmo", nullable = false, length = 70)
	private String ritmo;

	public int getIdSignos() {
		return idSignos;
	}

	public void setIdSignos(int idSignos) {
		this.idSignos = idSignos;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public String getTemperatura() {
		return temperatura;
	}

	public void setTemperatura(String temperatura) {
		this.temperatura = temperatura;
	}

	public String getPulso() {
		return pulso;
	}

	public void setPulso(String pulso) {
		this.pulso = pulso;
	}

	public String getRitmo() {
		return ritmo;
	}

	public void setRitmo(String ritmo) {
		this.ritmo = ritmo;
	}
	
	
	
}
