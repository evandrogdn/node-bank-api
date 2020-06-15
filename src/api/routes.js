const { Router } = require('express');
const { ContaCliente } = require('./../controllers')

class Routes {
  constructor() {
    this.routes = new Router();
    // carregamento de rotas
    this.loadRotasContaCliente();
  }

  loadRotasContaCliente() {
    this.routes.get('/api/v1/conta-cliente', ContaCliente.index);
    this.routes.get('/api/v1/conta-cliente/:id', ContaCliente.getOne);
    this.routes.post('/api/v1/conta-cliente', ContaCliente.create);
    this.routes.put('/api/v1/conta-cliente/:id', ContaCliente.update);
    this.routes.delete('/api/v1/conta-cliente/:id', ContaCliente.remove);
    this.routes.post('/api/v1/conta-cliente/:id/movimentar/saque', ContaCliente.withdraw);
    this.routes.post('/api/v1/conta-cliente/:id/movimentar/deposito', ContaCliente.deposit);
    this.routes.post('/api/v1/conta-cliente/movimentar/transferir', ContaCliente.transfer);
  }
}

module.exports = new Routes().routes;
