const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
const data=db.data;
const server=db.dataserver;
var request = require('request');
const {where, Op} = require("sequelize");

exports.product =  async (req, res) => {

  var boy;
  try {
    const product = await data.findAll();


    return res.status(200).send({
      status:"1",
      'product':product,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
exports.dataserver =  async (req, res) => {

  var boy;
  try {
    const serverp = await server.findAll();


    return res.status(200).send({
      status:"1",
      server:serverp,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
