# TPAS Log4Shell POC Backend

This spring boot app just serves as a proxy to the [DummyJson's Product API](https://dummyjson.com/docs/products) to simulate an e-commerce backend, logging the requests using a vulnerable version of Log4j required to trigger Log4Shell.

To run this spring boot app:

```
mvn spring-boot:run
```
