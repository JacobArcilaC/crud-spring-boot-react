package com.jacobarcilacardenas.crud.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.jacobarcilacardenas.crud.commons.GenericServiceImpl;
import com.jacobarcilacardenas.crud.dao.api.PersonaDaoAPI;
import com.jacobarcilacardenas.crud.model.Persona;
import com.jacobarcilacardenas.crud.service.api.PersonaServiceAPI;

@Service
public class PersonaServiceImpl extends GenericServiceImpl<Persona, Long> implements PersonaServiceAPI {

	@Autowired
	private PersonaDaoAPI personaDaoAPI;
	
	@Override
	public CrudRepository<Persona, Long> getDao() {
		return personaDaoAPI;
	}

}
