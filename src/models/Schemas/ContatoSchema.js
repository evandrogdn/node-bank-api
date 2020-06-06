const { Schema } = require('mongoose');

// definicao do schema de contatos
module.exports = new Schema({
  telefone: {
    type: String,
    optional: true
  },
  celular: String,
  email: {
    type: String,
    optional: false
  }
}, {
  _id: false
})
