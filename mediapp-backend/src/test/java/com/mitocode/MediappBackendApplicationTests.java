package com.mitocode;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import com.mitocode.dao.IUsuarioDAO;
import com.mitocode.model.Usuario;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MediappBackendApplicationTests {
	
	@Autowired
	private IUsuarioDAO dao;
	
	@Autowired
	private BCryptPasswordEncoder bcrypt;
	
	
	// Objetivo:
	// Enviar valores de entrar y asegurar que esos mismos valores *encrypt se hayan registrado en la base de datos
	@Test
	public void crearUsuario() {
		Usuario us = new Usuario();
		us.setIdUsuario(4);
		us.setUsername("maitex4");
		us.setPassword(bcrypt.encode("123"));
		us.setEnabled(true);
		
		Usuario retorno = dao.save(us);
		assertTrue(retorno.getPassword().equalsIgnoreCase(us.getPassword()));
	}

}

