const { Schema } = require('mongoose');

module.exports = new Schema({
  nome: String,
  numero: String,
  digito: String
}, {
  _id: false
});
