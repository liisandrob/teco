# Base de datos de usuarios

Aplicación MERN STACK donde podrás consultar, modificar, eliminar y registrar usuarios.
Se utilizó patrón MVC.

## Requisitos

```
$ npm init
```

* Environment: Production
```
$ npm i express config morgan mongoose
```

* Environment: Development
```
$ npm i -D nodemon webpack webpack-cli react react-dom  @babel/core @babel/preset-env @babel/preset-react babel-loader
```

### Deploy

* Environment: Production

En terminal escribir:
```
$ npm run prod
```

* Environment: Development

En una primera terminal escribir:
```
npm run webpack
```
En una segunda terminal escribir:
```
npm run dev
```