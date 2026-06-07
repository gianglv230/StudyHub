package com.studyhub.studyhub_api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import vn.payos.PayOS;

@SpringBootApplication
@EnableScheduling
public class StudyhubApiApplication {

	@Value("${payos.client-id}")
	private String clientId;

	@Value("${payos.api-key}")
	private String apiKey;

	@Bean
	public PayOS payOS() {
		return new PayOS(clientId, apiKey, checksumKey);
	}

	@Value("${payos.checksum-key}")
	private String checksumKey;

	public static void main(String[] args) {
		SpringApplication.run(StudyhubApiApplication.class, args);
	}

}
