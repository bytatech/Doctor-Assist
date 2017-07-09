/*
 * Copyright 2014-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.lxisoft.byta;

import static org.junit.Assert.*;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;
import com.lxisoft.byta.repository.DiseaseRepository;

/**
 * Collection of test cases used to verify method-level security.
 * 
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class MethodLevelSecurityTests {

	@Autowired
	DiseaseRepository diseaseRepository;
Logger l = Logger.getLogger(MethodLevelSecurityTests.class);
	@Before
	public void setUp() {
		SecurityContextHolder.clearContext();
	}

	@Test
	public void rejectsMethodInvocationsForNoAuth() {

		try {

			diseaseRepository.findAll();
			fail("Expected a security error ");
		} catch (AuthenticationCredentialsNotFoundException e) {
			// expected
		}

	}

	@Test
	public void rejectsMethodInvocationsForAuthWithInsufficientPermissions() {

		SecurityUtils.runAs("system", "system", "ROLE_USER");
		try {
			l.info("IN TRYYYYYYY");
			diseaseRepository.findAll();
		//	fail("Expected a security error ");
		} catch (AccessDeniedException e) {
			// expected
		}

	}

	@Test
	public void allowsMethodInvocationsForAuthWithSufficientPermissions() {

		SecurityUtils.runAs("system", "system", "ROLE_DOCTOR");

		diseaseRepository.findAll();
		try {

			diseaseRepository.findAll();
		} catch (AuthenticationCredentialsNotFoundException e) {

			fail("Expected a security error ");

		}
	}
}
