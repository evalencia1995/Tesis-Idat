package com.mitocode.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Usuario;

public interface IUsuarioDAO extends JpaRepository<Usuario, Integer> {
	
	//palabra reservada de spring findOneByUsername
	Usuario findOneByUsername(String username);	

}
