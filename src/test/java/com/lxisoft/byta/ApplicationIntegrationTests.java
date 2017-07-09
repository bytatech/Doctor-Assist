/*
 * Copyright 2015-2016 the original author or authors.
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

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.lxisoft.byta.model.Disease;
import com.lxisoft.byta.repository.DiseaseRepository;

/**
 * Integration tests to bootstrap the application.
 * 
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationIntegrationTests {

	@Autowired DiseaseRepository repository;

	@Test
	public void initializesRepositoryWithSampleData() {
		SecurityUtils.runAs("arun", "arun", "ROLE_DOCTOR");
		Iterable<Disease> result = repository.findAll();

		assertThat(result, is(iterableWithSize(3)));
	}
}
