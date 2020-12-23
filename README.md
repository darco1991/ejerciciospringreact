# Ejercicio practico Spring + React + Postgresql

### Configurar base de datos Postgresql 
```
nano backend/src/resources/application.properties

spring.datasource.url= jdbc:postgresql://localhost:5432/api?useSSL=false
spring.datasource.username= apiuser
spring.datasource.password= apipass
``` 

### Preparación frontend
```
cd frontend
yarn install
yarn build
```

### Iniciar backend
Al iniciar el backend este copiara el build de react del frontend en backend/target/classes/static/
```
cd backend
mvn clean install
mvn spring-boot:run
```

Abrir [http://localhost:8080](http://localhost:8080)
 
