package tpas.poc.log4shell.dtos;

public class Meta {
    private String createdAt;
    private String updatedAt;
    private String barcode;
    private String qrCode;

    // Default constructor for Jackson
    public Meta() { }

    public String getCreatedAt() { return createdAt; }
    public String getUpdatedAt() { return updatedAt; }
    public String getBarcode() { return barcode; }
    public String getQrCode() { return qrCode; }
}
