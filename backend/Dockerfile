FROM openjdk:22-jdk-slim
VOLUME /tmp
EXPOSE 8080

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# Install default-mysql-client
RUN apt-get update && apt-get install -y default-mysql-client

# Crear un grupo y un usuario para Spring
RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

ENTRYPOINT ["java", "-jar", "/app.jar"]
