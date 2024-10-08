package tpas.poc.log4shell.dtos;

public class Dimensions {
    private double width;
    private double height;
    private double depth;

    // Default constructor for Jackson
    public Dimensions() { }

    public double getWidth() { return width; }
    public double getHeight() { return height; }
    public double getDepth() { return depth; }
}
