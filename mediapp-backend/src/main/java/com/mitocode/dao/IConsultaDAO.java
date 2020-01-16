package com.mitocode.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mitocode.model.Consulta;

public interface IConsultaDAO extends JpaRepository<Consulta, Integer>{
	
	//referencia a la Entidad no a la tabla
	@Query("FROM Consulta c where c.paciente.dni =:dni or LOWER(c.paciente.nombres) like %:nombreCompleto% or LOWER(c.paciente.apellidos) like %:nombreCompleto%")
	List<Consulta> buscar(@Param("dni") String dni,@Param("nombreCompleto") String nombreCompleto);
	
	@Query("FROM Consulta c where c.fecha between :fechaConsulta and :fechaSgte")
	List<Consulta> buscarFecha(@Param("fechaConsulta") LocalDateTime fechaConsulta, @Param("fechaSgte") LocalDateTime fechaSgte);
	
	@Query(value = "exec fn_listarResumen" , nativeQuery = true)
	List<Object[]> listarResumen(); //JPA devuelve un object 
	
}
