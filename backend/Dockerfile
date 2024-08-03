FROM openjdk:22-jdk-slim
VOLUME /tmp
EXPOSE 8080

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# Install default-mysql-client
RUN apt-get update && apt-get install -y default-mysql-client


# Add wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN addgroup --system spring && adduser --system spring --ingroup spring
USER spring:spring

ENTRYPOINT ["./wait-for-it.sh", "db", "java", "-jar", "/app.jar"]