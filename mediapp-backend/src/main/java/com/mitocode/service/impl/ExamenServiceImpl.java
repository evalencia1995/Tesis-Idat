package com.mitocode.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.dao.IExamenDAO;
import com.mitocode.model.Examen;
import com.mitocode.service.IExamenService;

@Service
public class ExamenServiceImpl implements IExamenService{

	@Autowired
	private IExamenDAO dao;
	
	@Override
	public Examen registrar(Examen t) {	
		return dao.save(t);
	}

	@Override
	public Examen modificar(Examen t) {
		return dao.save(t);
	}

	@Override
	public void eliminar(int id) {
		dao.delete(id);
	}

	@Override
	public Examen listarId(int id) {
		return dao.findOne(id);
	}

	@Override
	public List<Examen> listar() {
		return dao.findAll();
	}

}
