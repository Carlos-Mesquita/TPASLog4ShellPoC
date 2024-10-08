package tpas.poc.log4shell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
public class Entrypoint {

	@Bean
	public WebClient.Builder getWebClientBuilder() { return WebClient.builder(); }

	public static void main(String[] args) {
		System.setProperty("com.sun.jndi.ldap.object.trustURLCodebase", "true");
		System.setProperty("log4j2.formatMsgNoLookups", "false");
		SpringApplication.run(Entrypoint.class, args);
		System.out.println("Log4j version: " + org.apache.logging.log4j.LogManager.getContext().getClass().getPackage().getImplementationVersion());
	}

}
