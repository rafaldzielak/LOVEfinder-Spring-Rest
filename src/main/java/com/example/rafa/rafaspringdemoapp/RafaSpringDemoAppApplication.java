package com.example.rafa.rafaspringdemoapp;

import java.util.ArrayList;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.rafa.rafaspringdemoapp.db.PersonCrudRepository;
import com.example.rafa.rafaspringdemoapp.entity.Person;

@SpringBootApplication
public class RafaSpringDemoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(RafaSpringDemoAppApplication.class, args);
	}
	
	@Bean
	public String addPerson(PersonCrudRepository repo){
		for (int i = 0; i < 10; i++) {
			Person man = new Person("Jan" + i, "Dzban" + i, "https://robohash.org/male" + i + ".jpg", "male");
			Person woman = new Person("Janina" + i, "Dzbanica" + i, "https://robohash.org/female" + i + ".jpg", "female");
			repo.save(man);
			repo.save(woman);
			
		}
		
		ArrayList<Person> people = new ArrayList<>();
		repo.findAll().forEach(people::add);
		System.out.println(people);

		return "ADDED PERSON";
	}

}
