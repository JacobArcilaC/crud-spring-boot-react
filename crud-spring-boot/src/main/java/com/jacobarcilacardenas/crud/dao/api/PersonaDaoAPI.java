package com.jacobarcilacardenas.crud.dao.api;

import org.springframework.data.repository.CrudRepository;

import com.jacobarcilacardenas.crud.model.Persona;

public interface PersonaDaoAPI extends CrudRepository<Persona, Long> {

}
