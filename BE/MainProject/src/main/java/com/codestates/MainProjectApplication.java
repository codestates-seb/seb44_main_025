package com.codestates;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.*;

@SpringBootApplication
public class MainProjectApplication {
	@PostConstruct
	public void started() {
		// timezone UTC 셋팅
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}


	public static void main(String[] args) {
		SpringApplication.run(MainProjectApplication.class, args);
	}

}
