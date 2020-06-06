const { Schema } = require('mongoose');

// definicao do schema de endereco
module.exports = new new Schema({
  logradouro: String,
  bairro: String,
  cidade: String,
  cep: String,
  numero: String,
  complemento : {
    type: String,
    optional: true
  }
}, {
  _id: false
});
