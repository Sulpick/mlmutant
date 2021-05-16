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

* Docker
* Docker compose
* Curl
* Artillery

## Instrucciones para ejecutar el servicio

```zsh
# Run normally
$ npm start
```

## Instrucciones para ejecutar las pruebas unitarias

```zsh
# Test
$ npm run test                           # Run all test
$ npm run test:coverage
```
