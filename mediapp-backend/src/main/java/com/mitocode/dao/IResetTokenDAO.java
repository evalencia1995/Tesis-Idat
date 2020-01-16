package com.mitocode.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mitocode.model.ResetToken;

public interface IResetTokenDAO extends JpaRepository<ResetToken, Long>{
	
	//from RestToken where token = :? 	
	ResetToken findByToken(String token);

}
