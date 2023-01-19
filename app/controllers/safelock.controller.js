const db = require("../models");
const User = db.user;
const safe= db.safelock;
const deposit=db.deposit;
var request = require('request');
const {response} = require("express");
const {where} = require("sequelize");

exports.safelock =  async (req, res) => {


  const userid = req.body.userId;
  var boy;
  try {
    let authorities = [];

    const user = await User.findOne({
      where: {
        id: userid,
      },
    });

    if (!user) {
      // req.session = null;
      return res.status(200).send({status: "0", message: "Kindly login your account."});
    }
    var amount=req.body.amount;

    if (parseInt(user.wallet) < parseInt(req.body.amount)) {
      return  res.status(200).send({
        status:"0",
        balance:user.wallet,
        message:"insufficient balance"
      });
    }
    var tamount=user.wallet - amount;

    const user1 = await User.update(
        { wallet: tamount },
        {
          where: {
            id: userid,
          },

        });

    const save =await safe.create({
      username:user.username,
      tittle:req.body.tittle,
      balance:req.body.amount,
      transactionid:req.body.refid,
      paymentmethod:"wallet",
      date:req.body.date,
      status:"1",
    })
    return res.status(200).send({
      status:"1",
      message:"Safe lock creat successfully",
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
