FROM openjdk:21-jdk-slim as build

WORKDIR /app
COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

FROM openjdk:21-jdk-slim

WORKDIR /app
RUN echo "TPAS{Log4Shell}" > /app/flag.txt
COPY --from=build /app/target/*.war app.war

EXPOSE 4200
ENTRYPOINT ["java", "-jar", "app.war"]

