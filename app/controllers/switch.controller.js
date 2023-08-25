const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
const data=db.data;
var request = require('request');
const {where, Op} = require("sequelize");

exports.swit=  async (req, res) => {
let up="";
  var boy;
  try {
    const product = await data.findOne({
      where:{
        id:req.body.id,
      },
    });
    if (product.status =="1"){
      up="0";
    };

    if (product.status =="0"){
       up="1";
    };
    const objectToUpdate = {
      status:up,
    }

    data.findAll({ where: { id: product.id}}).then((result) => {
      if(result){
        result[0].set(objectToUpdate);
        result[0].save();
      }
    })


    return res.status(200).send({
      status:"1",
      message:'Status Change successful',
      product:product,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
exports.updatepro=  async (req, res) => {
  var boy;
  try {
    const product = await data.findOne({
      where:{
        id:req.body.productid,
      },
    });
    if (req.body.tamount ==""){
      return  res.status(200).send({
        status:"0",
        message:"Enter a valid amount"
      });
    };
    if (req.body.ramount ==""){
      return  res.status(200).send({
        status:"0",
        message:"Enter a valid amount"
      });
    };

    const objectToUpdate = {
      tamount:req.body.tamount,
      ramount:req.body.ramount,
    }

    data.findAll({ where: { id: product.id}}).then((result) => {
      if(result){
        result[0].set(objectToUpdate);
        result[0].save();
      }
    })


    return res.status(200).send({
      status:"1",
      message:'Update successful',
      product:product,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
