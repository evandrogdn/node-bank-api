const { ContaClienteModel } = require('../models');
const { get } =  require('lodash');

module.exports = {
  index: async (req, res) => res.json(await ContaClienteModel.find().sort('-createdAt')),
  create: async (req, res) => {
    const { 
      titular, 
      inscrFederal, 
      endereco, 
      contato, 
      agencia, 
      conta, 
      saldo 
    } = req.body;
    const parsedEndereco = JSON.parse(endereco);
    const parsedContato = JSON.parse(contato);
    const parsedAgencia = JSON.parse(agencia);
    const parsedConta = JSON.parse(conta);
    const insert = await ContaClienteModel.create({
      titular, 
      inscrFederal, 
      endereco: parsedEndereco, 
      contato: parsedContato, 
      agencia: parsedAgencia, 
      conta: parsedConta, 
      saldo
    });
    return res.json(insert);
  },
  update: async (req, res) => {
    const { 
      titular, 
      inscrFederal, 
      endereco, 
      contato, 
      agencia, 
      conta, 
      saldo 
    } = req.body;
    const parsedEndereco = JSON.parse(endereco);
    const parsedContato = JSON.parse(contato);
    const parsedAgencia = JSON.parse(agencia);
    const parsedConta = JSON.parse(conta);
    const original = await ContaClienteModel.findById(req.params.id);
    Object.assign(original, { 
      titular, 
      inscrFederal, 
      endereco: parsedEndereco, 
      contato: parsedContato, 
      agencia: parsedAgencia, 
      conta: parsedConta, 
      saldo 
    }).save();
    return res.json(original);
  },
  remove: async (req, res) => {
    await ContaClienteModel.deleteOne({_id: req.params.id});
    return res.json({success: true, message: 'Registro removido com sucesso'});
  },
  getOne: async (req, res) => res.json(await ContaClienteModel.findById(req.params.id)),
  withdraw: async (req, res) => {
    if (!req.params.id) return res.json({success: false, message: 'ID da conta nao fornecido'});
    const conta = await ContaClienteModel.findById(req.params.id);
    if (!conta) return res.json({success: false, message: 'Conta não encontrada'});
    const { valorMovimento } = req.body;
    if (!valorMovimento) return res.json({success: false, message: 'Não fornecido valor para movimentação'});
    const saldoConta = get(conta, 'saldo', 0);
    if (saldoConta < valorMovimento) return res.json({success: false, message: 'Saldo insuficiente'});
    Object.assign(conta, {saldo: (saldoConta - valorMovimento)}).save();
    return res.json({success: true, message: 'Movimentação realizada com sucesso'});
  },
  deposit: async (req, res) => {
    if (!req.params.id) return res.json({success: false, message: 'ID da conta nao fornecido'});
    const conta = await ContaClienteModel.findById(req.params.id);
    if (!conta) return res.json({success: false, message: 'Conta não encontrada'});
    const { valorMovimento } = req.body;
    if (!valorMovimento) return res.json({success: false, message: 'Não fornecido valor para movimentação'});
    const saldoConta = get(conta, 'saldo', 0);
    Object.assign(conta, {saldo: (saldoConta + valorMovimento)}).save();
    return res.json({success: true, message: 'Movimentacao realizada com sucesso'});
  },
  transfer: async (req, res) => {
    const { 
      valorMovimento, 
      contaOrigem, 
      agenciaContaDestinoNumero, 
      agenciaContaDestinoDigito, 
      contaDestinoNumero, 
      contaDestinoDigito 
    } = req.body;
    if (!valorMovimento) return res.json({success: false, message: 'Não fornecido valor para movimentação'});
    if (!contaOrigem) return res.json({success: false, message: 'Conta origem não fornecida'});
    const origem = await ContaClienteModel.findById(contaOrigem);
    if (!origem) return res.json({success: false, message: 'Conta destino não encontrada'});
    const destino = await ContaClienteModel.findOne({
      'conta.numero': contaDestinoNumero, 
      'conta.digito': contaDestinoDigito, 
      'agencia.numero': agenciaContaDestinoNumero, 
      'agencia.digito': agenciaContaDestinoDigito
    });
    if (!destino) return res.json({success: false, message: 'Conta destino não encontrada'});
    const saldoOrigem = get(origem, 'saldo', 0);
    if (saldoOrigem < valorMovimento) return res.json({success: false, message: 'Saldo insuficiente'});
    Object.assign(origem, {saldo: saldoOrigem - valorMovimento}).save();
    const saldoDestino = get(destino, 'saldo', 0);
    Object.assign(destino, {saldo: saldoDestino + valorMovimento}).save();
    return res.json({success: true, message: 'Movimentacao realizada com sucesso'});
  },
}
