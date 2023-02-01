const db = require("../models");
const User = db.user;
const safe= db.safelock;
const deposit=db.deposit;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.safelock =  async (req, res) => {


  try {
    let authorities = [];

    const allock= await safe.findAll();

    return res.status(200).send({
      status:"1",
      allock:allock,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
