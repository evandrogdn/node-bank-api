const express = require('express');

class App {
  constructor() {
    // cria server com o express
    this.server = express();
    // adiciona os middlewares, principalmente, os relacionados aos CORS
    this.middlewares();
  };

  middlewares() {
    // definindo o uso de json para as rotas
    this.server.use(express.json());
    // definindo headers refernte aos cors
    this.server.use((req, res, next) => {
      res.append('Access-Controll-Allow-Origin', '*');
      res.append('Content-Type', 'Application/Json');
      res.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
      res.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
      next();
    });
  };
}

module.exports = new App().server;
