<br />
<p align="center">
  <div align="center"><h1>Ml mutant</h1></div>
  <div align="center"><h3>Technologies</h3></div>
  <div align="center">
    <a>
        <img src="./media/nodejs.png" alt="Logo" width="100" height="100">
        <img src="./media/docker.png" alt="Logo" width="110" height="100">
        <img src="./media/gcp.png" alt="Logo" width="150" height="100">
    </a>
  </div>
</p>
</br>

## Tabla de contenidos

* [Sobre ml mutant](#sobre-ml-mutant)
* [Frameworks](#frameworks)
* [Variables de ambiente](#variables-de-ambiente)
* [Requerimientos](#requerimientos)
* [Instrucciones para ejecutar el servicio](#Instrucciones-para-ejecutar-el-servicio)
* [Instrucciones para ejecutar las pruebas unitarias](#Instrucciones-para-ejecutar-las-pruebas-unitarias)

## Sobre ml mutant

Este micro servicio se encarga de una secuencia de ADN y determinar si pertenece a un humano o mutante. Esta información es almacenada en mongoDB.

## Frameworks

* Node.js   - [https://nodejs.org/](https://nodejs.org/)
* Koajs     - [https://koajs.com](https://koajs.com)
## Variables de ambiente

Lista de las variables necesarias para el correcto despliegue del microservicio

* MONGO_URL
​
## Requerimientos

### Local
* NodeJs v12.x
* MongoDB v4.4.x
* Curl

### Docker
* Docker
* Docker-compose
* Curl

### Cloud
* gcloud

### Opcionales
* Artillery

## Instrucciones para levantar el servicio

```sh
# Local
$ npm install
$ npm start

# Docker
$ docker-compose build
$ docker-compose up -d

# Appengine
$ gcloud app deploy
```

## Instrucciones para ejecutar las pruebas unitarias

```sh
# Test
$ npm run test                           # Run all test
$ npm run test:coverage
```

## Instrucciones para consumir el servicio local

```sh
curl --location --request POST 'localhost:8080/mutant/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]
}'
```

## Instrucciones para consumir el servicio en appengine

```sh
curl --location --request POST 'https://ml-mutant-dot-ml-mutant.uk.r.appspot.com/mutant/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTG"
    ]
}'
```