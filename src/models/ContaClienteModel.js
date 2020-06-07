// libs
const { Schema, model } = require('mongoose');
// schemas
const { Agencia, Conta, Contato, Endereco } = require('./Schemas')

// definicao do schema da conta corrente
const ContaCorrenteSchema = new Schema({
  titular: String,
  inscrFederal: String,
  endereco: Endereco,
  contato: Contato,
  agencia: Agencia,
  conta: Conta,
  saldo: {
    type: Number,
    optional: true
  }
}, {
  timestamps: true
});

module.exports = model('contaCliente', ContaCorrenteSchema);
