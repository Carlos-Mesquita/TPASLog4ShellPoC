package tpas.poc.log4shell.dtos;

import java.util.List;

public class ProductsDTO {
    private List<Product> products;
    private int total;

    // Default constructor for Jackson
    public ProductsDTO() { }

    public List<Product> getProducts() { return products; }
    public int getTotal() { return total; }
}
