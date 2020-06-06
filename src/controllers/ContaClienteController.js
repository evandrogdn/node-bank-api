const { ContaClienteModel } = require('../models');

module.exports = {
  index: async (req, res) => res.json(await ContaClienteModel.find().sort('-createdAt')),
  create: async (req, res) => {
    const { titular, inscrFederal, endereco, contato, conta, saldo } = req.body;
    const insert = await ContaClienteModel.create({titular, inscrFederal, endereco, contato, conta, saldo});
    return res.json(insert);
  },
  update: async (req, res) => {
    const { titular, inscrFederal, endereco, contato, conta, saldo } = req.body;
    const original = await ContaClienteModel.findById(req.params.id);
    Object.assign(original, { titular, inscrFederal, endereco, contato, conta, saldo }).save();
    return res.json(original);
  },
  remove: async (req, res) => {
    await ContaClienteModel.deleteOne({_id: req.params.id});
    return res.json({message: 'Registro removido com sucesso'});
  },
  getOne: async (req, res) => res.json(await ContaClienteModel.findById(req.params.id)),
}
