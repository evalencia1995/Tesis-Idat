package com.mitocode.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mitocode.model.Medico;

public interface IMedicoDAO extends JpaRepository<Medico, Integer> {

}
