const { Router } = require('express');
const { ContaCliente } = require('./../controllers')

class Routes {
  constructor() {
    this.routes = new Router();
    // carregamento de rotas
    this.loadRotasContaCliente();
  }

  loadRotasContaCliente() {
    this.routes.get('/conta-cliente', ContaCliente.index);
    this.routes.get('/conta-cliente/:id', ContaCliente.getOne);
    this.routes.post('/conta-cliente', ContaCliente.create);
    this.routes.put('/conta-cliente/:id', ContaCliente.update);
    this.routes.delete('/conta-cliente/:id', ContaCliente.remove);
    this.routes.post('/conta-cliente/:id/movimentar/saque', ContaCliente.withdraw);
    this.routes.post('/conta-cliente/:id/movimentar/deposito', ContaCliente.deposit);
  }
}

module.exports = new Routes().routes;
