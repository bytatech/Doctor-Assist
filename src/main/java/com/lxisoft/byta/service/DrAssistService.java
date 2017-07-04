package com.lxisoft.byta.service;

import java.util.List;

import com.lxisoft.byta.model.Disease;
public interface DrAssistService {
	

	public Disease findOne(long id);
	public List<Disease> findAll();
}
