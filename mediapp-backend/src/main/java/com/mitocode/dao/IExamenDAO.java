package com.mitocode.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Examen;

public interface IExamenDAO extends JpaRepository<Examen, Integer>{

}
