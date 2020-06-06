const { ContaClienteModel } = require('../models');
const { get } =  require('lodash');

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
  withdraw: async (req, res) => {
    if (!req.params.id) return res.json({success: false, message: "ID da conta nao fornecido"});
    const conta = await ContaClienteModel.findById(req.params.id);
    if (!conta) return res.json({success: false, message: "Conta não encontrada"});
    const { valorMovimento } = req.body;
    if (!valorMovimento) return res.json({success: false, message: "Não fornecido valor para movimentação"});
    const saldoConta = get(conta, 'saldo', 0);
    if (saldoConta < valorMovimento) return res.json({success: false, message: "Saldo insuficiente"});
    Object.assign(conta, {saldo: (saldoConta - valorMovimento)}).save();
    return res.json({success: true, message: "Movimentação realizada com sucesso"});
  }
}
