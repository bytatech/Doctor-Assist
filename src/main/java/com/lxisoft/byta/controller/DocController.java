
package com.lxisoft.byta.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import antlr.Token;

/**
 * This is a rest controller class which is used to address request and response
 * 
 * @author basil1
 * @version 1.0.0
 */

@RestController

public class DocController {

	
	@RequestMapping("/get/token/{id}")
	private Token getEmployees(@PathVariable Integer id) {
		final String uri = "http://localhost:8080/receptionist/read/tokenById/";

		RestTemplate restTemplate = new RestTemplate();
		Token token = restTemplate.getForObject(uri + id, Token.class);

		return token;
	}

}
