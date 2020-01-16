package com.mitocode.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.dao.IEspecialidadDAO;
import com.mitocode.model.Especialidad;
import com.mitocode.service.IEspecialidadService;


@Service
public class EspecialidadServiceImpl implements IEspecialidadService {

	@Autowired
	private IEspecialidadDAO dao;

	@Override
	public Especialidad registrar(Especialidad t) {
		// TODO Auto-generated method stub
		return dao.save(t);
	}

	@Override
	public Especialidad modificar(Especialidad t) {
		// TODO Auto-generated method stub
		return dao.save(t);
	}

	@Override
	public void eliminar(int id) {
		dao.delete(id);
		
	}

	@Override
	public Especialidad listarId(int id) {
		// TODO Auto-generated method stub
		return dao.findOne(id);
	}

	@Override
	public List<Especialidad> listar() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}



}
