const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
var request = require('request');
const {where, Op} = require("sequelize");

exports.allusers =  async (req, res) => {

  var boy;
  try {
    const user = await User.findAll();

    const alluser=await User.count();

    const reseller = await User.count({
      where: {
        apikey: {
          [Op.ne]: null
        }
      }
    });



    return res.status(200).send({
      status:"1",
     users:user,
      reseller:reseller,
      totaluser:alluser,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
