package tpas.poc.log4shell.controllers;

import tpas.poc.log4shell.dtos.ProductsDTO;
import tpas.poc.log4shell.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Mono<ProductsDTO> getAllProducts(
            @RequestParam(defaultValue = "8") int limit,
            @RequestParam(defaultValue = "0") int skip
    ) {
        return productService.getProducts(limit, skip, null, null);
    }

    @GetMapping("/search")
    public Mono<ProductsDTO> searchProducts(
            @RequestParam(defaultValue = "8") int limit,
            @RequestParam(defaultValue = "0") int skip,
            @RequestParam(required = true) String q
    ) {
        return productService.getProducts(limit, skip, null, q);
    }

    @GetMapping("/category/{category}")
    public Mono<ProductsDTO> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "8") int limit,
            @RequestParam(defaultValue = "0") int skip
    ) {
        return productService.getProducts(limit, skip, category, null);
    }

    @GetMapping("/category/{category}/search")
    public Mono<ProductsDTO> getProductsByCategoryWithSearch(
            @PathVariable String category,
            @RequestParam(defaultValue = "8") int limit,
            @RequestParam(defaultValue = "0") int skip,
            @RequestParam(required = true) String q
    ) {
        return productService.getProducts(limit, skip, category, q);
    }
}