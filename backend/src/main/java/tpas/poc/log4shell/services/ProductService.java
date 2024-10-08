package tpas.poc.log4shell.services;

import tpas.poc.log4shell.components.LoggerManager;
import tpas.poc.log4shell.dtos.ProductsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Optional;


@Service
public class ProductService {

    private final LoggerManager loggerManager;

    private static final String BASE_URL = "https://dummyjson.com/products";

    private final WebClient webClient;

    @Autowired
    public ProductService(WebClient.Builder webClientBuilder, LoggerManager loggerManager) {
        this.webClient = webClientBuilder.baseUrl(BASE_URL).build();
        this.loggerManager = loggerManager;
    }

    // Stops at first non-alphanumeric char
    private String sanitizeInput(String input) {
        if (input == null || input.isEmpty()) return null;

        StringBuilder result = new StringBuilder();
        for (char c : input.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                result.append(c);
            } else {
                break;
            }
        }
        return result.toString();
    }

    public Mono<ProductsDTO> getProducts(int limit, int skip, String category, String searchQuery) {
        String path;

        if (category != null && !category.isEmpty()) {
            path = searchQuery != null && !searchQuery.isEmpty() ? "/category/" + category + "/search" : "/category/" + category;
        } else if (searchQuery != null && !searchQuery.isEmpty()) {
            path = "/search";
        } else {
            path = "";
        }

        // IMPORTANT: Do not remove this or else you will be sending jndi lookups to dummyjson
        String sanitizedSearchQuery = sanitizeInput(searchQuery);

        if (searchQuery != null) {
            this.loggerManager.log("Sanitized search query to send to dummyjson: " + sanitizedSearchQuery);
        }

        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(path)
                        .queryParam("limit", limit)
                        .queryParam("skip", skip)
                        .queryParamIfPresent("q", Optional.ofNullable(sanitizedSearchQuery))
                        .build())
                .retrieve()
                .bodyToMono(ProductsDTO.class);
    }
}
