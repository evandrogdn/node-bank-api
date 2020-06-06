const { Schema } = require('mongoose');

module.exports = new Schema({
  tipo: Number,
  numero: String,
  digito: String
}, {
  _id: false
});
