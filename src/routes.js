const { Router } = require('express');

class Routes {
  constructor() {
    this.routes = new Router();
  }
}

module.exports = new Routes().routes;
