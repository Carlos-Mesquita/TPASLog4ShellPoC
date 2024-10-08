package tpas.poc.log4shell.dtos;

public class Review {
    private int rating;
    private String comment;
    private String date;
    private String reviewerName;
    private String reviewerEmail;

    // Default constructor for Jackson
    public Review() { }

    public int getRating() { return rating; }
    public String getComment() { return comment; }
    public String getDate() { return date; }
    public String getReviewerName() { return reviewerName; }
    public String getReviewerEmail() {  return reviewerEmail; }
}
