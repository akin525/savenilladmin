const db = require("../models");
const User = db.user;
const safe =db.safelock;
const deposit=db.deposit;
const data=db.data;
const datanew=db.datanew;
var request = require('request');
const {where, Op} = require("sequelize");

exports.swit = async (req, res) => {
  try {
    const product = await datanew.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product not found',
      });
    }

    const updatedStatus = product.status === 1 ? 0 : 1;

    const objectToUpdate = { status: updatedStatus };

    const results = await data.findAll({ where: { id: product.id } });

    if (results && results.length > 0) {
      await results[0].update(objectToUpdate);
    }

    return res.status(200).send({
      success: true,
      message: 'Status changed successfully',
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
exports.updatepro=  async (req, res) => {
  var boy;
  try {
    const product = await datanew.findOne({
      where:{
        id:req.body.productid,
      },
    });
    if (req.body.amount ==""){
      return  res.status(200).send({
        status:"0",
        message:"Enter a valid amount"
      });
    };
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
      amount:req.body.amount,
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
      success:true,
      message:'Update successful',
      product:product,
    });

  } catch (error) {
    return res.status(201).send({
      message: error.message});
  }

};
