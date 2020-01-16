package com.mitocode.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mitocode.dao.IMenuDAO;
import com.mitocode.model.Menu;
import com.mitocode.service.IMenuService;

@Service
public class MenuServiceImpl implements IMenuService{
	
	@Autowired
	private IMenuDAO dao;
	

	@Override
	public Menu registrar(Menu menu) {
		// TODO Auto-generated method stub
		return dao.save(menu);
	}

	@Override
	public Menu modificar(Menu menu) {
		// TODO Auto-generated method stub
		return dao.save(menu);
	}

	@Override
	public void eliminar(int idMenu) {
		dao.delete(idMenu);
		
	}

	@Override
	public Menu listarId(int idMenu) {
		// TODO Auto-generated method stub
		return dao.findOne(idMenu);
	}

	@Override
	public List<Menu> listar() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public List<Menu> listarMenuPorUsuario(String nombre) {
		List<Menu> menus = new ArrayList<>();
		dao.listarMenuPorUsuario(nombre).forEach( x ->{
			Menu m = new Menu();
			m.setIdMenu((Integer.parseInt(String.valueOf(x[0]))));
			m.setIcono(String.valueOf(x[1]));
			m.setNombre(String.valueOf(x[2]));
			m.setUrl(String.valueOf(x[3]));
			menus.add(m);
		});
		return menus;
	}

}
