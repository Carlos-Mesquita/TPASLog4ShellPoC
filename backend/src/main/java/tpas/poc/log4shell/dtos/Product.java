package tpas.poc.log4shell.dtos;

import java.util.List;

public class Product {
    private int id;
    private String title;
    private String description;
    private String category;
    private double price;
    private double discountPercentage;
    private double rating;
    private int stock;
    private List<String> tags;
    private String brand;
    private String sku;
    private double weight;
    private Dimensions dimensions;
    private String warrantyInformation;
    private String shippingInformation;
    private String availabilityStatus;
    private List<Review> reviews;
    private String returnPolicy;
    private int minimumOrderQuantity;
    private Meta meta;
    private List<String> images;
    private String thumbnail;

    // Default constructor for Jackson
    public Product() { }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCategory() { return category; }
    public double getPrice() { return price; }
    public double getDiscountPercentage() { return discountPercentage; }
    public double getRating() { return rating; }
    public int getStock() { return stock; }
    public List<String> getTags() { return tags; }
    public String getBrand() { return brand; }
    public String getSku() { return sku; }
    public double getWeight() { return weight; }
    public Dimensions getDimensions() { return dimensions; }
    public String getWarrantyInformation() { return warrantyInformation; }
    public String getShippingInformation() { return shippingInformation; }
    public String getAvailabilityStatus() { return availabilityStatus; }
    public List<Review> getReviews() { return reviews; }
    public String getReturnPolicy() { return returnPolicy; }
    public int getMinimumOrderQuantity() { return minimumOrderQuantity; }
    public Meta getMeta() { return meta; }
    public List<String> getImages() { return images; }
    public String getThumbnail() { return thumbnail; }
}
