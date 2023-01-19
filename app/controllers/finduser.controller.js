const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
var request = require('request');
const {where, Op} = require("sequelize");

exports.find =  async (req, res) => {

  var boy;
  try {

const user = await User.findOne({
      where:{

          ...(req.body.username && {username: req.body.username}),
          ...(req.body.email && {email: req.body.email}),
          ...(req.body.name && {name: req.body.name}),
          ...(req.body.number && {phone: req.body.number})

      }
    });



    return res.status(200).send({
      status:"1",
     users:user,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
0