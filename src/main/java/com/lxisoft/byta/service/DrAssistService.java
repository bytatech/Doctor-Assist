package com.lxisoft.byta.service;
import java.util.List;
import com.lxisoft.byta.model.Disease;

/**
 * An interface that is used as service layer
 * @author ARUN JOHNSON
 *
 */
public interface DrAssistService {
	

	public Disease findOne(long id);
	public List<Disease> findAll();
}
